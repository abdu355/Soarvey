const passport = require('passport');

//create arrow function and export it
module.exports = app => {
  // route handler to initiate Google auth
  app.get(
    '/auth/google',
    //string from strategy
    passport.authenticate('google', {
      //give us access to these
      scope: ['profile', 'email']
    })
  );
  // route handler for Google auth callback
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      //where to redirect after authentication is finished
      res.redirect('/surveys'); //take user to relative path /surveys pre-append localhost url to it
    }
  );

  //route handler for checking logged in user from cookie
  app.get('/api/current_user', (req, res) => {
    res.send(req.user); //req.user is taken from passport (cookie). Passport attaches methods or objects to the req object for easy access
  });

  //route handler for logging out user
  app.get('/api/logout', (req, res) => {
    req.logout(); //set cookie , discards info stored in cookie
    res.redirect('/');
    //res.send(req.user);
  });
};
