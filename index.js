const {config} = require("dotenv");
const login = require("./login.js");
const express = require("express");
const {logger} = require("./src/service/utils");
const cronClass = require("./indexcron")
const cron = new cronClass();
const app = express();
const db = require('./src/service/mysqlAddCdr')

config();

app.get('/startcron',async (req,res)=> {const resp = await cron.start();res.send(resp);})
app.get('/stopcron',async (req,res)=> {const resp = cron.stop();res.send(resp);})
app.get('/',(req,res)=>{
    const resp = {
        status:cron.isrunning?"running":"stoped",
        startDate:cron.startDate,
        NbHit:cron.countOfHit,
        CronFormat:cron.cronFormat,
        endDate:cron.endDate
    }
    res.send(resp);
})

app.get('/select',async (req,res)=>{
    const resp = await db.selectall()
    res.send(resp);
})

app.listen(80,async (socket)=>{
    logger("### Node app start ###")
    await cron.start()
    // socket.keepAliveTimeout = (60 * 1000) + 1000;
    // socket.headersTimeout = (60 * 1000) + 2000;
});



