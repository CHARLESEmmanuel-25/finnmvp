import 'dotenv/config';
import bcrypt from 'bcrypt';
import userDatamapper from '../datamapper/user.datamapper.js';

const signupController = {
  async register(req, res) {
    try {
      const { email, mdp,pseudo } = req.body;

      const userExist = await userDatamapper.getEmail(email);
      if (userExist) {
        return res.status(400).json({ error: 'The user already exists' });
      }

     

      if (mdp.length < 4) {
        return res.status(400).json({ error: "mdp must be at least 8 characters" });
      }

      const saltRounds = 10;
      const hashedmdp = await bcrypt.hash(mdp, saltRounds);

      const newUser = { email, mdp: hashedmdp, pseudo };

      console.log(newUser);
      

      const createdUser = await userDatamapper.save(newUser);

      res.status(201).json({ message: 'User created successfully', userId: createdUser.id });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default signupController;
