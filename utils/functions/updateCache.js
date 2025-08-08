import companyDatamapper from "../../app/datamapper/company.datamapper.js";
import { readFile } from "fs/promises";
import path from 'path';

async function getCategorizedCompanies() {
  try {
    const companies = await companyDatamapper.getCompany();

    const filePath = path.join(process.cwd(), 'companies_data_price.json');
    const file = await readFile(filePath, 'utf-8');
    const priceList = JSON.parse(file); // tableau [{ symbol, price }]
    const priceMap = priceList;

    const topCaps = [];
    const smallCaps = [];
    const topMovers = [];

    for (const company of companies) {
      const cap = Number(company.marketcap);
      const symbol = company.symbol;
      const priceData = priceMap[symbol] || {};

      const open = priceData.open ?? priceData.o ?? null;
      const close = priceData.price ?? priceData.c ?? null;

      let variationPourcent = null;

      const mappedCompany = {
        logo: company.image,
        symbol,
        fullName: company.nom_company,
        description: company.description,
        price: close,
        performance: null,
        marketcap: cap,
      };

      if (cap > 200_000_000_000) {
        mappedCompany.categorie = 'Top capitalisation';
        topCaps.push(mappedCompany);
      } else if (cap >= 300_000_000 && cap <= 2_000_000_000) {
        mappedCompany.categorie = 'Small capitalisation';
        smallCaps.push(mappedCompany);
      }

      // Variation journalière en %
      if (open !== null && close !== null && open !== 0) {
        variationPourcent = ((close - open) / open) * 100;
        mappedCompany.performance = variationPourcent.toFixed(2);
      }

      // Top mouvements positifs (> 3%)
      if (variationPourcent !== null && variationPourcent > 3) {
        mappedCompany.categorie = 'Top mouvement';
        topMovers.push(mappedCompany);
      }
    }

    // Trier par plus forte performance
    topMovers.sort((a, b) => b.performance - a.performance);

    return {
      topCaps,
      smallCaps,
      topMovers,
      updatedAt: new Date()
    };

  } catch (error) {
    console.error("❌ Erreur lors de la catégorisation des entreprises :", error);
    return {
      topCaps: [],
      smallCaps: [],
      topMovers: [],
      updatedAt: null
    };
  }
}

export default getCategorizedCompanies;
