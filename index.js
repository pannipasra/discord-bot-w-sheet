import dotenv from 'dotenv';
dotenv.config();
import express from'express'
import { 
  checkCurrency,
  tryToUpdateCurrencySheet
} from'./cron-job.js'


const app = express();

// Define your routes
app.get('/', (req, res) => {
  res.send('Hello, this is the homepage!');
});


checkCurrency.start();
tryToUpdateCurrencySheet.start();

// Start the server
const PORT = process.env.PORT || 3475;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 🌈`);
});