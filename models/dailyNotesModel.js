const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailyNotesSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "appointments"
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "patients"
  },
  daily_note_date:  { type: Date },
  subjective_note: { type: String },
  assessment_text: { type: String },
  supporting_documentation_text: { type: String },
  status: { type: String, enum: ['Draft', 'Finalize'], default: 'Draft' },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "users"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('daily_notes', dailyNotesSchema);