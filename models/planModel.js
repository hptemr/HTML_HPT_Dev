const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "appointments"
  },
  soap_note_type: { type: String },
  plan_note_type: { type: String },
  plan_note: { type: String },
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
    self_care: { type: Boolean },
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
    self_care: { type: Boolean },
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
  process_patient: { type: Boolean,default:false },
  anticipat_DC: { type: Boolean,default:false },
  status: { type: String, enum: ['Draft', 'Finalized'], default: 'Draft' },
  is_deleted:{ type: Boolean,default:false },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "users"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  version: { type: String, default: 'v1' },
  is_disabled:{ type: Boolean,default:false },
});

module.exports = mongoose.model('plans', planSchema);