import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useLogout = () => {
    const [loading, setloading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setloading(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
            });
            const data = res.json();

            localStorage.removeItem('auth_user');
            setAuthUser(null);
            setloading(false);
            toast.success("You have been logged out successfully");

            if (loading) {
                toast.error("Logout unsuccessful")
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setloading(false);
        }
    }
    return { loading, logout };
}

export default useLogout
