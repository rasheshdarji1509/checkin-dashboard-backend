const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const customerRoutes = require('./routes/customerRoutes');
const qrRoutes = require('./routes/qrRoutes');
const boothRoutes = require('./routes/boothRoutes');
const statusRoutes = require('./routes/statusRoutes');
const authenticate = require('./middleware/authenticate');
const { connectDb } = require('./db');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/login', authRoutes);
app.use('/api/dashboard-summary', authenticate, dashboardRoutes);
app.use('/api/customers', authenticate, customerRoutes);
app.use('/api/qr-codes', authenticate, qrRoutes);
app.use('/api/booth-assignments', authenticate, boothRoutes);
app.use('/api/customer-status', authenticate, statusRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

connectDb()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please stop the running process or change PORT in .env.`);
        process.exit(1);
      }
      console.error('Server failed to start:', error);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
