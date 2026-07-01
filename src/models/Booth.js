const mongoose = require('mongoose');

const boothSchema = new mongoose.Schema({
  boothNumber: { type: String, required: true, unique: true },
  salesManager: { type: String, required: true },
  status: { type: String, required: true, default: 'Available' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booth', boothSchema);
