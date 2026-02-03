import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import logo from "../../assets/Logo2.png";

function NavBar () {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
        const handleUserChange = () => {
            setUser(JSON.parse(localStorage.getItem("user")));
        };
        window.addEventListener("userChange", handleUserChange);
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <header className={styles.header}>
            <img src={logo} alt="Logo de la empresa Urban Shine" className={styles.logo} />
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link to='/appointments'>Mis Turnos</Link>
                            </li>
                            <li>
                                <button onClick={handleLogOut}>Cerrar Sesion</button>
                            </li>
                        </>
                    ): (
                        <>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                        </>
                    )}    
                </ul>
            </nav>
        </header>
    )
};

export default NavBar;
