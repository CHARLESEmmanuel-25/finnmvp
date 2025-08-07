import companyDatamapper from "../datamapper/company.datamapper.js";
import { readFile } from "fs/promises";
import path from 'path';

let lastTopCompanies = []; // 🔁 cache des entreprises top cap
let lastUpdated = null;

// 🔁 Mise à jour du cache toutes les 60 secondes
async function updateTopCompaniesCache() {
  try {
    const companies = await companyDatamapper.getCompany();

    const filteredCompanies = companies.filter(
      company => Number(company.marketcap) > 200_000_000_000
    );

    const filePath = path.join(process.cwd(), 'companies_data_price.json');
    const file = await readFile(filePath, 'utf-8');
    const priceList = JSON.parse(file); // tableau [{ symbol, price }]
    const priceMap = priceList;

    lastTopCompanies = filteredCompanies.map(company => {
      const symbol = company.symbol;
      const priceData = priceMap[symbol] || {};

      return {
        logo: company.image,
        symbol: symbol,
        fullName: company.nom_company,
        description: company.description,
        price: priceData.price ?? null,
        performance: priceData.performance ?? null,  // ✅ ici la valeur est bien assignée
        categorie: "Top capitalisation"
      };
    });
    
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du cache Top Capitalisation :", error);
  }
}

// ⏱️ Lancer la mise à jour toutes les 60 secondes
updateTopCompaniesCache(); // appel immédiat
setInterval(updateTopCompaniesCache, 30_000); // 60s

// ✅ Contrôleur exporté avec les handlers
const companiesTopCaps = {
  topcapitalisation: async (req, res) => {
    if (!lastTopCompanies || lastTopCompanies.length === 0) {
      return res.status(503).json({ error: "Cache non prêt. Réessayez plus tard." });
    }

    return res.status(200).json({
      updatedAt: lastUpdated,
      data: lastTopCompanies
    });
  },

  download: async (req, res) => {
    res.status(200).json(lastTopCompanies);
  }
};

export default companiesTopCaps;
