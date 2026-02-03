export const validateRegister = (formData) => {
    const errors = {};

    if (!formData.name) {
        errors.name = "El nombre es requerido";
    } else if (formData.name.length < 5) {
        errors.name = "El nombre tiene que tener 5 o mas caracteres";
    }

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

    if (!formData.nDni) {
        errors.nDni = "El numero de DNI es requerido";
    } else if (String(formData.nDni.length) < 7 || String(formData.nDni.length) > 8) {
        errors.nDni = "El numero de DNI no es valido";
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!formData.email) {
        errors.email = "El e-mail es requerido";
    } else if (!emailRegex.test(formData.email)) {
        errors.email = "E-mail invalido";
    }

    if (!formData.birthdate) {
        errors.birthdate = "La fecha de nacimiento es requerida";
    } else {
        const birthdate = new Date(formData.birthdate);
        const age = new Date().getFullYear() - birthdate.getFullYear();
        if (age < 18) {
            errors.birthdate = "Debe ser mayor de 18 años para registrarse en la app";
        }
    }

    return errors;
};
