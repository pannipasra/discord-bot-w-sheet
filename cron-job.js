import { CronJob } from 'cron';
import { authorize, readCurrency, updateCurrency } from './sheet/sheet.helper.js';
import { createMarkdownTable, createPlaintextTable, createMarkdownList } from './utils.js';
import { PostBotRequester } from './discordBot.js';

export const checkCurrency = CronJob.from({
    cronTime: '0 */3 * * * *',
    onTick: async function () {
        const now = new Date().toLocaleString();
        console.log(`checkCurrency: ${now}`);

        try{
            const clientAuth = await authorize();
            const currencyData = await readCurrency(clientAuth);
            const mdTable = createMarkdownTable(currencyData);
            const textTable = createPlaintextTable(currencyData);
            const mdList = createMarkdownList(currencyData);
            
            const postData = {
                username: 'Captain Hook ',
                content: `Currency ALERT!
                ${mdList}
                `
            }
            // console.log(mdList);
            const requestBot = new PostBotRequester();
            await requestBot.sendPostRequest(postData);
        }catch(err){
            console.error(err);
        }
    },
    start: false,
    timeZone: 'Asia/Tokyo'
});

export const tryToUpdateCurrencySheet = CronJob.from({
    cronTime: '0 */15 * * * *',
    onTick: async function () {
        const now = new Date().toLocaleString();
        console.log(`tryToUpdateCurrencySheet: ${now}`);

        try{
            const clientAuth = await authorize();
            await updateCurrency(clientAuth);
        }catch(err){
            console.error(err);
        }
    },
    start: false,
    timeZone: 'Asia/Tokyo'
});