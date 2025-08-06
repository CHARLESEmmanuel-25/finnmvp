import client from "../../config/client.js";

const userDatamapper = {

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


  async getEmail(email) {

    const response = await client.query(`
      SELECT * FROM "utilisateur" 
        WHERE "email" = $1
      ;`, [email])
    ;

    console.log(response.rows[0]);
    return response.rows[0];
  },

  async findFavoritesByid(userId, companyId) {
    const query = `
      SELECT f.*
      FROM favori f
      JOIN utilisateur u ON f.code_utilisateur = u.id
      WHERE u.id = $1 AND f.code_company = $2;
    `;
    const values = [userId, companyId];
    const result = await client.query(query, values);
    return result.rows; 
  },


  async addfavorites(userId, companyId) {
    const query = `
      INSERT INTO favori (code_company, code_utilisateur)
      VALUES ($1, $2)
    `;
    const values = [companyId, userId]; // 👈 Inversé ici
    const result = await client.query(query, values);
    return result.rows;
  }



}

export default userDatamapper;