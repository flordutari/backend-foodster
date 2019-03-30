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
  category: {
    type: [{
      type: String,
      enum: ['All', 'Vegetarian', 'Vegan', 'Gluten-free', 'Meat']
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