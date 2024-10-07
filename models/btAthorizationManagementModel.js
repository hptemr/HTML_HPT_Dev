const mongoose = require('mongoose')

const btAthorizationManagementSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.ObjectId, ref: "patients"},
    caseName: { type: String },
    authManagement: [{
        authorizationRequired : String,
        authorizationToDate: String,
        authorizationFromDate: String,
        authorizationVisit: String,
        authorizationNumber: String,
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('bt_athorization_management', btAthorizationManagementSchema)