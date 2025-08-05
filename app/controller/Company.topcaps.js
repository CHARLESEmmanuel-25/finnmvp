import { startCompanyCacheScheduler } from "../../utils/api/declencheur.js";
import DownloadCompanyCache from "../../utils/api/downloadCompanyBDD.js";
import cacheCompany from "../../utils/api/stockageCompaniecall.js";
import companyDatamapper from "../datamapper/company.datamapper.js";


const companiesTopCaps = {
  topcapitalisation: async (req, res) => {
    try {
      const companies = await companyDatamapper.getCompany();

      if (!companies || companies.length === 0) {
        return res.status(404).json({ error: "Aucune donnée trouvée." });
      }

      // Capitalisation minimale : 200 milliards
      const filteredCompanies = companies.filter(
        company => Number(company.marketcap) > 200_000_000_000
      );

      if (filteredCompanies.length === 0) {
        return res.status(404).json({ error: "Aucune entreprise au-dessus de 200 milliards." });
      }

      // Créer un tableau d’objets contenant seulement logo et symbol
      const companiesData = filteredCompanies.map(company => ({
        logo: company.image,
        symbol: company.symbol,
        fullName : company.nom_company,
        description: company.description,
        categorie: "Top capitalisation"
      }));

      return res.status(200).json(companiesData);

    } catch (error) {
      console.log("erreur", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },

  download: async (req, res)=>{
    const dataCompanies = DownloadCompanyCache();
    res.status(200).json(dataCompanies);
    return dataCompanies;
  }
};

export default companiesTopCaps;
