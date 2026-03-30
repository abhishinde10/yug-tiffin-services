const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: true });

const Notice = mongoose.model('Notice', noticeSchema);
module.exports = Notice;
