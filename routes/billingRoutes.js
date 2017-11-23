const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecret);
const requireLogin = require('../middlewares/requireLogin'); //custom middleware
//express does not parse objects sent from post requests - we need body-parser library - imported in server index.js

module.exports = app => {
  //handler for stripe post for token handling
  //app routes can take middlewares as an argument b/w route and async function
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //make sure user is logged in before billing using (requireLogin) MW

    //finalize Stripe charge - send token to Stripe charge API - check Stripe charges api for node js: https://stripe.com/docs/api/node#charges
    //console.log(req.body);

    //create a charge
    const stripecharge = await stripe.charges.create({
      amount: 500, //500 cents - $5
      currency: 'usd',
      description: 'purchase of $5 for 5 Emaily credits',
      source: req.body.id //token id from stripe post
    });
    //console.log(stripecharge);

    //add 5 credits to user - we can access our currentUser from passport like so:
    req.user.credits += 5;
    const user = await req.user.save(); //save and assign to up to date user var
    res.send(user); //send back the new user instance - with updated info
  });
};
