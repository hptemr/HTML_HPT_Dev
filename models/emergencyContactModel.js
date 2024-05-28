const mongoose = require('mongoose')
const emergencyContactSchema = new mongoose.Schema({
    emergencyContactFirstName: { type: String, default: "" },
    emergencyContactLastName: { type: String, default: "" },
    emergencyContactDob: { type: Date, default: "" },
    emergencyContactRelationWithPatient: { type: String, default: "" },
    emergencyContactOtherRelation: { type: String, default: "" },
    emergencyContactPhoneNumber: { type: String, default: "" },
    emergencyContactMyTreatmentCheckbox: { type: Boolean, default: false },
    emergencyContactMyAccountCheckbox: { type: Boolean, default: false },
    orderIndex: { type: Number }, //1,2
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('emergencyContacts', emergencyContactSchema)