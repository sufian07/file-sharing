const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/fileRoutes.js');
const cleanupJob = require('./jobs/cleanJob');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const mongoDB = process.env.MONGO_URL || "mongodb://127.0.0.1/my_database";

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get('/', async (req, res) => {
    res.json({msg:'hello world'})
});
app.use('/files', fileRoutes);


// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);

// start the server
const server = app.listen(port, async () => {
    // start the file cleanup job
    // cleanupJob.start();
    console.log(`Server running on port ${port}`);
    await mongoose.connect(mongoDB);
});

module.exports = {app, server};