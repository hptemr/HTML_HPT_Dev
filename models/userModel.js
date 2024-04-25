const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phoneNumber:{ type: String, "default" : "" },
  salt: { type: String },
  hash_password:{ type: String },
  role:{ type: String },
  NPI:{ type: Number},
  SSN:{ type: Number},
  siteLeaderForPracLocation: { type : String  },
  failedAttempts: { type: Number, default: 0 },
  practiceLocation: { type : Array , "default" : [] },
  status: { type: String, enum: ['Pending', 'Active', 'Suspended', 'Delete','Blocked'], default: 'Active'},
  invitedBy:{ type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('users', userSchema);