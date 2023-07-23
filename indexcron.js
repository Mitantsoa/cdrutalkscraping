const login = require("./login.js");
const {logger} = require("./src/service/utils");
const cron = require('node-cron');
const moment = require("moment");
const {config} = require("dotenv");
config();
class cronClass{
    c;
    isrunning = false;
    startDate = "--";
    endDate = "--";
    countOfHit = 0;
    cronFormat = process.env.CRONFORMAT.replaceAll("e","*");

    async start(){
        if(!this.isrunning){
            logger("cron started")
            this.cronFormat = process.env.CRONFORMAT.replaceAll("e","*");
            this.countOfHit = 0;
            this.endDate = "--";
            this.startDate = moment().format();
            this.c = cron.schedule(this.cronFormat, async () => {
                logger("Application started");
                this.countOfHit++;
                let isLogedIn = false;
                isLogedIn = await login()
                // logger("we cron ---")
            });
            this.isrunning = true;
            return "cron is started"
        }else return "cron is already running"
    }

    stop(){
        if(this.isrunning){
            logger("cron stoped")
            this.endDate = moment().format()
            this.c.stop()
            this.isrunning = false
            return "cron stoped"
        }else return "cron not yet started"
    }
}

module.exports = cronClass


