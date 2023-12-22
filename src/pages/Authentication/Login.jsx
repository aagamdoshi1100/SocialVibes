import { NavLink } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";
import "./Authentication.css";

export default function Login() {
  const { user, setUser, loginHandler, validate } = useAuthContext();
  console.log("🚀 ~ file: Login.jsx:8 ~ Login ~ user:", user);

  const handleGuestLogin = () => {
    setUser({
      ...user,
      auth: { username: "AagamD", password: "AagamD@123" },
    });
  };
  if (user.auth.username === "AagamD" && user.auth.password === "AagamD@123") {
    loginHandler();
  }
  return (
    <div className="parent-container">
      <div className="login-container">
        <img src="../../../logo192.png" height="100px" />
        <h2 className="brand-name">SocialVibes</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setUser({
              ...user,
              auth: { ...user.auth, username: e.target.value },
            })
          }
        />
        {user.errors.username}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setUser({
              ...user,
              errors: { ...user.errors, password: "" },
              auth: { ...user.auth, password: e.target.value },
            })
          }
        />
        {user.errors.password}
        <button onClick={() => validate("", "signInCall")}>Login</button>
        <button onClick={handleGuestLogin}>Login as a guest</button>
        <NavLink className="url" to="/pages/Authentication/SignUp">
          Don't have an account? Sign up
        </NavLink>
        {user.errors.message !== "" ? <p>{user.errors.message}</p> : ""}
      </div>
    </div>
  );
}
