const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    status: { type: String, enum: ['Pending', 'Approved', 'Cancelled', 'Completed',], default: 'Pending' },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "patients"
    },
    therapistId: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    appointmentId: Number,
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
        type: Object //all the info will save in this object, if patient select payVia insurance only.
    },
    responsiblePartyGuarantor: {
        //If you are not the patient but responsible for charges then info will save in this column "responsiblePartyGuarantor"
        type: Object //all the info will save in this object
    },

    emergencyContact1: { type: Object },
    emergencyContact2: { type: Object },

    reminderViaMobile: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    reminderViaMobileNumber: { type: String, default: "" },

    reminderViaEmail: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    reminderViaEmailId: { type: String, default: "" },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('appointments', appointmentSchema)