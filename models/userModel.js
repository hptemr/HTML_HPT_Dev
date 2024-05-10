const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phoneNumber: { type: String, "default": "" },
  salt: { type: String },
  hash_password: { type: String },
  role: { type: String }, //['system_admin', 'practice_admin', 'therapist', 'billing_team','support_team'],
  NPI: { type: Number },
  SSN: { type: String },
  siteLeaderForPracLocation: { type: String },
  loginCount: { type: Number, default: 0 },
  failedAttempts: { type: Number, default: 0 },
  practiceLocation: { type: Array, "default": [] },
  licenceNumber: { type: String },
  status: { type: String, enum: ['Pending', 'Active', 'Suspended', 'Deleted', 'Blocked'], default: 'Pending' },
  resetPasswordToken: { type: String },
  inviteToken: { type: String },
  profileImage: { type: String, default: 'default.png' },
  invitedBy: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('users', userSchema);