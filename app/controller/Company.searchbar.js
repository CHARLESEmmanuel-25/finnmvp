import companyDatamapper from "../datamapper/company.datamapper.js";


const CompaniesSearchFilterController ={

    searchbar: async (req, res) => {
        try {
            const searchword = req.body.searchword;
            const regex = /^[A-Z]{1,5}(\.[A-Z]{1,2})?$/;

            if (regex.test(searchword)) {
            const searchwordTobdd = await companyDatamapper.searchBySymbol(searchword);

            if (searchwordTobdd.length === 0) {
                return res.status(404).json({ message: "Aucune entreprise trouvée." });
            }

            return res.status(200).json(searchwordTobdd);
            } else {
            return res.status(400).json({ error: "Format du symbol invalide." });
            }
        } catch (error) {
            console.error("Erreur dans la searchbar :", error);
            return res.status(500).json({ error: "Erreur serveur" });
        }
    }

}

export default CompaniesSearchFilterController;