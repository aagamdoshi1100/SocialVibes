import { Navigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function RequiresAuth({children}){
    const {user} =useAuthContext();
    return user.isLoggedIn ? children : <Navigate to="/" />
}