
import cacheCompany from "../../utils/api/cacheExpire.js";


const companiesTopCaps = {
  topcapitalisation: async (req, res) => {
      try {
      const topCompanies = cacheCompany.companyCachedata.filter(company => {
        const cap = Number(company.mktCap); 
        return !isNaN(cap) && cap >= 200_000_000_000;
      });

      res.json(topCompanies);
    } catch (error) {
      console.error("Erreur lors de la récupération des top companies :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },
};

export default companiesTopCaps;
