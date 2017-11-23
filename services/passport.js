const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); //fetch the model from mongoose

console.log(keys);
//user can be exisitingUser or new user - stores it in cookie
passport.serializeUser((user, done) => {
  //user (above) is taken from the db using the done function from callback below
  done(null, user.id); //passes user ID to passport session for use with other functions, also used in creating a cookie
});

//pull out user info from cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy( //known as string: 'google' used while authenticating via passport
    {
      //params
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', //relative path causes http to be used instead of https this is fixed by giving the full path with domain or the param below
      proxy: true
    },
    //callback function
    async (accessToken, refreshToken, profile, done) => {
      //console.log('access Token: ', accessToken);
      //console.log('refresh Token: ', refreshToken);
      console.log('profile ', profile);
      //find user
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //user already exists with this profile ID
        return done(null, existingUser); //passport auth: done(error, user) pass exisiting user to passport to continue authentication
      }
      //create user or new model instance
      const user = await new User({
        googleId: profile.id,
        name: profile.displayName
      }).save();
      done(null, user);
      //get another instance (of the same record) and pass it to passport
    }
  )
); //create new instance of Google OAUTH strategy and use the new available strategy in passport
