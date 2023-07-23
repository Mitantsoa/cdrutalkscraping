const {config} = require("dotenv");
const login = require("./login.js");
const express = require("express");
const {logger} = require("./src/service/utils");
const cron = require("./indexcronv2")
const app = express();
const db = require('./src/service/mysqlAddCdr')
const cronJson = require('./cron.json')
const moment = require("moment");

config();

app.get('/startcron',async (req,res)=> {
    if(!cronJson.isrunning){
        let resp = cronJson;
        try{
            await cron.start();
            cronJson.startDate = moment().format();
            cronJson.countOfHit = 0;
            cronJson.isrunning = true;
            resp = cronJson;
        }catch (e) {
            console.log(e)
            resp = e;
        }
        res.send(resp);
    }else{
        res.send("Cron is already running");
    }

})
app.get('/stopcron',async (req,res)=> {
    if(cronJson.isrunning){
        try{
            await cron.stop();
            cronJson.endDate = moment().format();
            cronJson.isrunning = false;
            res.send(cronJson);
        }catch (e) {
            res.send(e);
        }
    }else{
        res.send("Cron is not running")
    }

})
app.get('/',(req,res)=>{
    res.send(cronJson);
})

app.get('/select',async (req,res)=>{
    const resp = await db.selectall()
    res.send(resp);
})

app.listen(80,async (socket)=>{
    logger("### Node app start ###")
    // await cron.start()
    // socket.keepAliveTimeout = (60 * 1000) + 1000;
    // socket.headersTimeout = (60 * 1000) + 2000;
});



