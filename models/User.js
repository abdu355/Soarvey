//DB collection Users

//mongoose model class - User
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose; //destructured the above statement (ES6)

//new schema for the model
const userSchema = new Schema({
  googleId: String,
  name: { type: String, default: 'Unknown' },
  credits: { type: Number, default: 0 }
});
//create the collection
mongoose.model('users', userSchema); //store the model in mongoose
//Warning: requiring this model in other js files might create multiple models of the same collection
