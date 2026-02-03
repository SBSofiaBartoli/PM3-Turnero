import type { Request, Response } from "express";
import { cancelAppointmentService, createAppointmentService, getAllAppointmentsService, getAppointmentByIdService } from "../services/appointmentService";

export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.query.userId);
        const appointments = await getAllAppointmentsService(Number(userId));
        res.status(200).json(appointments);
    } catch (error: any) {
        if (error.message == "No hay turnos disponibles") {
            return res.status(404).json({ message: error.message });
        }
        res.status(400).json({message: error.message});
    }
};

export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await getAppointmentByIdService(Number(appointmentId));
        res.status(200).json({appointment});
    } catch (error: any) {
        if (error.message == "Turno no encontrado") {
            return res.status(404).json({message: error.message});
        }
        res.status(500).json({message: error.message});
    }
};

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = await createAppointmentService(req.body);
        res.status(201).json(appointment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await cancelAppointmentService(Number(appointmentId));
        res.status(200).json(appointment);
    } catch (error: any) {
        if (error.message == "Turno no encontrado") {
            return res.status(404).json({message: error.message});
        }
        res.status(500).json({message: error.message});
    }
};
