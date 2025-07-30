import getCompany from "../../utils/api/companyCall.js";
import companyDatamapper from "../datamapper/company.datamapper.js";
import companyCache from "../../utils/api/cacheExpire.js";

const companyController = {
  topcapitalisation: async (req, res) => {
    try {
      const now = Date.now();
      const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;
      const isExpired = companyCache.lastFetchTime && (now - companyCache.lastFetchTime > TWO_DAYS);

      let companyData = [];

      const companyInfoFromDb = await companyDatamapper.getCompany();

      if (companyCache.companyCachedata.length === 0 || isExpired) {
        companyCache.companyCachedata = [];

        for (const company of companyInfoFromDb) {
          const symbol = company.symbol;
          const data = await getCompany(symbol);

          if (data && Array.isArray(data) && data.length > 0) {
            companyData.push(data[0]); // on prend le 1er élément
          } else {
            console.warn(`Aucune donnée trouvée pour ${symbol}`);
          }
        }

        companyCache.companyCachedata = companyData;
        companyCache.lastFetchTime = now;
      } else {
        companyData = companyCache.companyCachedata;
      }

      if (companyData.length === 0) {
        return res.status(404).json({ message: "Aucune entreprise valide trouvée." });
      }

      // Définition des seuils
      const MEGA_CAP = 200_000_000_000;
      const MID_CAP = 10_000_000_000;

      // Filtrage Mega Cap et Mid Cap
      const results = companyData
        .filter((company) => {
          const mktCap = company.mktCap;
          return mktCap >= MID_CAP; // on garde que Mega ou Mid
        })
        .map((company) => {
          let category = "";
          if (company.mktCap >= MEGA_CAP) {
            category = "Top Cap";
          } else {
            category = "Mid Cap";
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
      console.error("Erreur dans topcapitalisation :", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

export default companyController;
