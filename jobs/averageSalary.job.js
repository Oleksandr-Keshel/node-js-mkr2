const CronJob = require('cron').CronJob;
const { count } = require('console');
const kadryModel = require('../models/kadry.model');
const kadryService = require('../services/kadry.service')
const fs = require('fs');

function startAvarageSalaryJob() {
    const job = new CronJob(
        '*/10 * * * * *', //every ten seconds
        async () => {
            const kadry = await kadryService.find();
            let sumOfSalaries = 0;
            let count = 0
            kadry.items.forEach((item) => {
                sumOfSalaries += item.salary;
                count++;
            })
            averageSalary = sumOfSalaries / count;

            console.log('The average salary is ' + averageSalary);
        },
    );
    job.start();
}

module.exports = startAvarageSalaryJob;