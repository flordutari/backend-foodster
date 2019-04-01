const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const tupperSchema = new Schema({
  creator: {
    type: ObjectId,
    ref: 'User'
  },
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  },
  rated: {
    type: Boolean,
    default: false
  },
  category: {
    type: [{
      type: String,
      enum: ['all', 'vegetarian', 'vegan', 'meat', 'pasta', 'gluten-free']
    }]
  },
  price: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Tupper = mongoose.model('Tupper', tupperSchema);

module.exports = Tupper;