const mongoose = require('mongoose')
const emergencyContactSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "patients"
    },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    dob: { type: Date, default: "" },
    relationWithPatient: { type: String, default: "" },
    otherRelation: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    myTreatmentCheckbox: { type: Boolean, default: false },
    myAccountCheckbox: { type: Boolean, default: false },
    orderIndex: { type: Number }, //1,2
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('emergency_contacts', emergencyContactSchema)