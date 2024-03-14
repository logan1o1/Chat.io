import { Link } from "react-router-dom";
import { BiFace, BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";

export default function LogoutButton() {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();

  return (
    <div className="mt-auto">
      {!loading ? (
        <div className="flex justify-between">
          <BiLogOut
            className="w-6 h-6 text-white cursor-pointer hover:text-blue-500"
            onClick={logout}
          />
          <Link to={`/profile/${authUser._id}`}> 
            <BiFace className="w-6 h-6 text-white cursor-pointer hover:text-blue-500" />
          </Link>
        </div>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
}
