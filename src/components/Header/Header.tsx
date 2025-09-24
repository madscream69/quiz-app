import {NavLink} from "react-router-dom";
import styles from './Header.module.scss'

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>Quiz App</h1>
            <nav className={styles.menu}>
                <NavLink className={styles.menuLink} to={"/"}>Home</NavLink>
                <NavLink className={styles.menuLink} to={"/about"}>About</NavLink>
                <NavLink className={styles.menuLink} to={"/create_quiz"}>Create Quiz</NavLink>
            </nav>

        </header>
    );
}

export default Header;