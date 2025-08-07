import axios from 'axios';

const API_KEY = process.env.FINNHUB_API_KEY;
const symbol = 'AAPL';

const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;

const data = await axios.get(url);
console.log(data.data);
