import client from "../../config/client.js";

const companyDatamaper = {

  getOneCompanies : async (symbol)=>{
        const query = 'SELECT * FROM company WHERE nom_company = $1'
        const values = [symbol];
        const res = await client.query(query, values)
        return res.rows;
    },

    
}

export default companyDatamaper;