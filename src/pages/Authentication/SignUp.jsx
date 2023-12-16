import { NavLink } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";
import "./Authentication.css";

export default function SignUp() {
  const { user, validate } = useAuthContext();

  return (
    <div className="parent-container">
      <div className="login-container">
        <img src="../../../logo192.png" height="100px" />
        <h2 className="brand-name">SocialVibes</h2>
        <input
          type="email"
          placeholder="Email..."
          onChange={(e) => validate(e.target.value, "email")}
        />
        {user.errors.email}
        <input
          type="text"
          placeholder="First name..."
          onChange={(e) => validate(e.target.value, "firstname")}
        />
        {user.errors.firstname}
        <input
          type="text"
          placeholder="Last name..."
          onChange={(e) => validate(e.target.value, "lastname")}
        />
        {user.errors.lastname}
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => validate(e.target.value, "username")}
        />
        {user.errors.username}
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => validate(e.target.value, "password")}
        />
        {user.errors.password}
        <input
          type="password"
          placeholder="Confirm password..."
          onChange={(e) => validate(e.target.value, "confirm_password")}
        />
        {user.errors.confirm_passowrd}
        <button onClick={() => validate("", "call")}>Sign Up</button>
        <NavLink className="url" to="/">
          Aleady have an account? Login
        </NavLink>
        {user.errors.message !== "" ? <p>{user.errors.message}</p> : ""}
      </div>
    </div>
  );
}
