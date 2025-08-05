import companyDatamapper from "../datamapper/company.datamapper.js";
import companyCache from "../../utils/api/downloadCompanyBDD.js";

const companySmallsCap = {
  smallcapitalisation: async (req, res) => {
    try {
      const companies = await companyDatamapper.getCompany();

      if (!companies || companies.length === 0) {
        return res.status(404).json({ error: "Aucune donnée trouvée." });
      }

      // Capitalisation minimale : 300_000_000
     const smallCaps = companies.filter(company => {
      const cap = Number(company.marketcap);
      return cap >= 300_000_000 && cap <= 2_000_000_000;
    });

      if (smallCaps.length === 0) {
        return res.status(404).json({ error: "Aucune entreprise en-dessous de 200 milliards." });
      }

      // Créer un tableau d’objets contenant seulement logo et symbol
      const companiesData = smallCaps.map(company => ({
        logo: company.image,
        symbol: company.symbol,
        fullName : company.nom_company,
        description: company.description,
        categorie: "Smalls capitalisations"
      }));

      return res.status(200).json(companiesData);

    } catch (error) {
      console.log("erreur", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }
};

export default companySmallsCap;
