const mongoose = require('mongoose');

const boothAssignmentSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  boothId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booth', required: true },
  boothNumber: { type: String, required: true },
  salesManagerName: { type: String, required: true },
  status: { type: String, required: true },
  remark: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('BoothAssignment', boothAssignmentSchema);
