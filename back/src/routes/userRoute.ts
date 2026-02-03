import { Router } from "express";
import { registerUser, getAllUsers, getUserById, loginUser } from "../controllers/userController";

const usersRouter = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);

export default usersRouter;
