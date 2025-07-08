import 'dotenv/config';

const API_NEWS_FINANCIAL = process.env.API_NEWS_FINANCIAL;
const API_NEWS_FINANCIAL_KEY = process.env.API_NEWS_FINANCIAL_KEY;


async function fetchNewsbyCompany(symbol,dateFrom,dateTo) {

    try {
        const url = `${API_NEWS_FINANCIAL}${symbol}&from=${dateFrom}&to=${dateTo}&token=${API_NEWS_FINANCIAL_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, url: ${url}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('No data found for the given symbol');
        }
        //console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching symbol:', error.message);
        throw error;
    }
    
}

export default fetchNewsbyCompany;