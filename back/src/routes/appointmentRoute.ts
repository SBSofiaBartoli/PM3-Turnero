import { Router } from "express";
import { cancelAppointment, createAppointment, getAllAppointments, getAppointmentById } from "../controllers/appointmentController";

const appointmentRouter = Router();

appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/:id", getAppointmentById);
appointmentRouter.post("/schedule", createAppointment);
appointmentRouter.put("/cancel/:id", cancelAppointment);

export default appointmentRouter;
