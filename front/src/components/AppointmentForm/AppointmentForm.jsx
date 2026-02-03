import {ErrorMessage, Field, Form, Formik} from "formik";
import { validateAppointment } from "../../Helpers/validateAppointment";
import styles from "./AppointmentForm.module.css";
import axios from "axios";
import { useState } from "react";

function AppointmentForm ({ onAddAppointment }) {
    const [showForm, setShowForm] = useState(false);
    const initialState = {
        date: "",
        time: "",
        treatment: "",
    };

    const handleSubmit = async (values, {resetForm}) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.post("http://localhost:3000/appointments/schedule", { ...values, userId: user.id, });
            onAddAppointment(response.data);
            alert("Turno reservado");
            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || "Ocurrió un error al enviar el formulario";
            alert(message);
        }
    };

    const hours = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
    ];

    const treatments = [
        "Uñas semipermanentes",
        "Pestañas pelo por pelo",
        "Lifting de pestañas",
        "Depilación láser",
        "Limpieza facial",
        "Masaje relajante",
    ];

    return (
        <div className={styles.formContainer}>
            {!showForm ? (
        <button className={styles.reserveButton} onClick={() => setShowForm(true)}>
            Reservar Turno
        </button>
        ) : (
        <Formik initialValues={initialState} validate={validateAppointment} onSubmit={handleSubmit}>
            <Form className={styles.appointmentForm}>
            <div className={styles.inputGroup}>
                <label>Tratamiento</label>
                <Field as="select" name="treatment">
                <option value="">Seleccioná un tratamiento</option>
                {treatments.map((t, index) => (
                    <option key={index} value={t}>
                    {t}
                    </option>
                ))}
                </Field>
                <p>
                <ErrorMessage name="treatment" />
                </p>
            </div>

            <div className={styles.inputGroup}>
                <label>Fecha de Reserva</label>
                <Field type="date" name="date" />
                <p>
                <ErrorMessage name="date" />
                </p>
            </div>

            <div className={styles.inputGroup}>
                <label>Hora de Reserva</label>
                <Field as="select" name="time">
                <option value="">Seleccioná una hora</option>
                {hours.map((hour, index) => (
                    <option value={hour} key={index}>
                    {hour}
                    </option>
                ))}
                </Field>
                <p>
                <ErrorMessage name="time" />
                </p>
            </div>

            <div className={styles.buttonsGroup}>
                <button type="submit">Confirmar Turno</button>
                <button type="button" onClick={() => setShowForm(false)}>
                Cancelar
                </button>
            </div>
            </Form>
        </Formik>
        )}
    </div>
    );
};


export default AppointmentForm;