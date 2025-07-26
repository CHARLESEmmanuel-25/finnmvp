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
  }

}

export default userDatamapper;