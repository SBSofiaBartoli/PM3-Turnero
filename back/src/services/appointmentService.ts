import { FindManyOptions } from "typeorm";
import { appointmentRepository } from "../config/data-source";
import type { IAppointmentDto } from "../dto/AppointmentDto";
import { Appointment, AppStatus } from "../entities/Appointment";
import { getUserByIdService } from "./userService";

export const getAllAppointmentsService = async (userId: number | null = null): Promise<Appointment[]> => {
    const options: FindManyOptions<Appointment> = {
        relations: ["user"], 
        order: {
            date: "ASC",
            time: "ASC",
        },
    };

    if (userId) {
        options.where = {
            user: { id: userId },
        };
    }

    const appointments = await appointmentRepository.find(options);
    if (appointments.length == 0) throw new Error ("No hay turno disponibles");
    return appointments;
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    const appointment: null | Appointment = await appointmentRepository.findOne({where: {id}});
    if (!appointment) throw new Error ("Turno no encontrado")
    return appointment;
};

export const createAppointmentService = async (appData: IAppointmentDto): Promise<Appointment> => {
    const foundUser = await getUserByIdService(appData.userId);
    if (!foundUser) {
    throw new Error("Usuario no encontrado");
    }

    const appointmentDate = new Date(appData.date + "T00:00:00");
    const dayOfWeek = appointmentDate.getUTCDay();
    if (dayOfWeek === 0) {
    throw new Error("No se pueden reservar turnos los domingos");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (appointmentDate < today) {
        throw new Error("No se pueden reservar turnos en fechas pasadas");
    }

    const newAppointment: Appointment = await appointmentRepository.create({
    date: appData.date,
    time: appData.time,
    treatment: appData.treatment,
    user: foundUser,
    status: AppStatus.ACTIVE
    });
    const results = await appointmentRepository.save(newAppointment);
    return results;
};

export const cancelAppointmentService = async (appId: number): Promise<number> => {
    const appointment= await getAppointmentByIdService(appId)
    if (appointment.status == AppStatus.CANCELLED) throw new Error ("El turno ya estaba cancelado");
    appointment.status = AppStatus.CANCELLED;
    const results = await appointmentRepository.save(appointment);
    return results.id;
};
