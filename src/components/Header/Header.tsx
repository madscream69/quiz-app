import {NavLink} from "react-router-dom";


function Header() {
    return (
        <header>
            <h1>Header</h1>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/about"}>About</NavLink>
            <NavLink to={"/create_quiz"}>Create Quiz</NavLink>
        </header>
    );
}

export default Header;