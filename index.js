const {config} = require("dotenv");
const login = require("./login.js");
const express = require("express");
const {logger} = require("./src/service/utils");
const app = express();
const db = require('./src/service/mysqlAddCdr')
const moment = require("moment");
const fs = require('fs')

config();

app.get('/startcron',async (req,res)=> {
    // if(!cronJson.isrunning){
    //     try{
    //         logger("Application started");
    //         let isLogedIn = await login()
    //         cronJson.startDate = moment().format();
    //         cronJson.countOfHit = 0;
    //         cronJson.isrunning = true;
    //         cronJson.countOfHit++;
    //     }catch (e) {
    //         console.log(e)
    //         res.send(e);
    //     }
    //
    // }else{
    //     const cronID = cronJson.countOfHit++
    //     logger("Run cron ID:"+cronID);
    //     let isLogedIn = await login()
    //     cronJson.countOfHit = cronID;
    // }
    // fs.writeFile("./cron.json",cronJson.toString(),"utf-8",()=>{})
    await login()
    res.send("cron running");
})
app.get('/stopcron',async (req,res)=> {
    // if(cronJson.isrunning){
    //     try{
    //         cronJson.endDate = moment().format();
    //         cronJson.isrunning = false;
    //         fs.writeFile("./cron.json",cronJson.toString(),"utf-8",()=>{})
    //         res.send(cronJson);
    //     }catch (e) {
    //         res.send(e);
    //     }
    // }else{
    //     res.send("Cron is not running")
    // }
    res.send("cron running");

})
app.get('/',(req,res)=>{
    res.send("cron running");
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



