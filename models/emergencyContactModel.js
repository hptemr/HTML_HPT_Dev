const mongoose = require('mongoose')

const emergencyContactSchema = new mongoose.Schema({
    
    emergencyContactOneFirstName: { type: String, default: "" },
    emergencyContactOneLastName: { type: String, default: "" },
    emergencyContactOneDob: { type: Date, default: "" },
    emergencyContactOneRelationWithPatient: { type: String, default: "" },

    emergencyContactOneOtherRelation: { type: String, default: "" },
    emergencyContactOnePhoneNumber: { type: String, default: "" },
   
    emergencyContactOneMyTreatmentCheckbox: { type: Boolean, default: false },
    emergencyContactOneMyAccountCheckbox: { type: Boolean, default: false },


    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('emergencyContacts', emergencyContactSchema)