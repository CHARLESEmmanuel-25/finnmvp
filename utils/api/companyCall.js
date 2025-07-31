import https from 'https';

const API_KEY = 'KghQTtKpsU2iQpeK3XpvX4a8F1rrWnrD';
const BASE_URL = 'https://financialmodelingprep.com/api/v3/profile/';

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function getCompany(symbol, attempt = 1) {
  const url = `${BASE_URL}${symbol}?apikey=${API_KEY}`;

  try {
    const response = await fetch(url, {
      agent: new https.Agent({ rejectUnauthorized: false }),
    });

    if (response.status === 429) {
      const wait = 5000 * attempt; // backoff exponentiel : 5s, 10s, 15s
      console.warn(`[${symbol}] Code 429 reçu. Attente de ${wait / 1000}s avant nouvelle tentative (${attempt}/3)`);
      if (attempt < 3) {
        await sleep(wait);
        return getCompany(symbol, attempt + 1);
      } else {
        console.error(`[${symbol}] Échec après 3 tentatives suite à des erreurs 429`);
        return null;
      }
    }

    if (!response.ok) {
      console.error(`[${symbol}] Erreur API - Code: ${response.status}`);
      return null;
    }

    const json = await response.json();

    if (!Array.isArray(json) || json.length === 0) {
      console.warn(`[${symbol}] Aucune donnée retournée`);
      return null;
    }

    return json;

  } catch (error) {
    console.error(`[${symbol}] Erreur réseau : ${error.message}`);
    return null;
  }
}

export default getCompany;
