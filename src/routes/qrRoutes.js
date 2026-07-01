const express = require('express');
const Customer = require('../models/Customer');

const router = express.Router();

router.get('/verify/:qrCode', async (req, res) => {
  try {
    const { qrCode } = req.params;
    const customer = await Customer.findOne({ qrCode });

    if (!customer) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    if (customer.qrUsed) {
      return res.status(400).json({ message: 'QR code already used' });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'QR verification failed', error: error.message });
  }
});

router.post('/check-in', async (req, res) => {
  try {
    const { qrCode } = req.body;
    if (!qrCode) {
      return res.status(400).json({ message: 'QR code is required for check-in' });
    }

    const customer = await Customer.findOne({ qrCode });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found for provided QR code' });
    }

    if (customer.qrUsed) {
      return res.status(400).json({ message: 'Customer already checked in' });
    }

    customer.qrUsed = true;
    customer.eventStatus = 'Checked-In';
    customer.statusHistory.push({ status: 'Checked-In', remark: 'Customer checked in' });
    await customer.save();

    res.json({ message: 'Check-in successful', customer });
  } catch (error) {
    res.status(500).json({ message: 'Check-in failed', error: error.message });
  }
});

module.exports = router;
