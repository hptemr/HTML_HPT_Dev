const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new mongoose.Schema({
  name: { type: String },
  credentials: { type: String },
  address: { type: String },
  phoneNumber: { type: String },
  faxNumber: { type: String },
  npi: { type: String },
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('providers', providerSchema);