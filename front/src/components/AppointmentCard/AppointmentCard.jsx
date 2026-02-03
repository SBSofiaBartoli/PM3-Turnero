import axios from "axios";
import styles from "./AppointmentCard.module.css";

function AppointmentCard ({ appointment, onCancel }) {
    const handleCancel = async () => {
        try {
            const appointmentDate = new Date(appointment.date);
            const currentDate = new Date();

            if (appointmentDate.getTime() <= currentDate.getTime()) {
                return alert("El turno se puede cancelar unicamente hasta el dia anterior a la reserva");
            };
            await axios.put(`http://localhost:3000/appointments/cancel/${appointment.id}`);
            alert("Turno cancelado con exito");
            onCancel();
        } catch (error) {
            console.error(error);
            alert("Ocurrio un error al cancelar el turno");
        }
    }

    return (
    <div className={styles.appointmentCard}>
        <span>{appointment.date}</span>
        <span>{appointment.time}</span>
        <span>{appointment.treatment}</span>
        <span className={`${styles.status} ${
            appointment.status === "cancelled"
            ? styles.cancelled
            : styles.active
        }`}
        >
        {appointment.status}
        </span>
        <span>
            {appointment.status !== "cancelled" && <button onClick={handleCancel}  className={styles.cancelButton}>Cancelar</button>}
        </span>
    </div>
    )
};

export default AppointmentCard;
