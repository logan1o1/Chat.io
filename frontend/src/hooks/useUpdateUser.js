import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();

    const updateUser = async ({ fullName, username, password, confirmPassword, gender }) => {

        setLoading(true)
        try {
            const resp = await fetch(`/api/users/update/${authUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            })
            const data = await resp.json();

            if (data.error) throw new Error(data.error);

            if (data.success === false) {
                toast.error(data.message)
            } else {
                localStorage.setItem("auth_user", JSON.stringify(data));
                setAuthUser(data);
                toast.success(`Your account has successfully been updated`);
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, updateUser };

}

export default useUpdateUser;
