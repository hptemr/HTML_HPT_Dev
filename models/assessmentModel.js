const mongoose = require('mongoose')

const assessmentSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "appointments"
    },
    assessment_text: { type: String, default: "" },
    assessment_icd:[{
        problem: String,
        long_term_goal: String
    }],
    supporting_documentation_text: { type: String, default: "" },
    status: { type: String, enum: ['Draft', 'Finalize'], default: 'Draft' },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('assessment', assessmentSchema)