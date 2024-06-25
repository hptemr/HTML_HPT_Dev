const mongoose = require('mongoose');

const referralsSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "patients"
  },
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "appointments"
  },
  referredBy: { type: String, default: "" },
  phone: { type: String, default: "" },
  streetName: { type: String, default: "" },
  appartment: { type: String, default: "" },
  state: { type: String, default: "" },
  city: { type: String, default: "" },
  zipcode: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('referrals', referralsSchema);