import { useState } from "react";
import { validateRegister } from "../../Helpers/validateRegister";
import axios from "axios";
import styles from "./Register.module.css";

function Register () {
    const initialState = {
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
    };

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const handleChange = ({ target: { name, value }}) => {
        setForm({
            ...form, 
            [name]: value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const errorsMessages = validateRegister(form) || {};
            
            if (Object.keys(errorsMessages).length > 0) {
                setErrors(errorsMessages);
                alert("Hay errores en el formulario");
                return;
            };
            setErrors({});
            setServerError("");

            const response = await axios.post("http://localhost:3000/users/register", form);
            console.log(response.data);
            alert("Usuario creado correctamente 🎉");
            setForm(initialState);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
            setServerError(error.response.data.message);
            } else {
                setServerError("Ocurrió un error al enviar el formulario");
            }
        }
    }
    return (
        <main className={styles.registerContainer}>
            <h2>Register</h2>
            {serverError && <p className={styles.serverError}>{serverError}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Nombre</label>
                    <input type="text" name="name" onChange={handleChange} value={form.name}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label>E-mail</label>
                    <input type="text" name="email" onChange={handleChange} value={form.email}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label>Fecha de Nacimiento</label>
                    <input type="date" name="birthdate" onChange={handleChange} value={form.birthdate}/>
                    {errors.birthdate && <p>{errors.birthdate}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label>Nº DNI</label>
                    <input type="number" name="nDni" onChange={handleChange} value={form.nDni}/>
                    {errors.nDni && <p>{errors.nDni}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label>Nombre de Usuario</label>
                    <input type="text" name="username" onChange={handleChange} value={form.username}/>
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label>Contraseña</label>
                    <input type="password" name="password" onChange={handleChange} value={form.password}/>
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <button>ENVIAR</button>
            </form>
        </main>
    )
};

export default Register;
