const mongoose = require('mongoose')

const appointmentEventsSchema = new mongoose.Schema({   
    appointmentId: {
        type: mongoose.Schema.ObjectId,
        ref: "appointments"
    }, 
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "patients"
    },
    repeateAppointmentDate: { type: Date, default: '' },
    repeateAppointmentEndDate:  { type: Date, default: "" },
    title:  { type: String },
    status: { type: String, enum: ['Active', 'In-active','Deleted'], default: 'Active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('appointment_events', appointmentEventsSchema)