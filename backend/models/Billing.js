const mongoose = require('mongoose');

const billingSchema = mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  studentName: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'pending'], default: 'pending' },
  dueDate: { type: Date, required: true },
  paymentDate: { type: Date },
}, { timestamps: true });

const Billing = mongoose.model('Billing', billingSchema);
module.exports = Billing;
