const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    status: { type: String, enum: ['Pending', 'Active', 'Rescheduled', 'Accepted', 'Declined', 'Approved', 'Cancelled', 'Completed','Scheduled','Not Scheduled','Pending Intake Form', 'Deleted'], default: 'Pending' },
    requestId: {
        type: mongoose.Schema.ObjectId,
        ref: "appointment_requests",
        required: false
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "patients"
    },
    therapistId: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    appointmentId: Number,
    doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: "providers"
    },
    appointmentType: { type: String, default: "" },
    appointmentTypeOther: { type: String, default: "" },
    caseName: { type: String, default: "" },
    caseType: { type: String, default: "" },
    appointmentDate: { type: Date, default: Date.now },
    appointmentEndTime:  { type: Date, default: "" },
    practiceLocation: { type: String, default: "" },
    notes: { type: String, default: "" },
    repeatsNotes: { type: String, default: "" },
    checkIn: { type: Boolean, default: false },
    checkInDateTime: { type: Date },
    appointmentStatus: { type: String, default: "" },
    checkInBy:  {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    bookingFor: {
        type: String,
        enum: ['Myself', 'Other'],
        default: 'Myself'
    },
    relationWithPatient: { type: String, default: "" },
    relationWithPatientOther: { type: String, default: "" },
    patientInfo: {
        type: Object //all the basic info will save in this object
    },
    coPayAmount: { type: String, default: "0.00" },
    highDeductibles: { type: String, default: "0.00" },
    payVia: {
        type: String,
        enum: ['Selfpay', 'Insurance'],
        // default: 'Insurance'
    },
    payViaInsuranceInfo: {
        type: Object,
        type: {} //all the info will save in this object, if patient select payVia insurance only.
    },
    adminPayViaInsuranceInfo: {
        type: Object,
        type: {} //all the info will save in this object, if patient select payVia insurance only.
    },
    emergencyContact: { type: Array, default: [] },
    adminEmergencyContact: { type: Array, default: [] },
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

    acceptInfo: {
        type: Object,  //keys will be ==> "fromPatientId , fromAdminId, acceptedDate, userRole"
        default: {}
    },
    rejectInfo: {
        type: Object, //keys will be ==> "fromPatientId , fromAdminId, rejectedDate, comment, userRole"
        default: {}
    },
    rescheduleInfo: {
        type: Object, //keys will be ==> "fromPatientId , fromAdminId, rescheduleDate, comment, userRole"
        default: {}  // "rescheduleDate" this date will be "appointmentDate". Always use "appointmentDate" value
    },
    patientMedicalHistory: {
        type: Object,
        default: {}
    },
    adminPatientMedicalHistory: {
        type: Object,
        default: {}
    },
    bodyPartFront: {
        type: Object,
        default: {}
    },
    bodyPartBack: {
        type: Object,
        default: {}
    },
    adminBodyPartFront: {
        type: Object,
        default: {}
    },
    adminBodyPartBack: {
        type: Object,
        default: {}
    },
    notification_5hrs_sent: { type: Boolean, default: false },
    notification_24hrs_sent: { type: Boolean, default: false },

    appointmentUpdateInfo: { type: Array, default: [] },//keys will be ==> "fromPatientId , fromAdminId, updatedAt, userRole"
    intakeFormSubmit: { type: Boolean, default: false }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('appointments', appointmentSchema)