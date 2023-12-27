import { Router } from "express";
import { CompanyController } from "../controllers/companyController.js";
import { auth } from "../middlewares/Auth.js";

const router = Router();

router.use(auth)
    .post("/company", CompanyController.create)
    .get("/company", CompanyController.getCompanies)
    .get("/company/:id", CompanyController.getCompanyById)
    .put("/company/:id", CompanyController.updateCompany)
    .delete("/company/:id", CompanyController.deleteCompany)

export default router;