import { useContext } from "react";
import { AuthContext } from "./authcontext";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/layout/LoadingSpinner";
export default function ProtectedRoute({children}){
    const{isLoggedIn,loading}=useContext(AuthContext);
    if(loading)
        return <div><LoadingSpinner/></div>
    if(!isLoggedIn){
       
       return <Navigate to="/login" replace/>
    }

    return children;
};