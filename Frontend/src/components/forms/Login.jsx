import axios from "axios";
import { useEffect,useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authcontext";
import { toast } from "react-toastify";
export default function Login(){
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");
    const{login}=useContext(AuthContext);
    const navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:3000/api/v1/login",{email,password});
            console.log("successful");
            login(res.data.token);
            
            navigate("/dashboard");
        }
        catch(error){
        toast.error("login failed");
        }
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80 space-y-4">
                <h2 className="text-red-500 text-sm"> login</h2>
                <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                required
                />
                <button
                type="submit" 
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );

};
