import { Link } from "react-router-dom";
import { BiFace, BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

export default function LogoutButton() {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto">
      {!loading ? (
        <div className="flex justify-between">
          <BiLogOut
            className="w-6 h-6 text-white cursor-pointer"
            onClick={logout}
          />
          <Link to={"/profile"}>
            <BiFace className="w-6 h-6 text-white cursor-pointer" />
          </Link>
        </div>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
}
