import https from 'https';

async function getCompany(symbol) {
  const url = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=KghQTtKpsU2iQpeK3XpvX4a8F1rrWnrD`;

  try {
    const response = await fetch(url, { agent: new https.Agent({ rejectUnauthorized: false }) });

    if (!response.ok) {
      console.error(`Erreur API pour ${symbol} - Code: ${response.status}`);
      return null;
    }

    const json = await response.json();

    if (!Array.isArray(json) || json.length === 0) {
      console.warn(`Aucune donnée trouvée pour ${symbol}`);
      return null;
    }

    return json;

  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${symbol}:`, error.message);
    return null;
  }
}

export default getCompany;
