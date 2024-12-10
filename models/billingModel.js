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
    low_complexity:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97161' }, chargePerUnit:{ type: String, default:'182.01'}},
    moderate_complexity:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97162' }, chargePerUnit:{ type: String, default:'182.01'}},
    high_complexity:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97163' }, chargePerUnit:{ type: String, default:'182.01'}},
    re_evaluation:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97164' }, chargePerUnit:{ type: String, default:'126.38'}},
    paraffin_bath:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97018' }, chargePerUnit:{ type: String, default:'10.38'}},
    vasopneumatic_device:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97016' }, chargePerUnit:{ type: String, default:'21.37'}},
    mechanical_traction:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97012' }, chargePerUnit:{ type: String, default:'26.25'}},
    e_stim_unattended:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'G0283' }, chargePerUnit:{ type: String, default:'23.81'}}
  },
  united_ot_codes:{
    low_complexity:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97165' }, chargePerUnit:{ type: String, default:'183.83'}},
    moderate_complexity:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97166' }, chargePerUnit:{ type: String, default:'183.83'}},
    high_complexity:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97167' }, chargePerUnit:{ type: String, default:'172.77'}},
    re_evaluation:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97168' }, chargePerUnit:{ type: String, default:'126.99'}},
    paraffin_bath:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97018' }, chargePerUnit:{ type: String, default:'10.38'}},
    vasopneumatic_device:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97016' }, chargePerUnit:{ type: String, default:'21.37'}},
    mechanical_traction:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97012' }, chargePerUnit:{ type: String, default:'26.25'}},
    e_stim_unattended:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'G0283' }, chargePerUnit:{ type: String, default:'23.81'}}
  },
  united_slp_codes:{
    evaluation_of_speech:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'92522' }, chargePerUnit:{ type: String, default:'200.24'}},
    evaluation_of_speech_language:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'92523' }, chargePerUnit:{ type: String, default:'413.61'}},
    voice_and_resonance:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'92524' }, chargePerUnit:{ type: String, default:'198.95'}},
    evaluation_of_oral:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'92610' }, chargePerUnit:{ type: String, default:'151.4'}},
    use_of_speech_device:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'92609' }, chargePerUnit:{ type: String, default:'187.42'}},
    slp_treatment:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'92507' }, chargePerUnit:{ type: String, default:'138.48'}},
    treatment_of_swallowing_dysfunction:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'92526' }, chargePerUnit:{ type: String, default:'153.59'}},
    assessment_of_aphasia:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'96105' }, chargePerUnit:{ type: String, default:'176.43'}},
    standardized_cognitive_performance:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'96125' }, chargePerUnit:{ type: String, default:'186.81'}},
    therapeutic_interventions:{ selected: { type: Boolean }, units:{ type: String },minutes: { type: String }, cptCode:{ type: String, default:'97129' }, chargePerUnit:{ type: String, default:'40.9'}},
  },
  direct_pt_codes:{
    therapeutic_activity:{ minutes: { type: String }, units:{ type: String }, cptCode:{ type: String, default:'97530' }, chargePerUnit:{ type: String, default:'68.99' }},
    neuro_muscular_re_education:{ minutes: { type: String }, units:{ type: String }, cptCode:{ type: String, default:'97112' }, chargePerUnit:{ type: String, default:'61.66' }},
    aquatic_exercise:{ minutes: { type: String }, units:{ type: String }, cptCode:{ type: String, default:'97113' }, chargePerUnit:{ type: String, default:'67.16' }},
    therapeutic_exercise:{ minutes: { type: String }, units:{ type: String }, cptCode:{ type: String, default:'97110' }, chargePerUnit:{ type: String, default:'53.21' }},
    manual_therapy:{ minutes: { type: String }, units:{ type: String }, cptCode:{ type: String, default:'97140' }, chargePerUnit:{ type: String, default:'48.98' }},
  },
  direct_ot_codes:{
    therapeutic_activity:{ minutes: { type: String }, units:{ type: String },cptCode:{ type: String, default:'97530' }, chargePerUnit:{ type: String, default:'68.99' }},
    neuro_muscular_re_education:{ minutes: { type: String }, units:{ type: String }, cptCode:{ type: String, default:'97112' }, chargePerUnit:{ type: String, default:'61.66' }},
    aquatic_exercise:{ minutes: { type: String }, units:{ type: String }, cptCode:{ type: String, default:'97113' }, chargePerUnit:{ type: String, default:'67.16' }},
    therapeutic_exercise:{ minutes: { type: String }, units:{ type: String }, cptCode:{ type: String, default:'97110' }, chargePerUnit:{ type: String, default:'53.21' }},
    manual_therapy:{ minutes: { type: String }, units:{ type: String }, cptCode:{ type: String, default:'97140' }, chargePerUnit:{ type: String, default:'48.98' }},
    therapeutic_interventions:{ minutes: { type: String }, units:{ type: String }, cptCode:{ type: String, default:'97130' }, chargePerUnit:{ type: String, default:'39.68'}},
  },
  direct_slp_codes:{
    gait_train:{ minutes: { type: String }, units:{ type: String }, cptCode:{ type: String, default:'97116' }, chargePerUnit:{ type: String, default:'53.21'}},
    performance_test:{ minutes: { type: String }, units:{ type: String }, cptCode:{ type: String, default:'97750' }, chargePerUnit:{ type: String, default:'61.68'}}
  },
  dme_cpt_codes:{
    half_foam_roll_12:{ quantity:{ type: String }, cptCode:{ type: String, default:'A9300D' }, chargePerUnit:{ type: String, default:'8'}},
    pulley:{ quantity:{ type: String }, cptCode:{ type: String, default:'A9300A' }, chargePerUnit:{ type: String, default:'13'}},
    half_foam_roll_36:{ quantity:{ type: String }, cptCode:{ type: String, default:'A9300F' }, chargePerUnit:{ type: String, default:'18'}},
    who_free_fab:{ quantity:{ type: String }, cptCode:{ type: String, default:'' }, chargePerUnit:{ type: String, default:''}},
    who_custom:{ quantity:{ type: String }, cptCode:{ type: String, default:'' }, chargePerUnit:{ type: String, default:''}},
    padding_bandage:{ quantity:{ type: String }, cptCode:{ type: String, default:'' }, chargePerUnit:{ type: String, default:''}},
    elastomull:{ quantity:{ type: String }, cptCode:{ type: String, default:'A4467' }, chargePerUnit:{ type: String, default:'13'}},
    putty:{ quantity:{ type: String }, cptCode:{ type: String, default:'A9300B' }, chargePerUnit:{ type: String, default:'10'}},
    hfo_custom:{ quantity:{ type: String }, cptCode:{ type: String, default:'' }, chargePerUnit:{ type: String, default:''}},
    ho_custom:{ quantity:{ type: String }, cptCode:{ type: String, default:'' }, chargePerUnit:{ type: String, default:''}},
    patellofemoral_sleeve:{ quantity:{ type: String }, cptCode:{ type: String, default:'' }, chargePerUnit:{ type: String, default:''}},
    knee_orthosis:{ quantity:{ type: String }, cptCode:{ type: String, default:'' }, chargePerUnit:{ type: String, default:''}},
    aso_brace:{ quantity:{ type: String }, cptCode:{ type: String, default:'' }, chargePerUnit:{ type: String, default:''}},
    fo_custom:{ quantity:{ type: String }, cptCode:{ type: String, default:'' }, chargePerUnit:{ type: String, default:''}},
    whfo_custom:{ quantity:{ type: String }, cptCode:{ type: String, default:'' }, chargePerUnit:{ type: String, default:''}},
  },
  additional_cpt_code:  {type: Array, default: [] }, 
  no_visit_charges: { type: Boolean },
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
  addendums:{ type: Array, default: [] },
  createUser: { type: String, default: '' },
  addendumId: { type: mongoose.Schema.ObjectId},
});

module.exports = mongoose.model('billings', billingSchema);