const mongoose = require('mongoose');

const statusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  remark: { type: String, default: '' },
  followUpDate: { type: String },
  date: { type: Date, default: Date.now }
});

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  projectName: { type: String, required: true },
  qrCode: { type: String, required: true, unique: true },
  eventStatus: { type: String, required: true, default: 'Waiting' },
  assignedBooth: { type: String, default: null },
  qrUsed: { type: Boolean, default: false },
  statusHistory: { type: [statusHistorySchema], default: [] }
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
