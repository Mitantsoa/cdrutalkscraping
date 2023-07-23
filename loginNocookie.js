import {config} from "dotenv";
import axios from 'axios';
import FormData from 'form-data';
import cheerio from 'cheerio';

config();

function makeForm(data){
    var bodyFormData = new FormData();
    for (let key in data){
        bodyFormData.append(key, data[key]);
    }
    return bodyFormData;
}

const login = await axios.post(process.env.LOGINURL, makeForm({'user': process.env.USER, 'pass': process.env.PASS,'login':"Login"}))
    .then((data) => {
            const respHtml = data.data;
            // const respHtml = '<h2 class="title">Hello world</h2>';
            const $ = cheerio.load(respHtml);
            const tag = $('script');
            const istag = tag.length == 0 || tag.length > 1 ? false : true;
            let isLoged = false;
            console.log(tag.text().toString());
            // console.log(tag.text().toString().search('cdr=cdr'));
            if (istag) {
                isLoged = tag.text().toString().search('cdr=cdr') != -1 ? true : false;

            }
            return isLoged
        }
    ).catch((error)=>{return false});

export default login;