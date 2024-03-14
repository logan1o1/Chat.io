import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setloading] = useState(false);
    const {setAuthUser} = useAuthContext()

    const signup = async ({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender})
        if (!success) return;
        setloading(true);
        try {
            const res = await fetch ("/api/auth/signup", {
                method: "POST",  
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })

            const data = await res.json(); 

            if (data.error) throw new Error(data.error);

            if (!data) {
                toast.error("An error occurred while signing up");
            }else{
                localStorage.setItem("auth_user", JSON.stringify(data));
                setAuthUser(data);
                toast.success(`Account created successfully! Welcome ${username}`);
            } 
        } catch (error) {
            toast.error(error.message)
        }finally{
            setloading(false)
        }
    }

    return {loading, signup};
}

export default useSignup;


async function handleInputErrors({fullName, username, password, confirmPassword, gender}) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields")
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 5) {
        toast.error("Passwords must be atleast 5 charecters");
        return false;
    }

    return true;
}
