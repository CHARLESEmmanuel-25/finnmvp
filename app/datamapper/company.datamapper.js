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
  },

  async pushCompanyOnBDD(company) {
    const query = `
      INSERT INTO company (
        symbol,
        nom_company,
        description,
        date_creation,
        marketcap,
        lastdividend,
        averagevolume,
        currency,
        exchangefullname,
        exchange,
        industry,
        website,
        ceo,
        country,
        fulltimeemployees,
        address,
        phone,
        image,
        ipodate
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15,
        $16, $17, $18, $19
      )
      RETURNING *;
    `;

    const values = [
      company.symbol,
      company.nom_company,
      company.description,
      company.date_creation,
      company.marketcap,
      company.lastdividend,
      company.averagevolume,
      company.currency,
      company.exchangefullname,
      company.exchange,
      company.industry,
      company.website,
      company.ceo,
      company.country,
      company.fulltimeemployees,
      company.address,
      company.phone,
      company.image,
      company.ipodate
    ];

    const result = await client.query(query, values);
    return result.rows[0];
  },


  async pushSectorsOnBdd(sector){

    const query = `
      INSERT INTO secteur (nom_secteur)
      VALUES($1)
      RETURNING *;
    `;
    const values=[sector];
    const result = await client.query(query, values);
    return result.rows[0];
  },

  async existSector(sector){
    const query = `SELECT *
                   FROM secteur
                   WHERE nom_secteur = $1`;
    const values = [sector];
    const result = await client.query(query, values);
    return result.rows[0];
    
  },

  async existCompany(company){
    const query = `SELECT *
                   FROM company
                   WHERE symbol = $1`;
    const values = [company];
    const result = await client.query(query, values);
    return result.rows[0];
    
  },

  async searchBySymbol(searchword) {
    const query = `
      SELECT *
      FROM company
      WHERE symbol ILIKE $1
    `;
    const values = [`${searchword}%`];
    const result = await client.query(query, values);
    return result.rows;
  },

  async findCompanyById(idcompany){
    const query =`
      SELECT *
      FROM company
      WHERE id = $1
    `;
    const value = [idcompany];
    const result = await client.query(query,value);
    return result.rows;
  }




}

export default companyDatamapper;