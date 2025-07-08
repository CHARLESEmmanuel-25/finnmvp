import getCompanyinfo from "../../utils/callApi/company.info.js";
import fetchNewsbyCompany from "../../utils/callApi/company.news.js";
import getLastWeekRange from "../../utils/date/getLastWeekRange.js";
import companyDatamaper from "../datamapper/company.datamapper.js"


const companyController = {
     oneCompany: async (req,res)=>{
            
            try {
                const symbol = req.params.symbol;
                
                const companies = await companyDatamaper.getOneCompanies(symbol);
                console.log(companies);
                
                //console.log(typeof(companies));
                //const firstCompany = companies[0];

                const companyinfoApi = await getCompanyinfo(symbol);
                const {price,marketCap,companyName,lastDividend,image:companyImage,changePercentage,previousClose} = companyinfoApi[0];

                // get date

                const {dateTo, dateFrom} = getLastWeekRange();
        

                // fetch news

                const companyNewsApi = await fetchNewsbyCompany(symbol,dateFrom,dateTo)
                const {headline,id,related,source,summary,url,datetime,image:newsimage} = companyNewsApi[0];
                const dateformate = new Date(datetime *1000)

                let change = price - changePercentage;

                const perf = (change / previousClose) * 100;


                const info = {
                    symbol: companies[0].symbol,
                    prix: price,
                    companyName:companyName,
                    performance:223.10,
                    nom_complet: companies[0].nom_complet,
                    about: companies[0].description,
                    marketCap:marketCap, //donne une idée de la taille de l’entreprise
                    lastDividend:lastDividend,
                    changePercentage:perf,
                    image:companyImage,
                    news:{
                        id:id,
                        headline:headline,
                        related:related,
                        source:source,
                        summary:summary,
                        image:newsimage,
                        url:url,
                        date:dateformate.toISOString()
                    }
                };

                return res.status(200).json(info);
            } catch (error) {
                console.error('Error fetching this company:', error.message);
                throw error; // Relancer l'erreur pour la gérer dans la fonction appelante
            }
     },

     allCompanies: async (req, res) => {
        try {
            const companies = await companyDatamaper.getList();
            const length = companies.length;
            

            const allInfos = [];

            for (let i = 0; i < length; i++) {
                try {
                    
                    const symbolCompany = companies[i].symbol;
                    //console.log(typeof(symbolCompany));

                    const companyinfoApi = await getCompanyinfo(symbolCompany);
                    const { price, marketCap, companyName, lastDividend, changePercentage, image } = companyinfoApi[0];

                   

                    const info = {
                        symbol:companies[i].symbol,
                        prix: price,
                        companyName: companyName,
                        performance: 223.10, // valeur en dur à adapter
                        nom_complet: companies[i].nom_complet,
                        about: companies[i].description,
                        marketCap: marketCap,
                        lastDividend: lastDividend,
                        changePercentage: changePercentage, // données a calculer
                        image: image
                    };

                    //console.log(info);
                    allInfos.push(info);
                    console.log(allInfos);
                } catch (error) {
                    console.error(`Erreur pour${companies[i].symbol}:`, error.message);
                }
            }
            

            return res.status(200).json(allInfos);
        } catch (error) {
            console.error('Error fetching companies:', error.message);
            return res.status(500).json({ error: 'Erreur serveur lors de la récupération des entreprises.' });
        }
    },

    // filtre par prix
    allCompaniesByPrice: async (req, res) => {
        try {

            const min = Number(req.params.min);
            const max = Number(req.params.max);

            if (isNaN(min) || isNaN(max) || min < 0 || max <= min) {
            return res.status(400).json({ error: "Paramètres de tranche de prix invalides." });
            }

            const companies = await companyDatamaper.getList();

            const results = [];

               

            return res.status(200).json(results);

            
        } catch (error) {
            console.error("Erreur dans AllCompaniesByPriceRange :", error.message);
            return res.status(500).json({ error: "Erreur serveur lors du filtrage par tranche de prix." });
        }

    }







}

export default companyController;