const mongoose = require('mongoose')

const insurnaceSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "patients"
    },
    insuranceName: { type: String, default: "" },
    subscriberFirstName: { type: String, default: "" },
    subscriberMiddleName: { type: String, default: "" },
    subscriberLastName: { type: String, default: "" },
    subscriberDob: { type: Date, default: "" },
    subscriberRelationWithPatient: { type: String, default: "" },

    primaryInsuranceCompany: { type: String, default: "" },
    primaryInsuranceIdPolicy: { type: String, default: "" },
    primaryInsuranceGroup: { type: String, default: "" },
    primaryInsuranceCustomerServicePh: { type: String, default: "" },
    primaryInsuranceFromDate: { type: Date, default: "" },
    primaryInsuranceToDate: { type: Date, default: "" },

    secondaryInsuranceCompany: { type: String, default: "" },
    secondaryInsuranceIdPolicy: { type: String, default: "" },
    secondaryInsuranceGroup: { type: String, default: "" },
    secondaryInsuranceCustomerServicePh: { type: String, default: "" },
    secondaryInsuranceFromDate: { type: Date, default: "" },
    secondaryInsuranceToDate: { type: Date, default: "" },

    thirdInsuranceCompany: { type: String, default: "" },
    thirdInsuranceIdPolicy: { type: String, default: "" },
    thirdInsuranceGroup: { type: String, default: "" },
    thirdInsuranceCustomerServicePh: { type: String, default: "" },
    thirdInsuranceFromDate: { type: Date, default: "" },
    thirdInsuranceToDate: { type: Date, default: "" },

    injuryRelelatedTo: { type: String, default: "" },
    carrierName: { type: String, default: "" },
    dateOfInjury: { type: String, default: "" },
    insuranceState: { type: String, default: "" },
    claim: { type: String, default: "" },
    adjusterName: { type: String, default: "" },
    adjusterPhone: { type: String, default: "" },
    reportedEmployer: { type: String, default: "" },

    employerName: { type: String, default: "" },
    employerPhone: { type: String, default: "" },
    employerAddress: { type: String, default: "" },

    attorney: { type: Boolean, default: false }, 
    attorneyName: { type: String, default: "" },
    attorneyPhone: { type: String, default: "" },

    isPatientMinor: { type: Boolean, default: false }, 
    minorConsent: { type: Boolean, default: false }, 

    status: { type: String, default: "Active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('insurnaces', insurnaceSchema)