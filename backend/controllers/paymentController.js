const Payment = require('../models/Payment');

// @desc    Get all payments (Admin) or user payments (Student)
// @route   GET /api/payments
// @access  Private
const getPayments = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      const payments = await Payment.find().populate('studentId', 'name email');
      res.json(payments);
    } else {
      const payments = await Payment.find({ studentId: req.user._id });
      res.json(payments);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a payment record
// @route   POST /api/payments
// @access  Private/Admin
const createPayment = async (req, res, next) => {
  try {
    const { studentId, amount, month } = req.body;

    const payment = new Payment({
      studentId,
      amount,
      month,
      status: 'pending',
    });

    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
  } catch (error) {
    next(error);
  }
};

// @desc    Update payment status
// @route   PUT /api/payments/:id
// @access  Private/Admin
const updatePayment = async (req, res, next) => {
  try {
    const { status } = req.body;

    const payment = await Payment.findById(req.params.id);

    if (payment) {
      payment.status = status || payment.status;
      if (status === 'paid') {
        payment.paymentDate = Date.now();
      }

      const updatedPayment = await payment.save();
      res.json(updatedPayment);
    } else {
      res.status(404);
      throw new Error('Payment not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPayments,
  createPayment,
  updatePayment,
};
