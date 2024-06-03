const config = require('../config');
const startHeartBeatJob = require('./heartbeat.job');
const startAvarageSalaryJob = require('./averageSalary.job');

function start() {
    if (!config.enableScheduleJobs) {
        console.warn('Jobs scheduling is not enabled.');
        return;
    }

    startHeartBeatJob();
    startAvarageSalaryJob();
}

module.exports = start;