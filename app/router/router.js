import {Router} from "express";
import signupController from "../controller/user.signup.controler.js";
import signinController from "../controller/user.signincontroler.js";
import companiesTopCaps from "../controller/Companies.topcaps.js";
import companySmallsCap from "../controller/Companies.smallcap.js";
import CompaniesSearchFilterController from "../controller/Companies.searchbar.js";
import loginLimiter from "../middlewares/limiter.login.js";
import Useraddfavotite from "../controller/User.addfavorites.js";
import authenticateJWT from "../middlewares/tokenverify.js";
import CompaniesController from "../controller/Companies.byid.js";


const router = Router();


// Route pour afficher la liste des entreprise dans top capitalisations
router.get('/companies/topcaps', companiesTopCaps.topcapitalisation);

// Route pour afficher la liste des entreprises dans le smallcap
router.get('/companies/smallscaps', companySmallsCap.smallcapitalisation);

// Route pour la barre de recherche
router.post('/companies/search', CompaniesSearchFilterController.searchbar);

//user routes
 router.post('/signup', signupController.register);

 //connexion
 router.post('/signin',loginLimiter, signinController.login);

 //logout
 router.post('/logout', signinController.logout);

 //toggle favorites
 router.post('/companies/dropfavorites/:idcompany',authenticateJWT,Useraddfavotite.toggleFavorite);

// liste tous les favoris de l'utilisateur
router.get('/companies/user/watchlist',authenticateJWT,Useraddfavotite.watchlist);

// company par id 
 router.get('/companies/:idcompany', CompaniesController.findById);


//lancement du chargement du cache
router.get('/telecharger', companiesTopCaps.download);

 export default router;

