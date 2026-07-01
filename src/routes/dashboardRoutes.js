const express = require('express');
const Customer = require('../models/Customer');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const checkedInCustomers = await Customer.countDocuments({ eventStatus: 'Checked-In' });
    const waitingCustomers = await Customer.countDocuments({ eventStatus: 'Waiting' });
    const assignedCustomers = await Customer.countDocuments({ eventStatus: 'Assigned' });
    const completedCustomers = await Customer.countDocuments({ eventStatus: 'Completed' });

    res.json({
      totalCustomers,
      checkedInCustomers,
      waitingCustomers,
      assignedCustomers,
      completedCustomers,
      distribution: [
        { name: 'Waiting', value: waitingCustomers },
        { name: 'Checked-In', value: checkedInCustomers },
        { name: 'Assigned', value: assignedCustomers },
        { name: 'Completed', value: completedCustomers }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load dashboard summary', error: error.message });
  }
});

module.exports = router;
