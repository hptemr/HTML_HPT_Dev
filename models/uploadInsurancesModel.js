const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadInsurancesSchema = new mongoose.Schema({
  insuranceName: { type: String },
  insuranceType: { type: String },
  insuranceAddress: { type: String },
  payerID: { type: String },
  phoneNumber: { type: String },
  billingType: { type: String },
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('upload_insurances', uploadInsurancesSchema);