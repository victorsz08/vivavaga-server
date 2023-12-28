import { Router } from "express";
import { CompanyController } from "../controllers/companyController.js";
import { auth } from "../middlewares/Auth.js";

const router = Router();

router.use(auth)
    .post("/companies", CompanyController.create)
    .get("/companies/all", CompanyController.getCompanies)
    .get("/companies/:id", CompanyController.getCompanyById)
    .get("/company/owner", CompanyController.getCompanyByOwner)
    .put("/companies/edit/:id", CompanyController.updateCompany)
    .delete("/companies/delete/:id", CompanyController.deleteCompany)

export default router;