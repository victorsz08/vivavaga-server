import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { auth } from "../middlewares/Auth.js";

const router = Router();


router
    .post("/users", UserController.create)

router.use(auth)
    .get("/users", UserController.getUsers)
    .get("/users/:id", UserController.getUserById)
    .put("/users/:id", UserController.updateUser)
    .delete("/users/:id", UserController.deleteUser)

export default router;