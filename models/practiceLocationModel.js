const mongoose = require('mongoose');

const practiceLocationSchema = new mongoose.Schema({
  locationCode: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('practice_locations', practiceLocationSchema);