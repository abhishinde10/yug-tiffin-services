const Menu = require('../models/Menu');

// @desc    Get all menus
// @route   GET /api/menu
// @access  Public or Student
const getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find().sort({ date: -1 });
    res.json(menus);
  } catch (error) {
    next(error);
  }
};

// @desc    Get today's menu
// @route   GET /api/menu/today
// @access  Public
const getTodayMenu = async (req, res, next) => {
  try {
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setUTCDate(todayEnd.getUTCDate() + 1);

    let menu = await Menu.findOne({ date: { $gte: todayStart, $lt: todayEnd } });

    if (!menu) {
      // Fallback to the latest available menu
      menu = await Menu.findOne().sort({ date: -1 });
    }

    if (menu) {
      res.json(menu);
    } else {
      res.status(404).json({ message: 'Menu not available' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a menu
// @route   POST /api/menu
// @access  Private/Admin
const createMenu = async (req, res, next) => {
  try {
    const { date, lunchItems, dinnerItems } = req.body;

    const existingMenu = await Menu.findOne({ date });
    if (existingMenu) {
      res.status(400);
      throw new Error('Menu already exists for this date');
    }

    const menu = new Menu({
      date,
      lunchItems,
      dinnerItems,
      createdBy: req.user._id,
    });

    const createdMenu = await menu.save();
    res.status(201).json(createdMenu);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a menu
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMenu = async (req, res, next) => {
  try {
    const { date, lunchItems, dinnerItems } = req.body;

    const menu = await Menu.findById(req.params.id);

    if (menu) {
      menu.date = date || menu.date;
      menu.lunchItems = lunchItems || menu.lunchItems;
      menu.dinnerItems = dinnerItems || menu.dinnerItems;

      const updatedMenu = await menu.save();
      res.json(updatedMenu);
    } else {
      res.status(404);
      throw new Error('Menu not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a menu
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (menu) {
      await Menu.deleteOne({ _id: menu._id });
      res.json({ message: 'Menu deleted' });
    } else {
      res.status(404);
      throw new Error('Menu not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenus,
  getTodayMenu,
  createMenu,
  updateMenu,
  deleteMenu,
};
