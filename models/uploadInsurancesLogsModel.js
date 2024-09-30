const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadInsurancesLogsSchema = new mongoose.Schema({
  row: { type: Schema.Types.Mixed },
  error: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('upload_insurances_logs', uploadInsurancesLogsSchema);