import {Router} from "express";
import signupController from "../controller/user.signup.controler.js";
import signinController from "../controller/user.signincontroler.js";
import companiesTopCaps from "../controller/Company.topcaps.js";
import companySmallsCap from "../controller/Company.smallcap.js";
import CompaniesSearchFilterController from "../controller/Company.searchbar.js";
import loginLimiter from "../middlewares/limiter.login.js";


const router = Router();


// Route pour afficher la liste des entreprise dans top capitalisations
router.get('/companies/topcaps', companiesTopCaps.topcapitalisation);

// Route pour afficher la liste des entreprises dans le smallcap
router.get('/companies/smallscaps', companySmallsCap.smallcapitalisation);

// Route pour la barre de recherche
router.post('/companies/search', CompaniesSearchFilterController.searchbar);

//lancement du chargement du cache
router.get('/telecharger', companiesTopCaps.download);


//user routes
 router.post('/signup', signupController.register);

 //connexion
 router.post('/signin',loginLimiter, signinController.login);

 //logout
 router.post('/logout', signinController.logout);


 export default router;

