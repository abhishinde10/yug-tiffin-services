const TiffinStudent = require('../models/TiffinStudent');
const TiffinRecord = require('../models/TiffinRecord');
const mongoose = require('mongoose');

// Add Student
const addStudent = async (req, res) => {
  try {
    const { name, mobile, Class } = req.body;
    const student = new TiffinStudent({ name, mobile, Class });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error: error.message });
  }
};

// Get all active students
const getStudents = async (req, res) => {
  try {
    const students = await TiffinStudent.find({ isActive: true });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving students', error: error.message });
  }
};

// Remove student (Soft delete or hard delete based on preference. Placed as Hard)
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await TiffinStudent.findByIdAndDelete(id);
    // Optionally remove their records too, or keep for history.
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
};

// Get daily records and auto-generate if none exist
const getDailyRecords = async (req, res) => {
  try {
    const { date } = req.query; // DD-MM-YYYY format expected
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    // 1. Fetch current records for the date populated with student info
    let records = await TiffinRecord.find({ date }).populate('studentId');

    // 2. Fetch all active students
    const activeStudents = await TiffinStudent.find({ isActive: true });

    // 3. If records length doesn't match active students, there might be missing records.
    // Especially when none exist or a new student was added today.
    const existingRecordStudentIds = records.map(r => r.studentId._id.toString());
    
    let generatedCount = 0;
    const newRecordsToInsert = [];

    for (let student of activeStudents) {
      if (!existingRecordStudentIds.includes(student._id.toString())) {
        newRecordsToInsert.push({
          studentId: student._id,
          date: date,
          status: 'none'
        });
      }
    }

    // Insert new missing records in bulk
    if (newRecordsToInsert.length > 0) {
      await TiffinRecord.insertMany(newRecordsToInsert);
      // Refetch the records to include newly inserted populated
      records = await TiffinRecord.find({ date }).populate('studentId');
    }

    // Because studentId can be null if student was HARD deleted, filter them out temporarily
    records = records.filter(record => record.studentId !== null);

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving daily records', error: error.message });
  }
};

// Give Tiffin -> pending
const giveTiffin = async (req, res) => {
  try {
    const { id } = req.params; // TiffinRecord ID
    const record = await TiffinRecord.findByIdAndUpdate(
      id, 
      { status: 'pending' }, 
      { new: true }
    ).populate('studentId');
    
    if (!record) return res.status(404).json({ message: 'Record not found' });
    
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};

// Receive Tiffin -> received
const receiveTiffin = async (req, res) => {
  try {
    const { id } = req.params; // TiffinRecord ID
    const record = await TiffinRecord.findByIdAndUpdate(
      id, 
      { status: 'received' }, 
      { new: true }
    ).populate('studentId');
    
    if (!record) return res.status(404).json({ message: 'Record not found' });
    
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};

module.exports = {
  addStudent,
  getStudents,
  deleteStudent,
  getDailyRecords,
  giveTiffin,
  receiveTiffin
};
