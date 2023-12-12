import { NavLink } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";
import "./Authentication.css"
import { useIconContext } from "../../contexts/IconContext";

export default function SignUp() {
    const { user, validate } = useAuthContext();
    const { GiInfinity } = useIconContext();

    return (<div className="parent-container">
        <div className="login-container">
            <GiInfinity className="logo" /><h2 className="brand-name">Infinity</h2>
            <input type="email" placeholder="Email..." onChange={(e) => validate(e.target.value, "Email")} />
            {user?.errors.errorEmail}
            <input type="text" placeholder="First name..." onChange={(e) => validate(e.target.value, "firstname")} />
            {user.errors.firstname}
            <input type="text" placeholder="Last name..." onChange={(e) => validate(e.target.value, "lastname")} />
            {user.errors.lastname}
            <input type="text" placeholder="Username..." onChange={(e) => validate(e.target.value, "username")} />
            {user.errors.username}
            <input type="password" placeholder="Password..." onChange={(e) => validate(e.target.value, "password")} />
            {user.errors.password}
            <input type="password" placeholder="Confirm password..." onChange={(e) => validate(e.target.value, "confirm_password")} />
            {user.errors.confirm_passowrd}
            <button onClick={() => validate("", "call")}>Sign Up</button>
            <NavLink className="url" to="/" >Aleady have an account? Login</NavLink>
            <p>Social Media React App</p>
        </div>
    </div>)
}