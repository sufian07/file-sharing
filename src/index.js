require('dotenv').config();
const app = require('./app');
const {setUpDatabase} = require('./db');
const cleanupJob = require('./jobs/clean-files.job');
const port = process.env.PORT || 3000;

// start the server
app.listen(port, async () => {
    setUpDatabase();
    // start the file cleanup job
    cleanupJob.start();
    console.log(`Server running on port ${port}`);
});
