import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const usedeleteUser = () => {
    const { authUser } = useAuthContext();
    const navigate = useNavigate()

    const deleteUser = async () => {
        try {
            const res = await fetch(`/api/users/delete/${authUser._id}`, {
                method: "DELETE",
            });
            if (res.ok) localStorage.removeItem("auth_user");
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        }
    }
    return {deleteUser};
}

export default usedeleteUser;
