const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new mongoose.Schema({
    file_name: { type: String },
    directory_id: { type: mongoose.Schema.ObjectId },
    is_deleted: { type: Boolean },
    created_by: { type: mongoose.Schema.ObjectId },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('document_files', fileSchema);