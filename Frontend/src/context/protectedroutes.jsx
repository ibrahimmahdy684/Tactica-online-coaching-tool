import { useContext } from "react";
import { AuthContext } from "./authcontext";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children}){
    const{isLoggedIn}=useContext(AuthContext);

    if(!isLoggedIn)
       return <Navigate to="/login" replace/>

    return children;
};