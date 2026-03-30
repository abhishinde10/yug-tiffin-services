const Billing = require('../models/Billing');
const User = require('../models/User');

// @desc    Generate monthly bills for all active students
// @route   POST /api/billing/generate
// @access  Private/Admin
const generateBills = async (req, res, next) => {
  try {
    const { month, year, amount, dueDate } = req.body;
    
    // Find all active students
    const students = await User.find({ role: 'student', membershipPlan: { $ne: 'none' } });
    
    const billsToCreate = students.map(student => ({
      studentId: student._id,
      studentName: student.name,
      month: month,
      year: year,
      amount: amount,
      status: 'pending',
      dueDate: dueDate,
    }));

    if (billsToCreate.length > 0) {
      await Billing.insertMany(billsToCreate);
      res.status(201).json({ message: `${billsToCreate.length} bills generated successfully.` });
    } else {
      res.status(400).json({ message: 'No active students found to generate bills.' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Generate a bill for a specific student
// @route   POST /api/billing/create
// @access  Private/Admin
const createBill = async (req, res, next) => {
  try {
    const { studentId, month, year, amount, dueDate } = req.body;
    
    const student = await User.findById(studentId);
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    const bill = await Billing.create({
      studentId: student._id,
      studentName: student.name,
      month,
      year,
      amount,
      status: 'pending',
      dueDate
    });

    res.status(201).json({ message: 'Bill generated successfully', bill });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bills (Admin can view all, Student can view theirs)
// @route   GET /api/billing
// @access  Private
const getBills = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role === 'admin') {
       if (req.query.month) {
           query.month = req.query.month;
       }
    } else {
       query.studentId = req.user._id;
    }

    const bills = await Billing.find(query).populate('studentId', 'name email phone');
    res.json(bills);
  } catch (error) {
    next(error);
  }
};

// @desc    Update bill status
// @route   PUT /api/billing/:id
// @access  Private/Admin
const updateBill = async (req, res, next) => {
  try {
    const { status } = req.body;

    const bill = await Billing.findById(req.params.id);

    if (bill) {
      bill.status = status || bill.status;
      if (status === 'paid') {
        bill.paymentDate = Date.now();
      }

      const updatedBill = await bill.save();
      res.json(updatedBill);
    } else {
      res.status(404);
      throw new Error('Bill not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateBills,
  createBill,
  getBills,
  updateBill,
};
