import { Router } from "express";
import usersRouter from "./userRoute";
import appointmentRouter from "./appointmentRoute";

const router: Router = Router();

router.use("/users", usersRouter);
router.use("/appointments", appointmentRouter);

export default router;
