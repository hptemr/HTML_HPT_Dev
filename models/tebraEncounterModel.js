const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tebraLogsSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "appointments"
  },
  soap_note_type: { type: String },
  EncounterID : { type: String },
  PatientCaseID : { type: String },
  PatientID : { type: String },
  PracticeID : { type: String },
  PracticeName : { type: String },
  RenderingProviderID : { type: String },
  ServiceLineRes: mongoose.Schema.Types.Mixed,
  ServiceLocationID : { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('tebra_encounters', tebraLogsSchema);