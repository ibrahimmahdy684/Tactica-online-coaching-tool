import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authcontext";

export default function Navbar(){
    const{isLoggedIn,logout}=useContext(AuthContext);
    return(
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex gap-4">
       <Link to="/">Home</Link>
       {!isLoggedIn?(
        <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>
       ):(
        <>
        <Link to="/dashboard">Dashboard</Link>
        <button className="bg-gray-700 px-4 py-2 rounded" onClick={logout}>Logout</button>
        </>
       )}
      </div>
        </nav>
    );
}