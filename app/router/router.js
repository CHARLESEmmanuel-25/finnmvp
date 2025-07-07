import {Router} from "express";
import companyController from "../controller/company.controler.js";

const router = Router();

//recherche
router.get('/company/:symbol', companyController.oneCompany);

// une liste d'entreprise
router.get('/companies', companyController.allCompanies)

// filtre actions a bas prix l'utilisateur pourra choisir soit en dessous de 200 - 100 - 50
router.get('/companies/price-range/:min/:max', companyController.allCompaniesByPrice)
export default router;