const mongoose = require('mongoose')

const assessmentSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "appointments"
      },
    assessment_note: { type: String, default: "" },
    problems:[{
        problem: String,
        long_term_goal: String
    }],
    support_document_note: { type: String, default: "" },
    status: { type: String, enum: ['Draft', 'Finalize'], default: 'Draft' },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('assessment', assessmentSchema)