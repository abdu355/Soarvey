const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose; //destructured the above statement (ES6)

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema; //because it is a sub document of Survey we do not save it directly as a monogoose model
