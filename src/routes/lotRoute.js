import { Router } from "express";
import { LotController } from "../controllers/lotController.js";
import { auth } from '../middlewares/Auth.js';
import { canLot } from "../middlewares/AccessControl.js"

const router = Router();

router.use(auth)
    .post("/lots/create/:id", canLot, LotController.create)
    .get("/lots/company/:id", LotController.getLotsByCompany)
    .get("/lots/:id", LotController.getLotById)
    .put("/lots/edit/:id", canLot, LotController.updateLot)
    .put("/lots/close/:id", canLot, LotController.closeLot)

export default router;