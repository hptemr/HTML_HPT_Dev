const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dischargeNotesSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "appointments"
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "patients"
  },
  discharge_note_date:  { type: Date },
  treatment_side: {
    type: String,
    enum: ["Left", "Right", "Bilateral"],
  },
  surgery_date:  { type: Date },
  surgery_type: { type: String },
  subjective_note: { type: String },

  dis_assessment_text: { type: String },
  dis_assessment_icd: [{
    problem: String,
    long_term_goal: String
  }],
  supporting_documentation_text: { type: String },
  status: { type: String, enum: ['Draft', 'Finalize'], default: 'Draft' },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "users"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('discharge_notes',dischargeNotesSchema);