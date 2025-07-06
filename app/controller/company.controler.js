import getCompanyinfo from "../../utils/callApi/company.info.js";
import companyDatamaper from "../datamapper/company.datamapper.js"


const companyController = {
     AllCompany: async (req,res)=>{
            
            try {
                const companies = await companyDatamaper.getCompanies();
                console.log(typeof(companies));
                const firstCompany = companies[0];

                const companyinfoApi = await getCompanyinfo('AAPL');
                const {price} = companyinfoApi[0];

            const info = {
                symbol: companies[0].symbol,
                prix: price,
                nom_complet: companies[0].nom_complet,
                about: companies[0].description
            };

                return res.status(200).json(info);
            } catch (error) {
                console.error('Error fetching companies:', error.message);
                throw error; // Relancer l'erreur pour la gérer dans la fonction appelante
            }
     },


}

export default companyController;