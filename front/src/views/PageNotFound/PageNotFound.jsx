import { Link, useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.css";
import { useEffect } from "react";

function PageNotFound() {
    const navigate = useNavigate();

    useEffect(() => {
    const timer = setTimeout(() => {
        navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <div className={styles.notFoundContainer}>
        <h1>404</h1>
        <p>Página no encontrada</p>
        <Link to="/" className={styles.backHome}>
            Volver al inicio
        </Link>
        </div>
    );
}

export default PageNotFound;