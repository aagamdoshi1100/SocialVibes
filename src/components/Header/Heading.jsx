import "./Header.css"
import useAuthContext from "../../contexts/AuthContext"
import { useIconContext } from "../../contexts/IconContext";
export default function Heading() {
    const { loginHandler, user } = useAuthContext();
    const { BiLogIn } = useIconContext()
    return (<div className="header">
        <h2>INFINITY</h2>
        <div className="login">
            {user.name === "" ? <BiLogIn onClick={() => loginHandler("AagamD", "AagamD@123")} size="1.8em" /> : <p className="login-username">{`Welcome, ${user.name}`}</p>
            }
        </div>
    </div>)
} 