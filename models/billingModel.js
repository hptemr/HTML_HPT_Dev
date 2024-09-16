const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "appointments"
  },
  soap_note_type: { type: String },
  total_treatment_minutes: { type: String },
  total_direct_minutes: { type: String },
  total_units: { type: String },
  united_pt_codes:{
    low_complexity:{ selected: { type: Boolean }, units:{ type: String }},
    moderate_complexity:{ selected: { type: Boolean }, units:{ type: String }},
    high_complexity:{ selected: { type: Boolean }, units:{ type: String }},
    re_evaluation:{ selected: { type: Boolean }, units:{ type: String }},
    paraffin_bath:{ selected: { type: Boolean }, units:{ type: String }},
    vasopneumatic_device:{ selected: { type: Boolean }, units:{ type: String }},
    mechanical_traction:{ selected: { type: Boolean }, units:{ type: String }},
    e_stim_unattended:{ selected: { type: Boolean }, units:{ type: String }}
  },
  united_ot_codes:{
    low_complexity:{ selected: { type: Boolean }, units:{ type: String }},
    moderate_complexity:{ selected: { type: Boolean }, units:{ type: String }},
    high_complexity:{ selected: { type: Boolean }, units:{ type: String }},
    re_evaluation:{ selected: { type: Boolean }, units:{ type: String }},
    paraffin_bath:{ selected: { type: Boolean }, units:{ type: String }},
    vasopneumatic_device:{ selected: { type: Boolean }, units:{ type: String }},
    mechanical_traction:{ selected: { type: Boolean }, units:{ type: String }},
    e_stim_unattended:{ selected: { type: Boolean }, units:{ type: String }}
  },
  united_slp_codes:{
    evaluation_of_speech:{ selected: { type: Boolean }, units:{ type: String }},
    evaluation_of_speech_language:{ selected: { type: Boolean }, units:{ type: String }},
    voice_and_resonance:{ selected: { type: Boolean }, units:{ type: String }},
    evaluation_of_oral:{ selected: { type: Boolean }, units:{ type: String }},
    use_of_speech_device:{ selected: { type: Boolean }, units:{ type: String }},
    slp_treatment:{ selected: { type: Boolean }, units:{ type: String }},
    treatment_of_swallowing_dysfunction:{ selected: { type: Boolean }, units:{ type: String }},
    assessment_of_aphasia:{ selected: { type: Boolean }, units:{ type: String }},
    standardized_cognitive_performance:{ selected: { type: Boolean }, units:{ type: String }},
    therapeutic_interventions:{ selected: { type: Boolean }, units:{ type: String }},
  },
  direct_pt_codes:{
    therapeutic_activity:{ minutes: { type: String }, units:{ type: String }},
    neuro_muscular_re_education:{ minutes: { type: String }, units:{ type: String }},
    aquatic_exercise:{ minutes: { type: String }, units:{ type: String }},
    therapeutic_exercise:{ minutes: { type: String }, units:{ type: String }},
    manual_therapy:{ minutes: { type: String }, units:{ type: String }},
  },
  direct_ot_codes:{
    therapeutic_activity:{ minutes: { type: String }, units:{ type: String }},
    neuro_muscular_re_education:{ minutes: { type: String }, units:{ type: String }},
    aquatic_exercise:{ minutes: { type: String }, units:{ type: String }},
    therapeutic_exercise:{ minutes: { type: String }, units:{ type: String }},
    manual_therapy:{ minutes: { type: String }, units:{ type: String }},
    therapeutic_interventions:{ minutes: { type: String }, units:{ type: String }},
  },
  direct_slp_codes:{
    gait_train:{ minutes: { type: String }, units:{ type: String }},
    performance_test:{ minutes: { type: String }, units:{ type: String }}
  },
  dme_cpt_codes:{
    half_foam_roll_12:{ quantity:{ type: String }},
    pulley:{ quantity:{ type: String }},
    half_foam_roll_36:{ quantity:{ type: String }},
    who_free_fab:{ quantity:{ type: String }},
    who_custom:{ quantity:{ type: String }},
    padding_bandage:{ quantity:{ type: String }},
    elastomull:{ quantity:{ type: String }},
    putty:{ quantity:{ type: String }},
    hfo_custom:{ quantity:{ type: String }},
    ho_custom:{ quantity:{ type: String }},
    patellofemoral_sleeve:{ quantity:{ type: String }},
    knee_orthosis:{ quantity:{ type: String }},
    aso_brace:{ quantity:{ type: String }},
    fo_custom:{ quantity:{ type: String }},
    whfo_custom:{ quantity:{ type: String }},
  },
  additional_cpt_code:  {type: Array, default: [] }, 
  no_visit_charges: { type: Boolean },
  status: { type: String, enum: ['Draft', 'Finalize'], default: 'Draft' },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "users"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('billings', billingSchema);