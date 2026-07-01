const { v4: uuidv4 } = require('uuid');

const customers = [
  {
    id: uuidv4(),
    name: 'Ravi Patel',
    mobileNumber: '9876543210',
    email: 'ravi.patel@example.com',
    projectName: 'Project A',
    qrCode: 'QR-1001',
    eventStatus: 'Waiting',
    assignedBooth: null,
    qrUsed: false,
    statusHistory: [
      { status: 'Waiting', remark: 'Registered', date: new Date().toISOString() }
    ]
  },
  {
    id: uuidv4(),
    name: 'Anita Desai',
    mobileNumber: '9123456780',
    email: 'anita.desai@example.com',
    projectName: 'Project B',
    qrCode: 'QR-1002',
    eventStatus: 'Checked-In',
    assignedBooth: 'Booth 4',
    qrUsed: true,
    statusHistory: [
      { status: 'Waiting', remark: 'Registered', date: new Date().toISOString() },
      { status: 'Checked-In', remark: 'Arrived', date: new Date().toISOString() }
    ]
  }
];

const booths = [
  { id: uuidv4(), boothNumber: 'Booth 1', salesManager: 'Amit Singh', status: 'Available', customerId: null },
  { id: uuidv4(), boothNumber: 'Booth 2', salesManager: 'Neha Mehta', status: 'Available', customerId: null },
  { id: uuidv4(), boothNumber: 'Booth 3', salesManager: 'Rahul Sharma', status: 'Available', customerId: null },
  { id: uuidv4(), boothNumber: 'Booth 4', salesManager: 'Priya Verma', status: 'Assigned', customerId: customers[1].id }
];

const boothAssignments = [
  {
    id: uuidv4(),
    customerId: customers[1].id,
    boothId: booths[3].id,
    boothNumber: booths[3].boothNumber,
    salesManagerName: booths[3].salesManager,
    status: 'Assigned',
    remark: 'Initial assignment',
    createdAt: new Date().toISOString()
  }
];

function getStatusHistory(customerId) {
  const customer = customers.find((item) => item.id === customerId);
  return customer ? customer.statusHistory : [];
}

module.exports = {
  customers,
  booths,
  boothAssignments,
  getStatusHistory
};
