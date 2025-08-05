import bcrypt from 'bcrypt';
import userDatamapper from '../datamapper/user.datamapper.js';
import jwt from 'jsonwebtoken';

const signinController = {
  async login(req, res) {
    const { email, mdp } = req.body;


    const user = await userDatamapper.getEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ error: 'The provided informations is wrong' });
    }

    const passwordHashFromDB = user.mdp;

    const isGoodPassword = await bcrypt.compare(mdp, passwordHashFromDB);
    if (!isGoodPassword) {
      return res
        .status(400)
        .json({ error: 'The provided informations is wrong' });
    }
  
    const token = jwt.sign({userId: user.id}, process.env.SECRET_WORD, {
      expiresIn: '1h'
    })

    res.status(200).json({message: 'connexion réussie', userToken: token});
  },

  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) return res.status(500).json({ error: 'Erreur de déconnexion' });
      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'Déconnecté avec succès' });
    });
  }
};

export default signinController;