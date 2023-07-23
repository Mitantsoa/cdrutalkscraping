const moment = require("moment");
const fs = require("fs")

function logger(text){
    const now = moment().format('yyyy-MM-DD HH:mm:ss');
    const filename = "cdrDating_"+moment().format('yyyy-MM')+".log"
    const content = now+": "+text
    fs.appendFile(filename,content,function(err){ if(err) throw err;});
    return console.log(now,": ",text);
}

module.exports = {logger};