import {Router} from "express";
import signupController from "../controller/user.signup.controler.js";
import signinController from "../controller/user.signincontroler.js";
import companyController from "../controller/Company.controller.js";

const router = Router();


// Route pour afficher la liste des entreprise dans top capitalisations

router.get('/company/topcaps', companyController.topcapitalisation);



 //user routes
 router.post('/signup', signupController.register);

 router.post('/signin', signinController.login)


 export default router;

