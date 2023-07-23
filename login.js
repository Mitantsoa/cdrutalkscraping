const {config} = require("dotenv");
const axios = require('axios');
const FormData = require('form-data');
const cheerio = require('cheerio');
const {CookieJar} = require('tough-cookie');
const {wrapper} = require("axios-cookiejar-support");
const {mysqlAddCdr} = require('./src/service/mysqlAddCdr.js')
const moment = require('moment');
const {logger} = require("./src/service/utils");

config();

function makeForm(data){
    var bodyFormData = new FormData();
    for (let key in data){
        bodyFormData.append(key, data[key]);
    }
    return bodyFormData;
}

const jar = new CookieJar();
const session = wrapper(axios.create({jar}));
const activelogin = process.env.ACTIVELOGIN.split(",")

async function run(){
    const login = await session.post(process.env.LOGINURL, makeForm({'user': process.env.USER, 'pass': process.env.PASS,'login':"Login"}))
        .then((data) => {
                const respHtml = data.data;
                // const respHtml = '<h2 class="title">Hello world</h2>';
                const $ = cheerio.load(respHtml);
                const tag = $('script');
                const istag = tag.length == 0 || tag.length > 1 ? false : true;
                let isLoged = false;
                // console.log(tag.text().toString());
                // console.log("respHtml:",respHtml);
                // console.log("tag:",tag);
                logger("istag: "+istag);
                // console.log(tag.text().toString().search('cdr=cdr'));
                if (istag) {
                    isLoged = tag.text().toString().search('cdr=cdr') != -1 ? true : false;
                }else if(respHtml == ""){
                    isLoged = true
                }
                logger("isLoged: "+isLoged);
                return isLoged
            }
        ).catch((error)=>{return false});

    if (login){
        logger("Fetching data.")
        const cdr = await session.get(process.env.CDRURL)
            .then((data) => {
                // console.log(data.data)
                const respHtml = data.data;
                // const respHtml = '<h2 class="title">Hello world</h2>';
                const $ = cheerio.load(respHtml);
                const tag = $('table[cellpadding="7"]');
                const tableData = []
                tag.find('tr').each((i, row) => {
                    // console.group("tr "+i)
                    const rowData = [];
                    $(row).find('td').each((j, cell) => {
                        // console.log($(cell).text());
                        // console.log(j);
                        rowData.push($(cell).text());
                    })
                    // console.groupEnd()
                    const rowSize = Object.keys(rowData).length;
                    rowData.push(moment().format('yyyy-MM-DD HH:mm:ss'));
                    if (rowSize != 0) tableData.push(rowData);
                })
                // console.log(tableData);
                let tableDataFiltred = []
                tableData.map((v,i)=>{
                    activelogin.forEach((vv,ii)=>{
                        if(v.includes(vv)) tableDataFiltred.push(v)
                    })
                })
                // console.log("tableDataFiltred",tableDataFiltred)
                return tableDataFiltred
            }).catch((error)=>{ console.error(error);return false})
        const cdrSize = Object.keys(cdr).length;
        if(cdrSize == 0) return "no data";
        return await mysqlAddCdr(cdr);
    }else{return login}
}

module.exports = run