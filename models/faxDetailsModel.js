const mongoose = require('mongoose')

const faxDetailsSchema = new mongoose.Schema({    
    appointmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "appointments"
    },
    dateOfService: { type: Date, default: Date.now },
    noteType: { type: String, default: "" },
    status: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('fax_details', faxDetailsSchema)