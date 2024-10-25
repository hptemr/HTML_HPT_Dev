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
  updateInfo: { type: Array, default: [] },//keys will be ==> "fromAdminId, updatedAt, userRole"
  status: { type: String, enum: ['Draft', 'Finalized'], default: 'Draft' },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "users"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('case_notes', caseNotesSchema);