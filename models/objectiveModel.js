const mongoose = require('mongoose')

const objectiveSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "appointments"
      },
    protocols:[],
    patient_consent: { type: Boolean, default: false },
    chaperone: [{
        flag: Boolean,
        name: String
    }],
    observation: { type: String, default: "" },
    range_of_motion: { type: String, default: "" },
    strength: { type: String, default: "" },
    neurological: { type: String, default: "" },
    special_test: { type: String, default: "" },
    palpation: { type: String, default: "" },
    outcome_measures: { type: String, default: "" },
    slp: { type: String, default: "" },
    ot: { type: String, default: "" },
    treatment_provided: { type: String, default: "" },
    status: { type: String, enum: ['Draft', 'Finalize'], default: 'Draft' },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('objective', objectiveSchema)