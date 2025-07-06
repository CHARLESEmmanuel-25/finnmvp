import {Router} from "express";
import companyController from "../controller/company.controler.js";

const router = Router();

//avoir un symbol
router.get('/company/:symbol', companyController.oneCompany);

// une liste d'entreprise

router.get('/companies', companyController.AllCompanies)
export default router;