import client from "../../config/client.js";

const companyDatamapper = {

  async save(user) {
    const query = `
      INSERT INTO utilisateur (email, mdp, pseudo)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [user.email, user.mdp, user.pseudo];
    const result = await client.query(query, values);
    return result.rows[0];
  },


  async getCompany() {

    const response = await client.query(`
        SELECT * 
        FROM company;`);
    return response.rows;
  }

}

export default companyDatamapper;