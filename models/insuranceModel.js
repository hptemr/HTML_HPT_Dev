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
    subscriberGender: { type: String, default: "" },
    subscriberOtherRelation: { type: String, default: "" },
    primaryInsuranceCompany: { type: String, default: "" },
    primaryInsuranceIdPolicy: { type: String, default: "" },
    primaryInsuranceGroup: { type: String, default: "" },
    primaryInsuranceCustomerServicePh: { type: String, default: "" },
    primaryInsuranceFromDate: { type: Date, default: "" },
    primaryInsuranceToDate: { type: Date, default: "" },
    secondarySubscriberFirstName: { type: String, default: "" },
    secondarySubscriberMiddleName: { type: String, default: "" },
    secondarySubscriberLastName: { type: String, default: "" },
    secondarySubscriberDob: { type: Date, default: "" },    
    secondarySubscriberRelationWithPatient: { type: String, default: "" },
    secondarySubscriberGender: { type: String, default: "" },
    secondarySubscriberOtherRelation: { type: String, default: "" },
    secondaryInsuranceCompany: { type: String, default: "" },
    secondaryInsuranceIdPolicy: { type: String, default: "" },
    secondaryInsuranceGroup: { type: String, default: "" },
    secondaryInsuranceCustomerServicePh: { type: String, default: "" },
    secondaryInsuranceFromDate: { type: Date, default: "" },
    secondaryInsuranceToDate: { type: Date, default: "" },
    thirdSubscriberFirstName: { type: String, default: "" },
    thirdSubscriberMiddleName: { type: String, default: "" },
    thirdSubscriberLastName: { type: String, default: "" },
    thirdSubscriberDob: { type: Date, default: "" },    
    thirdSubscriberRelationWithPatient: { type: String, default: "" },
    thirdSubscriberGender: { type: String, default: "" },
    thirdSubscriberOtherRelation: { type: String, default: "" },
    thirdInsuranceCompany: { type: String, default: "" },
    thirdInsuranceIdPolicy: { type: String, default: "" },
    thirdInsuranceGroup: { type: String, default: "" },
    thirdInsuranceCustomerServicePh: { type: String, default: "" },
    thirdInsuranceFromDate: { type: Date, default: "" },
    thirdInsuranceToDate: { type: Date, default: "" },
    injuryRelelatedTo: { type: String, default: "" },
    otherPersonalInjury: { type: String, default: "" },
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
    attorney: { type: String, default: "" },//{ type: Boolean, default: false }, 
    attorneyName: { type: String, default: "" },
    attorneyPhone: { type: String, default: "" },
    isPatientMinor: { type: String, default: "" },
    insuranceFiles: {
        type: Object //all the basic info will save in this object
    },
    //isPatientMinor: { type: Boolean, default: false }, 
    adultConsent: { type: Boolean, default: true },
    minorConsent: { type: Boolean, default: false },   
    status: { type: String, default: "Active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('insurnaces', insurnaceSchema)