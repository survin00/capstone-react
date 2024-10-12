import { Navigate } from "react-router";

const LogOut=()=>{
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
    return <Navigate to="/"/> 
}

export default LogOut;