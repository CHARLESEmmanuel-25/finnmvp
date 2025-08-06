import companyDatamapper from "../datamapper/company.datamapper.js";

const CompaniesController ={

    findById : async (req,res)=>{
        
        try {

            const idcompany = parseInt(req.params.idcompany);
        
            const result = await companyDatamapper.findCompanyById(idcompany);
            
            if (result.length == 0) {
                return res.status(404).json("Error aucune donnée trouver pour la ressource demander")
            }

            return res.status(200).json(result)
            
        } catch (error) {
            return res.status(404).json("Error aucune donnée trouver pour la ressource demander", error)
        }


        
    }

}

export default CompaniesController;