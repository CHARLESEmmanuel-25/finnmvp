import client from "../../config/client.js";

const companyDatamaper = {

  getOneCompanies : async (symbol)=>{
        const query = 'SELECT * FROM company WHERE symbol = $1'
        const values = [symbol];
        const res = await client.query(query, values)
        return res.rows;
  },

  getList : async ()=>{
    const query = 'SELECT * FROM company;';
    const res = await client.query(query)
    return res.rows
  }

    
}

export default companyDatamaper;