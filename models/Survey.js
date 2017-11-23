//DB collection Survey
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose; //destructured the above statement (ES6)
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], //array of Recipients as recipient Schema objects
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, //links every survey to a particular user - relationship field
  dateSent: Date,
  lastResponded: Date //last time someone responded to this survey - used for follow up and determining if our surveys are being clicked
});

mongoose.model('surveys', surveySchema);
