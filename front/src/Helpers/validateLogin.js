export const validateLogin = (formData) => {
    const errors = {};

    if (!formData.username) {
        errors.username = "El nombre de usuario es requerido";
    } else if (formData.username.length < 5) {
        errors.username = "El nombre de usuario tiene que tener 5 o mas caracteres";
    }

    if (!formData.password) {
        errors.password = "La contraseña es requerida";
    } else if (formData.password.length < 7) {
        errors.password = "La contraseña tiene que tener 7 o mas caracteres";
    }

    return errors;
};