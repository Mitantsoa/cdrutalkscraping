const login = require("./login.js");
const {logger} = require("./src/service/utils");
const cron = require('node-cron');
const moment = require("moment");
const {config} = require("dotenv");
const cronJson = require("./cron.json");
config();
class cronClass{
    c;
    isrunning = false;
    startDate = "--";
    endDate = "--";
    countOfHit = 0;
    cronFormat = process.env.CRONFORMAT.replaceAll("e","*");
    constructor() {
    }
    async start(){
        if(!this.isrunning){
            logger("cron started")
            this.cronFormat = process.env.CRONFORMAT.replaceAll("e","*");
            this.countOfHit = 0;
            this.endDate = "--";
            this.startDate = moment().format();
            this.c =
            this.isrunning = true;

            return "cron is started"
        }else return "cron is already running"
    }

}

const cronFormat = process.env.CRONFORMAT.replaceAll("e","*");
const scheduleOptions = {
    scheduled: true,
    timezone: 'Europe/Paris',
    name: 'cdr-fetch',
    recoverMissedExecutions: true,
};

const action = async () =>{
    logger("Application started");
    this.countOfHit++;
    let isLogedIn = false;
    isLogedIn = await login()
}
const cronClass = cron.schedule(cronFormat, action,scheduleOptions);

module.exports = cronClass


