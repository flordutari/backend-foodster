const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
  comment: {
    type: String
  },
  creator: {
    type: ObjectId,
    ref: 'User'
  },
  read: {
    type: Boolean,
    default: false
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
  