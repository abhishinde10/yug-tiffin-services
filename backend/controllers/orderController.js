const ParcelOrder = require('../models/ParcelOrder');

// @desc    Get all parcel orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res, next) => {
  try {
    const orders = await ParcelOrder.find().populate('studentId', 'name email phone');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrder = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await ParcelOrder.findById(req.params.id);

    if (order) {
      order.status = status || order.status;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  updateOrder,
};
