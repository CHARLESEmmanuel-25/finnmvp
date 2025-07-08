import 'dotenv/config';
import bcrypt from 'bcrypt';
import userDatamapper from '../datamapper/user.datamapper.js';

const signupController = {
  async register(req, res) {
    try {
      const { email, password, passwordConfirm, pseudo } = req.body;

      const userExist = await userDatamapper.show(email);
      if (userExist) {
        return res.status(400).json({ error: 'The user already exists' });
      }

      if (password !== passwordConfirm) {
        return res.status(400).json({ error: "Passwords don't match" });
      }

      if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = { email, password: hashedPassword, pseudo };

      const createdUser = await userDatamapper.create(newUser);

      res.status(201).json({ message: 'User created successfully', userId: createdUser.id });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default signupController;
