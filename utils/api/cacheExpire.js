import companyDatamapper from "../../app/datamapper/company.datamapper.js";
import getCompany from "./companyCall.js";
import cacheCompany from "./stockageCompaniecall.js";

// Utilitaire pour attendre X millisecondes
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const API_DELAY = 1000;


async function companyCache() {
  const now = Date.now();

  if (cacheCompany.lastFetchTime && (now - cacheCompany.lastFetchTime) < TWO_DAYS) {
    console.log("Cache encore valide. Mise à jour non nécessaire.");
    return;
  }

  console.log("Appel API - mise en cache des données companies");

  cacheCompany.companyCachedata = [];
  const companyBDD = await companyDatamapper.getCompany();

  for (const company of companyBDD) {
    const symbol = company.symbol;
    let success = false;
    let attempts = 0;

    while (!success && attempts < 3) {
      try {
        const data = await getCompany(symbol);
        if (data && Array.isArray(data) && data.length > 0) {
          cacheCompany.companyCachedata.push(data[0]);
          success = true;
        } else {
          console.warn(`Aucune donnée trouvée pour ${symbol}`);
          success = true;
        }
      } catch (err) {
        if (err.response?.status === 429) {
          attempts++;
          const waitTime = 5000 * attempts;
          console.warn(`429 reçu pour ${symbol}, attente ${waitTime / 1000}s avant retry (${attempts}/3)...`);
          await sleep(waitTime);
        } else {
          console.error(`Erreur pour ${symbol} :`, err.message);
          success = true;
        }
      }
    }

    await sleep(API_DELAY);
  }

  cacheCompany.lastFetchTime = Date.now();
  console.log("Cache mis à jour :", cacheCompany.companyCachedata.length, "éléments");
}

// Fonction à appeler depuis un autre fichier pour démarrer la mise à jour périodique


export default companyCache;
