const mongoose = require('mongoose')

const casesSchema = new mongoose.Schema({    
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "patients"
    },
    caseName: { type: String, default: "" },
    caseType: { type: String, default: "" },
    appointments: { type: Array, default: [] },//appointment id
    billingType: { type: String, default: "" },
    caseCreatedOnTebra:{ type: Boolean, default: false },
    tebraDetails:{
        CaseID:{ type: String },
        PatientID:{ type: String },
        PracticeID:{ type: String },
        PracticeName:{ type: String }
    },
    insuranceAddedOnTebra: { type: Boolean, default: false },
    tebraInsuranceData:{
        InsurancePolicyCompanyID:{ type: String },
        InsurancePolicyID:{ type: String },
        InsurancePolicyPlanID:{ type: String },
        InsuranceName : { type: String }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('cases', casesSchema)