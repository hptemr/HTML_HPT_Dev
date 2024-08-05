const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const caseNotesSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "appointments"
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "patients"
  },
  case_note_date:  { type: Date },
  case_comment: { type: String },
  status: { type: String, enum: ['Draft', 'Finalize'], default: 'Draft' },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "users"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('case_notes', caseNotesSchema);