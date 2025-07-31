import companyDatamapper from "../datamapper/company.datamapper.js";
import companyCache from "../../utils/api/cacheExpire.js";

const companySmallsCap = {
  smallcapitalisation: async (req, res) => {
    try {
      const companyData = companyCache.companyCachedata;

      if (!companyData || companyData.length === 0) {
        return res.status(404).json({
          message: "Aucune donnée en cache. Veuillez patienter ou lancer une mise à jour.",
        });
      }

      // Définition des seuils
      const SMALL_CAP_MIN = 300_000_000;
      const SMALL_CAP_MAX = 2_000_000_000;
      const NANO_CAP_MAX = 300_000_000;

      // Filtrage Small Cap, Micro et Nano uniquement (mktCap <= 2 milliards)
      const results = companyData
        .filter((company) => company.mktCap <= SMALL_CAP_MAX)
        .map((company) => {
          const mktCap = company.mktCap;
          let category = "";

          if (mktCap >= SMALL_CAP_MIN) {
            category = "Small Cap";
          } else if (mktCap >= NANO_CAP_MAX) {
            category = "Micro Cap";
          } else {
            category = "Nano Cap";
          }

          return {
            companyName: company.companyName,
            mktCap: company.mktCap,
            symbol: company.symbol,
            image: company.image,
            price: company.price,
            category: category,
          };
        });

      return res.status(200).json(results);
    } catch (error) {
      console.error("Erreur dans smallcapitalisation (cache only) :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

export default companySmallsCap;
