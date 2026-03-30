const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // e.g., "April 2024"
  status: { type: String, enum: ['paid', 'pending'], default: 'pending' },
  paymentDate: { type: Date },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
