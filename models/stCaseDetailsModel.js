const mongoose = require('mongoose')

const stCaseDetailsSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.ObjectId, ref: "patients"},
    caseName: { type: String },
    therapistId: { type: mongoose.Schema.ObjectId, ref: "users"},
    returnToDoctor: { type: String },
    payerID: { type: String },
    primaryInsurance: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('st_case_details', stCaseDetailsSchema)