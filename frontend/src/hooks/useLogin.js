import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from "react-hot-toast";


const useLogin = () => {
    const [loading, setloading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async (username, password) => {
        const success = inputErrorHandler(username, password)
        if (!success)  return;
        setloading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",  
                headers:{ "Content-Type": "application/json"},
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (data.success === false) {
                toast.error(data.message);
            }else{
                setAuthUser(data);
                localStorage.setItem("auth_user", JSON.stringify(data));
                toast.success(`Welcome ${username}`);
            }

        } catch (error) {
            toast.error(error.message);
        }finally{
            setloading(false);
        }
    }
    return  { loading , login };
}

export default useLogin;


function inputErrorHandler (username, password) {
    if (!username || !password) {
        toast.error( "Please fill all fields" );
        return false;
    }
    return true;
}