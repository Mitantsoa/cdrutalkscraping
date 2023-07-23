const login = require("./login.js");
const {logger} = require("./src/service/utils");
const cron = require('node-cron');
const {config} = require("dotenv");
const cronJson = require("./cron.json");
config();

const cronFormat = process.env.CRONFORMAT.replaceAll("e","*");
const scheduleOptions = {
    scheduled: true,
    timezone: 'EAT',
    name: 'cdr-fetch',
    recoverMissedExecutions: true,
};

const action = async () =>{
    logger("Application started");
    cronJson.countOfHit++;
    let isLogedIn = false;
    isLogedIn = await login()
}
const cronClass = cron.schedule(cronFormat, action,scheduleOptions);

module.exports = cronClass


