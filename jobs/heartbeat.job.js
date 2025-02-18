const CronJob = require('cron').CronJob;

function startHeartBeatJob() {
    const job = new CronJob(
        '0 * * * * *', 
        () => {
            console.log('[heartbeat.job] You will see this message every minute.');
        },
    );

    job.start();
}

module.exports = startHeartBeatJob;