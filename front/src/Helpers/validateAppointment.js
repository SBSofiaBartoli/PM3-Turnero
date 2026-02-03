export const validateAppointment = (formData) => {
    const errors = {};

    if (!formData.date) {
        errors.date = "La fecha es requerida";
    } else {
        const selectedDate = new Date(formData.date);
        const dayOfWeek = selectedDate.getDay();
        if (dayOfWeek === 0) {
            errors.date = "No se pueden reservar turnos los domingos";
        }
    }
    if (!formData.time) {
        errors.time = "La hora es requerida";
    };
    if (!formData.treatment) {
        errors.treatment = "El tratamiento es requerido";
    };

    return errors;
};