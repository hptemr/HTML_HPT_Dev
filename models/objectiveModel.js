const mongoose = require('mongoose')

const objectiveSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "appointments"
      },
    soap_note_type: {
        type: String,
        enum: ['initial_examination','daily_note','progress_note','discharge_note'],
        default: 'initial_examination'
    },
    protocols:[],
    precautions: { type: String, default: ""},
    patient_consent: { type: String, default: ""},
    chaperone: [{
        flag: String,
        name: String
    }],
    observation: { type: String, default: ""},
    range_of_motion: { type: String, default: ""},
    strength: { type: String, default: ""},
    neurological: { type: String, default: ""},
    special_test: { type: String, default: ""},
    palpation: { type: String, default: ""},
    outcome_measures:{
        name:{ type: String, default:""},
        neck_rate_your_pain:{ type: Number, default:null},
        pain_intensity:{ type: Number, default:null},
        personal_care:{ type: Number, default:null},
        lifting:{ type: Number, default:null},
        headache:{ type: Number, default:null},
        recreation:{ type: Number, default:null},
        reading:{ type: Number, default:null},
        work:{ type: Number, default:null},
        sleeping:{ type: Number, default:null},
        concentration:{ type: Number, default:null},
        driving:{ type: Number, default:null},
        score:{ type: Number, default:null},
        quick_dash_question1:{ type: Number, default:null},
        quick_dash_question2:{ type: Number, default:null},
        quick_dash_question3:{ type: Number, default:null},
        quick_dash_question4:{ type: Number, default:null},
        quick_dash_question5:{ type: Number, default:null},
        quick_dash_question6:{ type: Number, default:null},
        quick_dash_question7:{ type: Number, default:null},
        quick_dash_question8:{ type: Number, default:null},
        quick_dash_question9:{ type: Number, default:null},
        quick_dash_question10:{ type: Number, default:null},
        quick_dash_question11:{ type: Number, default:null},
        quick_dash_score:{ type: Number, default:null},
        oswestry_pain_intensity:{ type: Number, default:null},
        oswestry_standing:{ type: Number, default:null},
        oswestry_personal_care:{ type: Number, default:null}, 
        oswestry_sleeping:{ type: Number, default:null},
        oswestry_lifting:{ type: Number, default:null},
        oswestry_social_life:{ type: Number, default:null},
        oswestry_walking:{ type: Number, default:null},
        oswestry_traveling:{ type: Number, default:null},
        oswestry_sitting:{ type: Number, default:null},
        oswestry_employment_homemaking:{ type: Number, default:null},
        lefs_rate_your_pain:{ type: Number, default:null},
        lefs_question1:{ type: Number, default:null},
        lefs_question2:{ type: Number, default:null},
        lefs_question3:{ type: Number, default:null},
        lefs_question4:{ type: Number, default:null},
        lefs_question5:{ type: Number, default:null},
        lefs_question6:{ type: Number, default:null},
        lefs_question7:{ type: Number, default:null},
        lefs_question8:{ type: Number, default:null},
        lefs_question9:{ type: Number, default:null},
        lefs_question10:{ type: Number, default:null},
        lefs_question11:{ type: Number, default:null},
        lefs_question12:{ type: Number, default:null},
        lefs_question13:{ type: Number, default:null},
        lefs_question14:{ type: Number, default:null},
        lefs_question15:{ type: Number, default:null},
        lefs_question16:{ type: Number, default:null},
        lefs_question17:{ type: Number, default:null},
        lefs_question18:{ type: Number, default:null},
        lefs_question19:{ type: Number, default:null},
        lefs_question20:{ type: Number, default:null},
        lefs_score:{ type: Number, default:null},        
        fabq_1_rate_your_pain:{ type: Number, default:null},
        fabq_2_rate_your_pain:{ type: Number, default:null},
        fabq_3_rate_your_pain:{ type: Number, default:null},
        fabq_4_rate_your_pain:{ type: Number, default:null},
        fabq_5_rate_your_pain:{ type: Number, default:null},
        fabq_6_rate_your_pain:{ type: Number, default:null},
        fabq_7_rate_your_pain:{ type: Number, default:null},
        fabq_8_rate_your_pain:{ type: Number, default:null},
        fabq_9_rate_your_pain:{ type: Number, default:null},
        fabq_10_rate_your_pain:{ type: Number, default:null},
        fabq_11_rate_your_pain:{ type: Number, default:null},
        fabq_12_rate_your_pain:{ type: Number, default:null},
        fabq_13_rate_your_pain:{ type: Number, default:null},
        fabq_14_rate_your_pain:{ type: Number, default:null},
        fabq_15_rate_your_pain:{ type: Number, default:null},
        fabq_16_rate_your_pain:{ type: Number, default:null},
        fabq_score:{ type: Number, default:null},
        eat_1_rate_your_pain:{ type: Number, default:null},
        eat_2_rate_your_pain:{ type: Number, default:null},
        eat_3_rate_your_pain:{ type: Number, default:null},
        eat_4_rate_your_pain:{ type: Number, default:null},
        eat_5_rate_your_pain:{ type: Number, default:null},
        eat_6_rate_your_pain:{ type: Number, default:null},
        eat_7_rate_your_pain:{ type: Number, default:null},
        eat_8_rate_your_pain:{ type: Number, default:null},
        eat_9_rate_your_pain:{ type: Number, default:null},
        eat_10_rate_your_pain:{ type: Number, default:null},        
        eat_total:{ type: Number, default:null},
        mctsib_condition1_1:{ type: Number, default:null},
        mctsib_condition1_2:{ type: Number, default:null},
        mctsib_condition1_3:{ type: Number, default:null},
        mctsib_condition2_1:{ type: Number, default:null},
        mctsib_condition2_2:{ type: Number, default:null},
        mctsib_condition2_3:{ type: Number, default:null},
        mctsib_condition3_1:{ type: Number, default:null},
        mctsib_condition3_2:{ type: Number, default:null},
        mctsib_condition3_3:{ type: Number, default:null},
        mctsib_condition4_1:{ type: Number, default:null},
        mctsib_condition4_2:{ type: Number, default:null},
        mctsib_condition4_3:{ type: Number, default:null},
        mctsib_total:{ type: Number, default:null},
        sts_number:{ type: Number, default:null},
        sts_score:{ type: Number, default:null},
    },
    land_exercise: { type: Array, default: [],
        exercises: {
            type: String, default: ""
        },
        exercise_date: { type: Date },
        sets: {
            type: String,default: ""
        },
        reps: {
            type: String, default: ""
        },
        weight_resistance: {
            type: String, default: ""
        },
        distance: {
            type: String,default: ""
        },
        exercise_time: {
            type: String,default: ""
        },
        exercise_time_mints: {
            type: String,default: ""
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "users"
        },
     },
     aquatic_exercise: { type: Array, default: [],
        exercises: {
            type: String, default: ""
        },
        exercise_date: { type: Date },
        sets: {
            type: String,default: ""
        },
        reps: {
            type: String, default: ""
        },
        weight_resistance: {
            type: String, default: ""
        },
        distance: {
            type: String,default: ""
        },
        exercise_time: {
            type: String,default: ""
        },
        exercise_time_mints: {
            type: String,default: ""
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "users"
        },
     },
    slp: { type: String, default: ""},
    ot: { type: String, default: ""},
    treatment_provided: { type: String, default: ""},
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
})

module.exports = mongoose.model('objective', objectiveSchema)