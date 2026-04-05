const Payment = require('../models/Payment');
const Billing = require('../models/Billing');
const Razorpay = require('razorpay');
const crypto = require('crypto');

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

// @desc    Create a payment order via Razorpay
// @route   POST /api/payments/create-order
// @access  Private/Student
const createOrder = async (req, res, next) => {
  try {
    const { amount, billId } = req.body;
    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: billId,
    };

    const order = await razorpay.orders.create(options);
    
    if (!order) {
      res.status(500);
      throw new Error('Failed to create order');
    }

    res.json({
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Verify payment signature
// @route   POST /api/payments/verify
// @access  Private/Student
const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, billId } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                            .update(sign.toString())
                            .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is authentic
      const bill = await Billing.findById(billId);
      if (bill) {
        bill.status = 'paid';
        bill.paymentDate = Date.now();
        await bill.save();
      }
      
      const payment = new Payment({
        studentId: req.user._id,
        amount: bill ? bill.amount : 0,
        month: bill ? bill.month : new Date().toLocaleString('default', { month: 'long' }),
        status: 'paid',
        paymentDate: Date.now()
      });
      await payment.save();

      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400);
      throw new Error("Invalid signature sent!");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPayments,
  createPayment,
  updatePayment,
  createOrder,
  verifyPayment,
};
