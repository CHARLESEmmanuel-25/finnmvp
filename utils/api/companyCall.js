import https from 'https';

const API_KEY = 'KghQTtKpsU2iQpeK3XpvX4a8F1rrWnrD';
const BASE_URL = 'https://financialmodelingprep.com/stable/profile?symbol=';

async function getCompany(symbol) {
  const url = `${BASE_URL}${symbol}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url, {
      agent: new https.Agent({ rejectUnauthorized: false }),
    });

    if (!response.ok) {
      console.error(`[${symbol}] Erreur HTTP: ${response.status}`);
      return null;
    }

    const json = await response.json();
    console.log("struture de l'api", json);
    

    if (!json || Object.keys(json).length === 0) {
      console.warn(`[${symbol}] Données vides`);
      return null;
    }

    return json;

  } catch (error) {
    console.error(`[${symbol}] Erreur : ${error.message}`);
    return null;
  }
}

export default getCompany;
