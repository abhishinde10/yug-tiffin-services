const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  lunchItems: { type: [String], required: true },
  dinnerItems: { type: [String], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
