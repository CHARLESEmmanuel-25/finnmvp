import {Router} from "express";
import companyController from "../controller/company.controler.js";

const router = Router();

router.get('/companies', companyController.AllCompany);

export default router;