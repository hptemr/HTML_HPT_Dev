const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  code: { type: String },
  role: { type: String },
  permissions: { type : Array , "default" : [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('roles', roleSchema);