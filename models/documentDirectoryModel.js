const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorySchema = new mongoose.Schema({
  directory_name: { type: String },
  parent_directory_id: { type: mongoose.Schema.ObjectId },
  is_root_directory: { type: Boolean },
  is_deleted: { type: Boolean },
  created_by: { type: mongoose.Schema.ObjectId },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('document_directories', directorySchema);