import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { auth } from "../middlewares/Auth.js";
import { canUser } from "../middlewares/AccessControl.js";

const router = Router();


router
    .post("/users", UserController.create)

router.use(auth)
    .get("/users/all", UserController.getUsers)
    .get("/users/:id", UserController.getUserById)
    .put("/users/edit/:id",canUser, UserController.updateUser)
    .delete("/users/delete/:id",canUser, UserController.deleteUser)

export default router;