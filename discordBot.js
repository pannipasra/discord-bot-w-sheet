import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios'

// Sample
// const postData = {
//     username: 'Captain Hook ',
//     content: '@everyone Hello Mortal v2 :)'
// }

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export class PostBotRequester {
    constructor() {
        this.url = DISCORD_WEBHOOK_URL;
        this.headers = {
            Accept: 'application/json',
            'Content-type': 'application/json'
        };
    }

    async sendPostRequest(data) {
        try {
            const response = await axios.post(
                this.url,
                data,
                { headers: this.headers }
            );
            console.log('ok sent to discord');
            return response.data; // Return the response data if needed
        } catch (error) {
            console.error('Error:', error);
            throw error; // Throw the error for handling in the calling function
        }
    }
}