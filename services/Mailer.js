const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//create our custom mail object using sendgrid helper class (Mail)
class Mailer extends helper.Mail {
  //generic constructor that gets 2 fields from survey object and content from surveyTemplate
  constructor({ subject, recipients }, content) {
    super();

    //create api object and assign api key
    this.sgApi = sendgrid(keys.sendGridKey);
    //who is sending email:
    this.from_email = new helper.Email('no-reply@soarvey.com');
    //email subject field
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); //addContent is a sendgrid function
    this.addClickTracking();
    this.addRecipients();
  }
  //because recipients is an array of email objects. we need to extract the strings only and pass them to sendgrid
  //this will eventually return an array of helper.Email objects that can be read by sendgrid
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      //for every recipient object in that array get the email prop and pass it to helper.Email object for sendgrid to interpret
      return new helper.Email(email); //create new sendgrid email object
    });
  }
  //boilerplate for tracking clicks in emails using sendgrid
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  //boilerplate for adding recipients to a personalize object
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request, (error, response) => {
      if (error) {
        console.log('Error response received');
      }
      //console.log(response.statusCode);
      //console.log(response.body);
      //console.log(response.headers);
    });
    return response;
  }
}

module.exports = Mailer;
