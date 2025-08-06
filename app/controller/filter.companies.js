import companyDatamapper from "../datamapper/company.datamapper.js";

const filterController = {
  critereGeneral: async (req, res) => {
    try {
      const { filters } = req.body;

      if (!filters || !Array.isArray(filters)) {
        return res.status(400).json({ message: "Aucun filtre valide fourni." });
      }

      console.log("Filtres reçus :", filters);

      let companies = await companyDatamapper.getCompany();

      // Trier par marketcap croissant
      if (filters.includes("lower_price")) {
        companies = companies.sort((a, b) => {
          const marketA = parseFloat(a.marketcap) || 0;
          const marketB = parseFloat(b.marketcap) || 0;
          return marketA - marketB;
        });
      }

      // Entreprises avec dividende élevé
        if (filters.includes("high_dividend_yield")) {
        companies = companies
            .filter(company => {
            const dividend = parseFloat(company.lastdividend);
            return !isNaN(dividend) && dividend > 2.0;
            })
            .sort((a, b) => {
            const divA = parseFloat(a.lastdividend) || 0;
            const divB = parseFloat(b.lastdividend) || 0;
            return divB - divA; // tri décroissant
            });
        }


      // Entreprises établies : IPO il y a plus de 10 ans + 10 000 employés
      if (filters.includes("established_company")) {
        companies = companies.filter(company => {
          const ipoDate = new Date(company.ipodate);
          const tenYearsAgo = new Date();
          tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

          const employees = parseInt(company.fulltimeemployees, 10);

          return !isNaN(employees) && ipoDate <= tenYearsAgo && employees > 10000;
        });
      }

      //Entreprises tech bien établies avec dividendes élevés
        if (filters.includes('safe_tech')) {
        companies = companies.filter(company => {
            const industry = company.industry ? company.industry.toLowerCase() : "";
            const isTech = industry.includes("tech") || industry.includes("electronics") || industry.includes("software");
            
            const ipoDate = new Date(company.ipodate);
            const tenYearsAgo = new Date();
            tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

            const dividend = parseFloat(company.lastdividend) || 0;

            // Assouplir les conditions :
            return (
            isTech &&
            ipoDate <= tenYearsAgo &&    // tu peux passer à 5 ans par ex
            dividend >= 1.0              // seuil plus bas
            );
        });
        }


      // Startups récentes à fort potentiel

        if (filters.includes('growth_startup')) {
        companies = companies.filter(company => {
            const ipoDate = new Date(company.ipodate);
            const fiveYearsAgo = new Date();
            fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

            const marketcap = parseFloat(company.marketcap);
            const employees = parseInt(company.fulltimeemployees, 10);

            let score = 0;

            if (ipoDate >= fiveYearsAgo) score++;
            if (!isNaN(marketcap) && marketcap < 15_000_000_000) score++;
            if (!isNaN(employees) && employees < 3000) score++;

            return score >= 2; // au moins 2 critères remplis
        });
        }


      //Gros employeurs américains cotés au NASDAQ

      if (filters.includes('us_nasdaq_giants')) {
        companies = companies.filter(company => {
            const isUS = company.country === "US";
            const onNasdaq = company.exchangefullname && company.exchangefullname.toLowerCase().includes("nasdaq");
            const employees = parseInt(company.fulltimeemployees, 10);

            return isUS && onNasdaq && employees > 50000;
        });
      }

      //Valeurs sûres à haut dividende

      if (filters.includes('safe_dividend')) {
        companies = companies.filter(company => {
            const dividend = parseFloat(company.lastdividend);
            const marketcap = parseFloat(company.marketcap);
            const ipoDate = new Date(company.ipodate);
            const tenYearsAgo = new Date();
            tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

            return dividend > 3.0 && marketcap > 50_000_000_000 && ipoDate <= tenYearsAgo;
        });
      }

      // Tech américaines avec faible volume moyen

      if (filters.includes('hidden_tech')) {
        companies = companies.filter(company => {
            const isTech = company.industry && company.industry.toLowerCase().includes("tech");
            const isUS = company.country === "US";
            const volume = parseFloat(company.averagevolume);

            return isTech && isUS && volume < 1_000_000;
        });
      }


      if (companies.length === 0) {
        return res.status(404).json({ message: "Aucune entreprise ne correspond aux filtres." });
      }

      return res.status(200).json(companies);
    } catch (error) {
      console.error("Erreur dans critereGeneral :", error);
      return res.status(500).json({ message: "Erreur serveur lors du filtrage des entreprises." });
    }
  }
};

export default filterController;
