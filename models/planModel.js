const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "appointments"
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "patients"
  },
  daily_note_plan: { type: Boolean },
  daily_note: { type: String },
  freequency_per_week: { type: String },
  duration_per_week: { type: String },
  plan_start_date: { type: Date },
  plan_end_date: { type: Date },
  pt_treatment_provided:{
    therapeutic_activity: { type: Boolean },
    neuromuscular_rehabilitation: { type: Boolean },
    aquatic_therapy: { type: Boolean },
    therapeutic_exercise: { type: Boolean },
    patient_ed_hep_rtm: { type: Boolean },
    manual_therapy: { type: Boolean },
    modalities: { type: Boolean },
    splinting: { type: Boolean },
    wound_care: { type: Boolean },
    self_are: { type: Boolean },
    group_therapy: { type: Boolean },
    cognition: { type: Boolean }
  },
  ot_treatment_provided:{
    therapeutic_activity: { type: Boolean },
    neuromuscular_rehabilitation: { type: Boolean },
    aquatic_therapy: { type: Boolean },
    therapeutic_exercise: { type: Boolean },
    patient_ed_hep_rtm: { type: Boolean },
    manual_therapy: { type: Boolean },
    modalities: { type: Boolean },
    splinting: { type: Boolean },
    wound_care: { type: Boolean },
    self_are: { type: Boolean },
    group_therapy: { type: Boolean },
    cognition: { type: Boolean }
  },
  slp_treatment_provided:{
    evaluation_of_oral: { type: Boolean },
    individual: { type: Boolean },
    treatment_of_swallowing: { type: Boolean },
    Speech_generating_augmentative: { type: Boolean },
    aphasia_assessment: { type: Boolean },
    cognitive_skills: { type: Boolean },
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "users"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('plans', planSchema);