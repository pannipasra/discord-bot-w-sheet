import { CronJob } from 'cron';
import { authorize, readCurrency, updateCurrency } from './sheet/sheet.helper.js';
import {
    extractCurrencyData,
    createMarkdownFromData,
    checkValJPY2THB
} from './utils.js';
import { PostBotRequester } from './discordBot.js';

let _tempValJPY2THB = 0.2461464251; // Initialize _tempValJPY2THB

export const checkCurrency = CronJob.from({
    cronTime: '0 */1 * * * *',
    onTick: async function () {
        const now = new Date().toLocaleString();
        console.log(`checkCurrency: ${now}`);

        try {
            const clientAuth = await authorize();
            const currencyData = await readCurrency(clientAuth);
            const { valJPY2THB, valTHB2JPY } = extractCurrencyData(currencyData);
            const markdown = createMarkdownFromData(valJPY2THB, valTHB2JPY);

            const { isOk, isInterest } = checkValJPY2THB(valJPY2THB, _tempValJPY2THB)

            let postData = {
                username: 'Captain Hook',
                content: `${markdown}`
            };

            if (isInterest) {
                postData.content = `**Interesting!!**\n${markdown}`;
            } else if (isOk) {
                postData.content = `**OKOK!!**\n${markdown}`;
            }

            if (isOk) {
                console.log(postData);
                const requestBot = new PostBotRequester();
                await requestBot.sendPostRequest(postData);
            }

        } catch (err) {
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

        try {
            const clientAuth = await authorize();
            await updateCurrency(clientAuth);
        } catch (err) {
            console.error(err);
        }
    },
    start: false,
    timeZone: 'Asia/Tokyo'
});