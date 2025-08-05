import bcrypt from 'bcrypt';
import userDatamapper from '../datamapper/user.datamapper.js';

const signinController = {
  async login(req, res) {
    const { email, mdp } = req.body;

    const userExist = await userDatamapper.getEmail(email);
    if (!userExist) {
      return res
        .status(400)
        .json({ error: 'The provided informations is wrong' });
    }

    const passwordHashFromDB = userExist.mdp;

    const isGoodPassword = await bcrypt.compare(mdp, passwordHashFromDB);
    if (!isGoodPassword) {
      return res
        .status(400)
        .json({ error: 'The provided informations is wrong' });
    }

    res.status(200).json({ data: [userExist] });
  },
};

export default signinController;