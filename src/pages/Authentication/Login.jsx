import { NavLink } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";
import "./Authentication.css"
import { useIconContext } from "../../contexts/IconContext";

export default function Login() {
    const { user, setUser, loginHandler, validate } = useAuthContext();
    console.log("🚀 ~ file: Login.jsx:8 ~ Login ~ user:", user)
    const { GiInfinity } = useIconContext();
    const handleGuestLogin = () => {
        setUser({
            ...user,
            auth: { username: "AagamD", password: "AagamD@123" },
        })
    }
    if (user.auth.username === "AagamD" && user.auth.password === "AagamD@123") {
        loginHandler();
    }
    return (<div className="parent-container">
        <div className="login-container">
            <GiInfinity className="logo" />
            <h2 className="brand-name">Infinity</h2>
            <input type="text" placeholder="Username" onChange={(e) => validate(e.target.value, "username")} />
            {user.errors.username}
            <input type="password" placeholder="Password" onChange={(e) => validate(e.target.value, "password")} />
            {user.errors.password}
            <button onClick={() => validate("", "signInCall")}>Login</button>
            <button onClick={handleGuestLogin} >Login as a guest</button>
            <NavLink className="url" to="/pages/Authentication/SignUp">Don't have an account? Sign up</NavLink>
            <p>Social Media React App</p>
        </div>
    </div>)
}