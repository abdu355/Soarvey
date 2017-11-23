const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); //built into node js

const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
//get survey model class from mongoose
const Survey = mongoose.model('surveys');

module.exports = app => {
  //for when user clicks unsub link in emails
  app.get('/api/surveys/unsubscribe', (req, res) => {
    res.send('You are now Unsubscribed');
  });
  //handler for getting the list of surveys
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      receipients: false
    }); //exclude recipients

    res.send(surveys); //this will send back all surveys and their recipients - huge list ! we need to filter that
  });

  //for when user clicks any link in emails
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for the feedback !');
    //or to send an html page : res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

  //for sendgrid webhook api posting to our server
  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    //chain helps us chain as many lodash methods as we want on a single variable - this helps reduce code size
    _.chain(req.body)
      .map(event => {
        //new URL(event.url).pathname: this will return '/api/surveys/id/answer'
        //this will extract surveyid and choice from the pathname
        const match = p.test(new URL(event.url).pathname); //p.test wil return null if no survceyId and choice exist in the pathname
        //return what we care about
        if (match) {
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      //remove nulls
      .compact() //returns event objects without undefined
      //remove duplicates
      .uniqBy('email', 'surveyId') //makes sure the same user cannot vote on same survey more than once
      //run query there
      .each(({ surveyId, email, choice }) => {
        //destructure event from req.body
        Survey.updateOne(
          {
            //find one record
            _id: surveyId, //with the following surveyId
            recipients: {
              //and the following recipient details
              $elemMatch: { email: email, responded: false } //for every survey - find recipient with this email that has not responded
            }
          },
          {
            //update that record with the following
            $inc: { [choice]: 1 }, //intelligent mongo operator - find choice prop( yes or no) and increment it by 1. here we update anyway.
            $set: { 'recipients.$.responded': true }, //update ONLY($) the recipient that we care about ( that was found in query ) and set responded to true
            lastResponded: new Date()
          }
        ).exec(); //this way the data is never loaded into our express app ! - all handeled on DB end by MongoDB

        //key interpolation in ES6 : [choice] => translates to 'yes' or 'no' then gets us that particular field
        //similar to survey[answer] += 1=> survey.yes or survey.no

        //no need for async await for this update since we wont reply back with any text and sendgrid doesnt really care about response
      })
      .value();

    res.send({}); //tell sendgrid its all good to prevent resending the post request
  });

  //check login then check num of credits [in that order] when creating a new survey
  app.post('/api/surveys', requireLogin, requireCredit, async (req, res) => {
    //create a new survey instance from model
    const { title, subject, body, recipients } = req.body; //get these properties from body request when posting from frontend

    //create new instance of survey - survey id is generated before saving to db. we can use this survey id for our survey reponse api when users click yes/no in our emails
    const survey = new Survey({
      title, //short for title:title
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })), //get array of emails [from split] and create a new email object for every email string - mongoose will store these objects in the mongo model email field and responded field will be initialized to false by default for every recipient
      _user: req.user.id, //available from passport - MongoDB id
      dateSent: Date.now()
    });

    //send email using our Mailer class
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send(); //wait for mail to get sent by sendgrid
      //save survey
      await survey.save(); //mongoose save
      req.user.credits -= 1; //deduct 1 credit from balance
      const user = await req.user.save(); // wait for user to save

      res.send(user); //update page - send successful
    } catch (err) {
      res.status(422).send(err); //sending failed
    }
  });
};
