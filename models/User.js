const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: '../img/default-profile.png'
  },
  description: {
    type: String,
    default: "hi! I like to cook, but I have no time, I hope we can share some tuppers"
  },
  status: {
    type: Number,
    default: 0
  },
  tickets: {
    type: Number,
    default: 3
  },
  following: [{
    type: ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: ObjectId,
    ref: 'User'
  }],
  favorites: [{
    type: ObjectId,
    ref: 'Tupper'
  }],
  bought: [{
    type: ObjectId,
    ref: 'Tupper'
  }],
  rated: [{
    type: ObjectId,
    ref: 'Tupper'
  }],
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
