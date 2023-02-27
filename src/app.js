require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/file.routes.js');
const cleanupJob = require('./jobs/clean-job');
const errorHandler = require('./middlewares/error-handler.middleware.js');
const app = express();
const port = process.env.PORT || 3000;
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/files', fileRoutes);
app.use(errorHandler);

// start the server
const server = app.listen(port, async () => {
    try {
        const MONGO_USERNAME = process.env.MONGO_USERNAME;
        const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
        const MONGO_DATABASE = process.env.MONGO_DATABASE;
        const mongoDB = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo:27017/${MONGO_DATABASE}?authSource=admin`;
        console.log(mongoDB);
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoDB);
    }catch(error){
        console.log(error);
    }
    // start the file cleanup job
    cleanupJob.start();
    console.log(`Server running on port ${port}`);
});

module.exports = {app, server};