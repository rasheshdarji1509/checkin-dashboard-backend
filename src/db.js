const mongoose = require('mongoose');
const Customer = require('./models/Customer');
const Booth = require('./models/Booth');
const BoothAssignment = require('./models/BoothAssignment');

async function seedData() {
  const customerCount = await Customer.countDocuments();
  const boothCount = await Booth.countDocuments();
  const assignmentCount = await BoothAssignment.countDocuments();

  if (customerCount > 0 || boothCount > 0 || assignmentCount > 0) {
    return;
  }

  const customer1 = await Customer.create({
    name: 'Ravi Patel',
    mobileNumber: '9876543210',
    email: 'ravi.patel@example.com',
    projectName: 'Project A',
    qrCode: 'QR-1001',
    eventStatus: 'Waiting',
    assignedBooth: null,
    qrUsed: false,
    statusHistory: [{ status: 'Waiting', remark: 'Registered', date: new Date() }]
  });

  const customer2 = await Customer.create({
    name: 'Anita Desai',
    mobileNumber: '9123456780',
    email: 'anita.desai@example.com',
    projectName: 'Project B',
    qrCode: 'QR-1002',
    eventStatus: 'Checked-In',
    assignedBooth: 'Booth 4',
    qrUsed: true,
    statusHistory: [
      { status: 'Waiting', remark: 'Registered', date: new Date() },
      { status: 'Checked-In', remark: 'Arrived', date: new Date() }
    ]
  });

  const booth1 = await Booth.create({ boothNumber: 'Booth 1', salesManager: 'Amit Singh', status: 'Available' });
  const booth2 = await Booth.create({ boothNumber: 'Booth 2', salesManager: 'Neha Mehta', status: 'Available' });
  const booth3 = await Booth.create({ boothNumber: 'Booth 3', salesManager: 'Rahul Sharma', status: 'Available' });
  const booth4 = await Booth.create({ boothNumber: 'Booth 4', salesManager: 'Priya Verma', status: 'Assigned', customerId: customer2._id });

  await BoothAssignment.create({
    customerId: customer2._id,
    boothId: booth4._id,
    boothNumber: booth4.boothNumber,
    salesManagerName: booth4.salesManager,
    status: 'Assigned',
    remark: 'Initial assignment'
  });
}

async function connectDb() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI must be set in environment variables');
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('MongoDB connected');
  await seedData();
}

module.exports = { connectDb };
