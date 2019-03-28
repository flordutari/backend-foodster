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
    default: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjvg_DJ0aLhAhXnkOAKHVC9DG8QjRx6BAgBEAU&url=https%3A%2F%2Fwww.uihere.com%2Ffree-cliparts%2Funited-states-computer-icons-desktop-wallpaper-clip-art-free-high-quality-person-icon-1441937&psig=AOvVaw3Rrry_wxMFvnJYUuQOEKeP&ust=1553786898040545"
  },
  status: {
    type: Number
  },
  tickets: {
    type: Number,
    default: 3
  },
  following: [{
    type: ObjectId,
    ref: 'User'
  }],
  favorites: [{
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
