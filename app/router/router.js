import {Router} from "express";
import signupController from "../controller/user.signup.controler.js";
import signinController from "../controller/user.signincontroler.js";
import companiesTopCaps from "../controller/Company.topcaps.js";
import companySmallsCap from "../controller/Company.smallcap.js";

const router = Router();


// Route pour afficher la liste des entreprise dans top capitalisations
router.get('/companies/topcaps', companiesTopCaps.topcapitalisation);

// Route pour afficher la liste des entreprises dans le smallcap
router.get('/companies/smallscaps', companySmallsCap.smallcapitalisation);



 //user routes
 router.post('/signup', signupController.register);

 router.post('/signin', signinController.login)


 export default router;

