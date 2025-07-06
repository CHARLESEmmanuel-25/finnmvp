import client from "../../config/client.js";

const companyDatamaper = {

    getCompanies : async ()=>{
        const res = await client.query("SELECT * FROM company");
        return res.rows;
    },
}

export default companyDatamaper;