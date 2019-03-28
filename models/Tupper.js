const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const tupperSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: '../frontend/public/img/logo3.svg'
  },
  status: {
    type: String,
    enum: ['notAvailable', 'available', 'selled'],
    default: 'available'
  },
  category: {
    type: [{
      type: String,
      enum: ['All', 'Vegetarian', 'Vegan', 'Gluten-free', 'Lactose-free', 'Meat'],
      required: true
    }]
  },
  value: {
    type: String,
    enum: ['1', '2', '3', '4', '5'],
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Tupper = mongoose.model('Tupper', tupperSchema);

module.exports = Tupper;