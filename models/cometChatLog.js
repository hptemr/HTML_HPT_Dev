const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cometChatLogsSchema = new mongoose.Schema({
  userDetails: { type: Schema.Types.Mixed, default:"" },
  apiFunction: { type: Schema.Types.Mixed, default:"" },
  messageType: { type: String }, // success, error  
  parameter: { type: Schema.Types.Mixed },
  error: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('comet_chat_logs', cometChatLogsSchema);