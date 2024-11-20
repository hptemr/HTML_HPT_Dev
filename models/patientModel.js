const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  email: { 
    type: String, 
    lowercase: true, 
    trim: true 
  },
  dob:  { type: Date },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  phoneNumber:{ type: String, "default" : "" },
  cellPhoneNumber:{ type: String, "default" : "" },
  workExtensionNumber:{ type: String, "default" : "" },
  maritalStatus: { type: String },
  salt: { type: String },
  hash_password:{ type: String },
  address1:{ type: String },
  address2:{ type: String },
  city:{ type: String },
  state:{ type: String },
  zipcode:{ type: String },
  documents_type:{ type: String },
  document_name:{ type: String },
  document_temp_name:{ type: String },
  document_size:{ type: String },
  acceptConsent:{ type: Boolean, default: false },
  failedAttempts: { type: Number, default: 0 },  
  loginCount: { type: Number, default: 0 },
  resetPasswordToken:{ type: String },
  signupToken:{ type: String },
  profileImage: { type: String, default: 'default.png' },
  ssn:{ type: String },
  status: { type: String, enum: ['Pending','Active','Deleted','Blocked'], default: 'Pending'},
  patientOnTebra:{ type: Boolean, default: false },
  tebraDetails:{
    PatientID:{ type: String },
    PracticeID:{ type: String },
    PracticeName:{ type: String }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('patients', patientSchema);