const mongoose = require('mongoose');

const tiffinRecordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TiffinStudent',
    required: true
  },
  date: {
    type: String, // DD-MM-YYYY
    required: true,
    index: true 
  },
  status: {
    type: String,
    enum: ['none', 'pending', 'received'],
    default: 'none'
  }
}, {
  timestamps: true
});

// Ensuring a student only has one record per date
tiffinRecordSchema.index({ studentId: 1, date: 1 }, { unique: true });

const TiffinRecord = mongoose.model('TiffinRecord', tiffinRecordSchema);
module.exports = TiffinRecord;
