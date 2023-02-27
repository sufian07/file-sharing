const cron = require('cron');
const fileService = require('../services/file.service.js')

// get cleanup schedulr from env, default to running every day at midnight
const cleanupSchedule = process.env.CLEANUP_SCHEDULE || '0 0 * * *';
const cleanupJob = new cron.CronJob(cleanupSchedule, async function() {
  console.log('File clean up cron is starting ', new Date());
  // default to cleaning up files that have been inactive for 7 days
  const inactivePeriod = process.env.INACTIVE_PERIOD || 7;
  const inactiveFiles =  await fileService.getInactiveFiles(inactivePeriod);
  inactiveFiles.forEach(async (inactiveFile)=>{
    setImmediate(async ()=>{
      try{
        const response = await fileService.deleteFile(inactiveFile.privateKey);
        console.log(response);
      } catch(error){
        console.error(error);
      }
    });
  });
});
module.exports=cleanupJob;
