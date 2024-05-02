const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('debug', true) //set false at live server.

// Get the default connection
const db = mongoose.connection;

// Event listeners for connection
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
  
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
  
db.on('connected', () => {
    console.log('MongoDB connected');
});
  
db.on('reconnected', () => {
    console.log('MongoDB reconnected');
});

module.exports = db;