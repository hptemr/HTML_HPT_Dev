const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tebraLogsSchema = new mongoose.Schema({
  apiMethod : { type: String },
  xmlRequest: mongoose.Schema.Types.Mixed,
  xmlResponse: mongoose.Schema.Types.Mixed, 
  status: { type: String },  // success, error
  errorData: mongoose.Schema.Types.Mixed,
  otherData: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('tebra_logs', tebraLogsSchema);