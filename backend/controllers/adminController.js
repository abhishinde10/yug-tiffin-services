const User = require('../models/User');
const Payment = require('../models/Payment');
const ParcelOrder = require('../models/ParcelOrder');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getAdminDashboard = async (req, res, next) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const activeMemberships = await User.countDocuments({ role: 'student', membershipPlan: { $ne: 'none' } });
    const pendingPayments = await Payment.countDocuments({ status: 'pending' });
    
    // Today's parcel orders start and end of day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todaysParcels = await ParcelOrder.countDocuments({
      orderDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: 'pending'
    });

    // Monthly revenue: sum of paid payments for current month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);
    
    const paidPayments = await Payment.aggregate([
      {
        $match: {
          status: 'paid',
          paymentDate: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    const monthlyRevenue = paidPayments.length > 0 ? paidPayments[0].total : 0;

    res.json({
      totalStudents,
      activeMemberships,
      pendingPayments,
      todaysParcels,
      monthlyRevenue,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private/Admin
const getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a student
// @route   POST /api/admin/add-student
// @access  Private/Admin
const addStudent = async (req, res, next) => {
  try {
    const { name, email, phone, password, membershipPlan } = req.body;
    
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const student = await User.create({
      name,
      email,
      phone,
      password,
      role: 'student',
      membershipPlan: membershipPlan || 'none',
      paymentStatus: req.body.paymentStatus || 'pending',
      joinDate: req.body.joinDate || Date.now(),
    });

    if (student) {
      res.status(201).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        membershipPlan: student.membershipPlan,
        paymentStatus: student.paymentStatus,
        joinDate: student.joinDate,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update a student
// @route   PUT /api/admin/update-student/:id
// @access  Private/Admin
const updateStudent = async (req, res, next) => {
  try {
    const student = await User.findById(req.params.id);

    if (student && student.role === 'student') {
      student.name = req.body.name || student.name;
      student.email = req.body.email || student.email;
      student.phone = req.body.phone || student.phone;
      student.membershipPlan = req.body.membershipPlan || student.membershipPlan;
      student.paymentStatus = req.body.paymentStatus || student.paymentStatus;
      student.joinDate = req.body.joinDate || student.joinDate;

      if (req.body.password) {
        student.password = req.body.password;
      }

      const updatedStudent = await student.save();
      
      res.json({
        _id: updatedStudent._id,
        name: updatedStudent.name,
        email: updatedStudent.email,
        phone: updatedStudent.phone,
        membershipPlan: updatedStudent.membershipPlan,
        paymentStatus: updatedStudent.paymentStatus,
        joinDate: updatedStudent.joinDate,
      });
    } else {
      res.status(404);
      throw new Error('Student not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a student
// @route   DELETE /api/admin/delete-student/:id
// @access  Private/Admin
const deleteStudent = async (req, res, next) => {
  try {
    const student = await User.findById(req.params.id);

    if (student && student.role === 'student') {
      await User.deleteOne({ _id: student._id });
      res.json({ message: 'Student removed' });
    } else {
      res.status(404);
      throw new Error('Student not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminDashboard,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};
