const mongoose = require('mongoose');

const parcelOrderSchema = mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  mealType: { type: String, enum: ['lunch', 'dinner'], required: true },
  orderDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

const ParcelOrder = mongoose.model('ParcelOrder', parcelOrderSchema);
module.exports = ParcelOrder;
