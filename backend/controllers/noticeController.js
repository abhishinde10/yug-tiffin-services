const Notice = require('../models/Notice');

// @desc    Get all notices
// @route   GET /api/notices
// @access  Public or Student
const getNotices = async (req, res, next) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a notice
// @route   POST /api/notices
// @access  Private/Admin
const createNotice = async (req, res, next) => {
  try {
    const { title, message } = req.body;

    const notice = new Notice({
      title,
      message,
      createdBy: req.user._id,
    });

    const createdNotice = await notice.save();
    res.status(201).json(createdNotice);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotices,
  createNotice,
};
