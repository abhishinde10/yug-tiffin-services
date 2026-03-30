const User = require('../models/User');
const Menu = require('../models/Menu');
const Payment = require('../models/Payment');
const ParcelOrder = require('../models/ParcelOrder');
const Feedback = require('../models/Feedback');

// @desc    Get student dashboard stats
// @route   GET /api/student/dashboard
// @access  Private/Student
const getStudentDashboard = async (req, res, next) => {
  try {
    const student = await User.findById(req.user._id).select('-password');

    // Get today's menu
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todaysMenu = await Menu.findOne({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      }
    });

    // Get latest payment status
    const latestPayment = await Payment.findOne({ studentId: req.user._id }).sort({ createdAt: -1 });

    // Get recent parcel history
    const parcelHistory = await ParcelOrder.find({ studentId: req.user._id }).sort({ createdAt: -1 }).limit(5);

    res.json({
      membershipDetails: {
        plan: student.membershipPlan,
        joinDate: student.joinDate,
      },
      todaysMenu: todaysMenu || null,
      paymentStatus: latestPayment ? latestPayment.status : 'No payment records',
      parcelHistory,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a parcel order
// @route   POST /api/student/parcel
// @access  Private/Student
const createParcel = async (req, res, next) => {
  try {
    const { mealType, orderDate } = req.body;

    const parcel = new ParcelOrder({
      studentId: req.user._id,
      mealType,
      orderDate,
      status: 'pending',
    });

    const createdParcel = await parcel.save();
    res.status(201).json(createdParcel);
  } catch (error) {
    next(error);
  }
};

// @desc    Submit feedback
// @route   POST /api/student/feedback
// @access  Private/Student
const submitFeedback = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const feedback = new Feedback({
      studentId: req.user._id,
      rating,
      comment,
    });

    const createdFeedback = await feedback.save();
    res.status(201).json(createdFeedback);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudentDashboard,
  createParcel,
  submitFeedback,
};
