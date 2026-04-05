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
    
    // Fetch student name from User collection
    const student = await User.findById(studentId);
    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    // Save bill with status = "pending"
    const bill = await Billing.create({
      studentId: student._id,
      studentName: student.name,
      month,
      year: Number(year),
      amount: Number(amount),
      status: 'pending',
      dueDate
    });

    res.status(201).json({ message: 'Bill generated successfully', bill });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bills (Admin)
// @route   GET /api/billing/all
// @access  Private/Admin
const getAllBills = async (req, res, next) => {
  try {
    // Return all bills with student details
    const bills = await Billing.find({}).populate('studentId', 'name email phone').sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    next(error);
  }
};

// @desc    Get student bills
// @route   GET /api/billing/student/:id
// @access  Private 
const getStudentBills = async (req, res, next) => {
  try {
    const studentId = req.params.id;

    // Optional security: check if req.user._id == studentId or admin
    if (req.user.role !== 'admin' && req.user._id.toString() !== studentId) {
       res.status(403);
       throw new Error('Not authorized to view these bills');
    }

    // Return only bills of that student
    const bills = await Billing.find({ studentId }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    next(error);
  }
};

// @desc    Mark bill as paid
// @route   PUT /api/billing/:id/pay
// @access  Private/Admin
const markBillPaid = async (req, res, next) => {
  try {
    const bill = await Billing.findById(req.params.id);

    if (bill) {
      // Update status = "paid"
      bill.status = 'paid';
      bill.paymentDate = Date.now();

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
  getAllBills,
  getStudentBills,
  markBillPaid,
};
