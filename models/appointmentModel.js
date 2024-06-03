const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    status: { type: String, enum: ['Pending', 'Active', 'Rescheduled', 'Accepted', 'Declined', 'Approved', 'Cancelled', 'Completed',], default: 'Pending' },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "patients"
    },
    therapistId: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    appointmentId: Number,
    caseName: { type: String, default: "" },
    appointmentDate: { type: Date, default: Date.now },
    practiceLocation: { type: String, default: "" },
    checkIn: { type: Boolean, default: false },
    checkInDateTime: { type: Date },
    bookingFor: {
        type: String,
        enum: ['Myself', 'Other'],
        default: 'Myself'
    },
    relationWithPatient: { type: String, default: "" },
    patientInfo: {
        type: Object //all the basic info will save in this object
    },
    payVia: {
        type: String,
        enum: ['Selfpay', 'Insurance'],
        default: 'Selfpay'
    },
    payViaInsuranceInfo: {
        type: Object,
        type: {} //all the info will save in this object, if patient select payVia insurance only.
    },

    emergencyContact: { type: Array, default: [] },

    reminderViaMobile: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    reminderViaMobileYes: { type: String, default: "" },

    reminderViaEmail: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    reminderViaEmailYes: { type: String, default: "" },
    rejectComment: { type: String, default: "" },

    patientMedicalHistory: {
        type: Object,
        default: {}
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('appointments', appointmentSchema)