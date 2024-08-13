const mongoose = require('mongoose')

const appointmentRequestSchema = new mongoose.Schema({    
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "patients"
    },
    appointmentDate: { type: Date, default: Date.now },
    practiceLocation: { type: String, default: "" },
    status: { type: String, enum: ['Pending','Accepted','Scheduled','Pending Intake Form','Cancelled'], default: 'Pending' },   
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('appointment_requests', appointmentRequestSchema)