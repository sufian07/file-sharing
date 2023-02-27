const cron = require('cron');
const fs = require('fs');
const path = require('path');

const cleanupSchedule = process.env.CLEANUP_SCHEDULE || '0 0 * * *'; // default to running every day at midnight
const cleanupJob = new cron.CronJob(cleanupSchedule, async function() {
  console.log('File clean up cron is starting ', new Date());
  const filesDir = './uploads'; // directory where uploaded files are stored
  const inactivePeriod = process.env.INACTIVE_PERIOD || 7; // default to cleaning up files that have been inactive for 7 days

  const now = Date.now();

  fs.readdir(filesDir, async function(err, files) {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    for (const file of files) {
      const filePath = path.join(filesDir, file);

      fs.stat(filePath, async function(err, stats) {
        if (err) {
          console.error('Error getting file stats:', err);
          return;
        }

        const timeSinceLastAccess = (now - stats.atimeMs) / (1000 * 60 * 60 * 24); // convert to days

        if (timeSinceLastAccess >= inactivePeriod) {
          fs.unlink(filePath, async function(err) {
            if (err) {
              console.error('Error deleting file:', err);
              return;
            }

            console.log('File deleted:', file);
          });
        }
      });
    }
  });
});
module.exports=cleanupJob;
