import {Router} from "express";
import signupController from "../controller/user.signup.controler.js";
import signinController from "../controller/user.signincontroler.js";

const router = Router();


 //user routes
 router.post('/signup', signupController.register);

 router.post('/signin', signinController.login)



