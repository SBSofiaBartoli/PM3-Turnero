import { useEffect, useState } from "react";
import styles from "./MisTurnos.module.css"
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function MisTurnos () {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const getAppointments = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.get(`http://localhost:3000/appointments?userId=${user.id}`);
            setAppointments(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        
    };

    const handleAddAppointment = (appointment) => {
        setAppointments((prevState) => [...prevState, appointment]);
    };

    const handleCancelAppointment = () => {
        getAppointments();
    };
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/");
        } else {
            getAppointments();
        }
    }, []);

    return (
    <main className={styles.myAppointmentsContainer}>
        <AppointmentForm onAddAppointment={handleAddAppointment} />
        <h1>Mis Turnos</h1>
        <div className={styles.appointmentsHeader}>
            <span>Fecha</span>
            <span>Hora</span>
            <span>Tratamiento</span>
            <span>Estado</span>
            <span>Acción</span>
        </div>
        <div className={styles.appointmentsList}>
            { loading ? (
                <h2>Loading ... </h2>
            ) : (
                appointments.map((appoint) => <AppointmentCard  key={appoint.id} appointment={appoint} onCancel={handleCancelAppointment}/>
            ))}
        </div>
    </main>
    )
};

export default MisTurnos;
