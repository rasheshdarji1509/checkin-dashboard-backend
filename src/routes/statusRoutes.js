const express = require('express');
const Customer = require('../models/Customer');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { customerId, status, remark, followUpDate } = req.body;

    if (!customerId || !status) {
      return res.status(400).json({ message: 'Customer and status are required' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    if (status === 'Follow-Up Required' && !followUpDate) {
      return res.status(400).json({ message: 'Follow-up date is required for this status' });
    }

    customer.eventStatus = status;
    customer.statusHistory.push({
      status,
      remark: remark || '',
      followUpDate: status === 'Follow-Up Required' ? followUpDate : undefined
    });

    await customer.save();
    res.status(201).json({ message: 'Status updated successfully', customer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
});

router.get('/:customerId', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    if (!customer || !customer.statusHistory.length) {
      return res.status(404).json({ message: 'No status history found for this customer' });
    }
    res.json(customer.statusHistory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load status history', error: error.message });
  }
});

module.exports = router;
