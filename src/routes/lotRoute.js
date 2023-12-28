import { Router } from "express";
import { LotController } from "../controllers/lotController.js";
import { auth } from '../middlewares/Auth.js';

const router = Router();

router.use(auth)
    .post("/lots/:id", LotController.create)
    .get("/lots/company/:id", LotController.getLotsByCompany)
    .get("lots/:id", LotController.getLotById)
    .put("/lots/:id", LotController.updateLot)
    .put("/lots/close/:id", LotController.closeLot)

export default router;