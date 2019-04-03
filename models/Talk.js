const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const talkSchema = new Schema({
  opener: {
    type: ObjectId,
    ref: 'User'
  },
  guest: {
    type: ObjectId,
    ref: 'User'
  },
  messages: [{
    type: ObjectId,
    ref: 'Message'
  }]
});

const Talk = mongoose.model('Talk', talkSchema);

module.exports = Talk;