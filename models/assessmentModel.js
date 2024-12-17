const mongoose = require('mongoose')

const assessmentSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "appointments"
    },
    assessment_text: {
        type: String,
        default: ""
    },
    assessment_icd: [{
        problem: {
            type: String,
            default: ""
        },
        long_term_goal: {
            type: String,
            default: ""
        }
    }],
    supporting_documentation_text: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ['Draft', 'Finalized'],
        default: 'Draft'
    },
    soap_note_type: {
        type: String,
        enum: ['initial_examination', 'daily_note', 'progress_note', 'discharge_note'],
        default: 'initial_examination'
    },
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
})

module.exports = mongoose.model('assessment', assessmentSchema)