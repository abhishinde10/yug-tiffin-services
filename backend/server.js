require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://yug-tiffin-services.vercel.app"
  ],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To accept JSON data

// Route imports
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const menuRoutes = require('./routes/menuRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const billingRoutes = require('./routes/billingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const tiffinRoutes = require('./routes/tiffinRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/tiffin', tiffinRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
