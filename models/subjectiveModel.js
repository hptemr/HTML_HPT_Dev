const mongoose = require('mongoose')

const subjectiveSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "appointments"
      },
    note_date:  { type: Date },
    soap_note_type: { type: String, default: "" },//['initial_examination','daily_note','progress_note','discharge_note','case_note']
    diagnosis_code: [{
        code: String,
        name: String
    }],
    treatment_side: {
        type: String,
        enum: ["Left", "Right", "Bilateral"],
    },
    surgery_date:  { type: Date },
    surgery_type: { type: String },
    subjective_note: { type: String },
    updateInfo: { type: Array, default: [] },//keys will be ==> "fromAdminId, updatedAt, userRole"
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
})

module.exports = mongoose.model('subjectives', subjectiveSchema)