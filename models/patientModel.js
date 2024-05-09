const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  email: { type: String },
  dob:  { type: Date },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  phoneNumber:{ type: String, "default" : "" },
  salt: { type: String },
  hash_password:{ type: String },
  address1:{ type: String },
  address2:{ type: String },
  city:{ type: String },
  state:{ type: String },
  zipcode:{ type: String },
  document_name:{ type: String },
  document_temp_name:{ type: String },
  document_size:{ type: String },
  acceptConsent:{ type: Boolean, default: false },
  failedAttempts: { type: Number, default: 0 },  
  loginCount: { type: Number, default: 0 },
  status: { type: String, enum: ['Pending','Active','Deleted','Blocked'], default: 'Pending'},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('patients', patientSchema);