import companyDatamapper from "../datamapper/company.datamapper.js";
import { readFile } from "fs/promises";
import path from 'path';

const CompaniesController = {

  findById: async (req, res) => {
    try {
      const idcompany = parseInt(req.params.idcompany);

      const result = await companyDatamapper.findCompanyById(idcompany);

      if (!result || result.length === 0) {
        return res.status(404).json("Aucune donnée trouvée pour cette entreprise");
      }

      const company = result[0]; // On prend la première (et unique) entrée
      const symbol = company.symbol;

      // Charger le fichier JSON des prix
      const filePath = path.join(process.cwd(), 'companies_data_price.json');
      const file = await readFile(filePath, 'utf-8');
      const priceList = JSON.parse(file); // objet : { "AAPL": { price, performance }, ... }
      const priceData = priceList[symbol] || {};

      // Ajouter les données de prix à la réponse
      const enrichedCompany = {
        ...company,
        price: priceData.price ?? null,
        performance: priceData.performance ?? null
      };

      return res.status(200).json(enrichedCompany);

    } catch (error) {
      console.error("❌ Erreur dans findById :", error);
      return res.status(500).json("Erreur interne du serveur");
    }
  }

};

export default CompaniesController;
