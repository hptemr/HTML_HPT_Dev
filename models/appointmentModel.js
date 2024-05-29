const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    status: { type: String, enum: ['Pending', 'Accepted', 'Declined', 'Approved', 'Cancelled', 'Completed',], default: 'Pending' },
    // "Accepted",
    // "Pending",
    // "Active",
    // "Rescheduled",
    // "Cancelled"
    // "Declined",
    // "Completed",
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
        // insuranceName: { type: String, default: "" },
        // subscriberFirstName: { type: String, default: "" },
        // subscriberMiddleName: { type: String, default: "" },
        // subscriberLastName: { type: String, default: "" },
        // subscriberDob: { type: Date, default: "" },
        // subscriberRelationWithPatient: { type: String, default: "" },

        // primaryInsuranceCompany: { type: String, default: "" },
        // primaryInsuranceIdPolicy: { type: String, default: "" },
        // primaryInsuranceGroup: { type: String, default: "" },
        // primaryInsuranceCustomerServicePh: { type: String, default: "" },

        // secondaryInsuranceCompany: { type: String, default: "" },
        // secondaryInsuranceIdPolicy: { type: String, default: "" },
        // secondaryInsuranceGroup: { type: String, default: "" },
        // secondaryInsuranceCustomerServicePh: { type: String, default: "" },

        // injuryRelelatedTo: { type: String, default: "" },
        // carrierName: { type: String, default: "" },
        // dateOfInjury: { type: String, default: "" },
        // state: { type: String, default: "" },
        // claim: { type: String, default: "" },
        // adjusterName: { type: String, default: "" },
        // adjusterPhone: { type: String, default: "" },
        // reportedEmployer: { type: String, default: "" },

        // employerName: { type: String, default: "" },
        // employerPhone: { type: String, default: "" },
        // employerAddress: { type: String, default: "" },

        // attorneyName: { type: String, default: "" },
        // attorneyPhone: { type: String, default: "" },
        // insuranceDocuments: {
        //     type: Array,
        //     default: []
        // },
        type: Object //all the info will save in this object, if patient select payVia insurance only.
    },

    emergencyContact: { type: Array, default: [] },

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
    rejectComment: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('appointments', appointmentSchema)