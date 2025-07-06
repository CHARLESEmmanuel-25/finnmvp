import getCompanyinfo from "../../utils/callApi/company.info.js";
import companyDatamaper from "../datamapper/company.datamapper.js"


const companyController = {
     oneCompany: async (req,res)=>{
            
            try {
                const symbol = req.params.symbol;
                
                const companies = await companyDatamaper.getOneCompanies(symbol);
                //console.log(typeof(companies));
                //const firstCompany = companies[0];

                const companyinfoApi = await getCompanyinfo(symbol);
                const {price,marketCap,companyName,lastDividend,changePercentage,image} = companyinfoApi[0];

            const info = {
                symbol: companies[0].symbol,
                prix: price,
                companyName:companyName,
                performance:223.10,
                nom_complet: companies[0].nom_complet,
                about: companies[0].description,
                marketCap:marketCap, //donne une idée de la taille de l’entreprise
                lastDividend:lastDividend,
                changePercentage:changePercentage,
                image:image
            };

                return res.status(200).json(info);
            } catch (error) {
                console.error('Error fetching companies:', error.message);
                throw error; // Relancer l'erreur pour la gérer dans la fonction appelante
            }
     },

     AllCompanies: async (req,res) =>{

     },


}

export default companyController;