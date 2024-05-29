const mongoose = require('mongoose')

const insurnaceSchema = new mongoose.Schema({
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

    secondaryInsuranceCompany: { type: String, default: "" },
    secondaryInsuranceIdPolicy: { type: String, default: "" },
    secondaryInsuranceGroup: { type: String, default: "" },
    secondaryInsuranceCustomerServicePh: { type: String, default: "" },

    injuryRelelatedTo: { type: String, default: "" },
    carrierName: { type: String, default: "" },
    dateOfInjury: { type: String, default: "" },
    state: { type: String, default: "" },
    claim: { type: String, default: "" },
    adjusterName: { type: String, default: "" },
    adjusterPhone: { type: String, default: "" },
    reportedEmployer: { type: String, default: "" },

    employerName: { type: String, default: "" },
    employerPhone: { type: String, default: "" },
    employerAddress: { type: String, default: "" },

    attorneyName: { type: String, default: "" },
    attorneyPhone: { type: String, default: "" },
    insuranceDocuments: {
        type: Array,
        default: []
    },
    status:{ type: String, default: "Active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('insurnaces', insurnaceSchema)