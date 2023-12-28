import { Router } from "express";
import { CompanyController } from "../controllers/companyController.js";
import { auth } from "../middlewares/Auth.js";
import { canCompany } from "../middlewares/AccessControl.js";

const router = Router();

router.use(auth)
    .post("/companies", CompanyController.create)
    .get("/companies/all", CompanyController.getCompanies)
    .get("/companies/:id", CompanyController.getCompanyById)
    .get("/company/owner", CompanyController.getCompanyByOwner)
    .put("/companies/edit/:id", canCompany, CompanyController.updateCompany)
    .delete("/companies/delete/:id", canCompany, CompanyController.deleteCompany)

export default router;