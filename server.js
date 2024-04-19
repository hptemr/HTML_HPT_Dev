require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routesApi = require('./routes')
const port = process.env.PORT || 3000;
const db = require('./config/database'); // Import the database connection file

// Use cors middleware to allow all origins
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/api', routesApi);

app.listen(port, () => {
  console.log('Server is running on ',port);
});