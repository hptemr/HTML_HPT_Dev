const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    appointmentId: Number,
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "patients"
    },
    therapistId: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    status: { type: String, enum: ['Pending', 'Approved', 'Cancelled', 'Completed',], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('appointments', appointmentSchema)