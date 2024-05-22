const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    status: { type: String, enum: ['Pending', 'Approved', 'Cancelled', 'Completed',], default: 'Pending' },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "patients"
    },
    therapistId: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    appointmentId: Number,
    appointmentDate: { type: Date, default: Date.now },
    practiceLocation: { type: String, default: "" },
    checkIn:{ type: Boolean, default: false },
    checkInDateTime:{ type: Date },
    status: { type: String, enum: ['Pending', 'Approved', 'Cancelled', 'Completed',], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('appointments', appointmentSchema)