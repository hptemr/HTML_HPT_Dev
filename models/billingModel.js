const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "appointments"
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "patients"
  },
  total_treatment_minutes: { type: String },
  total_direct_minutes: { type: String },
  total_units: { type: String },
  pt_codes:{
    low_complexity:{ selected: { type: Boolean }, units:{ type: String }},
    moderate_complexity:{ selected: { type: Boolean }, units:{ type: String }},
    high_complexity:{ selected: { type: Boolean }, units:{ type: String }},
    re_evaluation:{ selected: { type: Boolean }, units:{ type: String }},
    paraffin_bath:{ selected: { type: Boolean }, units:{ type: String }},
    vasopneumatic_device:{ selected: { type: Boolean }, units:{ type: String }},
    mechanical_traction:{ selected: { type: Boolean }, units:{ type: String }},
    e_stim_unattended:{ selected: { type: Boolean }, units:{ type: String }}
  },
  ot_codes:{
    low_complexity:{ selected: { type: Boolean }, units:{ type: String }},
    moderate_complexity:{ selected: { type: Boolean }, units:{ type: String }},
    high_complexity:{ selected: { type: Boolean }, units:{ type: String }},
    re_evaluation:{ selected: { type: Boolean }, units:{ type: String }},
    paraffin_bath:{ selected: { type: Boolean }, units:{ type: String }},
    vasopneumatic_device:{ selected: { type: Boolean }, units:{ type: String }},
    mechanical_traction:{ selected: { type: Boolean }, units:{ type: String }},
    e_stim_unattended:{ selected: { type: Boolean }, units:{ type: String }}
  },
  slp_codes:{
    evaluation_of_speech:{ selected: { type: Boolean }, units:{ type: String }},
    evaluation_of_speech_language:{ selected: { type: Boolean }, units:{ type: String }},
    voice_and_resonance:{ selected: { type: Boolean }, units:{ type: String }},
    re_evaluation:{ selected: { type: Boolean }, units:{ type: String }},
    paraffin_bath:{ selected: { type: Boolean }, units:{ type: String }},
    evaluation_of_oral:{ selected: { type: Boolean }, units:{ type: String }},
    use_of_speech_device:{ selected: { type: Boolean }, units:{ type: String }},
    slp_treatment:{ selected: { type: Boolean }, units:{ type: String }},
    treatment_of_swallowing_dysfunction:{ selected: { type: Boolean }, units:{ type: String }},
    assessment_of_aphasia:{ selected: { type: Boolean }, units:{ type: String }},
    standardized_cognitive_performance:{ selected: { type: Boolean }, units:{ type: String }},
    therapeutic_interventions:{ selected: { type: Boolean }, units:{ type: String }},
  },
  dt_codes:{
    therapeutic_activity:{ selected: { type: String }, units:{ type: String }},
    neuro_muscular_re_education:{ selected: { type: String }, units:{ type: String }},
    aquatic_exercise:{ selected: { type: String }, units:{ type: String }},
    therapeutic_exercise:{ selected: { type: String }, units:{ type: String }},
    manual_therapy:{ selected: { type: String }, units:{ type: String }},
  },

  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "users"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('billings', billingSchema);