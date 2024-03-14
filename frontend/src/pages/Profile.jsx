import React, { useEffect, useState } from "react";
import GenderCheckbox from "../components/GenderCheckbox";
import { Link } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { useAuthContext } from "../context/AuthContext";
import useUpdateUser from "../hooks/useUpdateUser";
import usedeleteUser from "../hooks/usedeleteUser";

export default function Profile() {
  const { authUser } = useAuthContext();
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, updateUser } = useUpdateUser();
  const {deleteUser} = usedeleteUser()

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  useEffect(() => {
    setInputs(authUser);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(inputs);
  };

  const handleDeleteUser = async () => {
    await deleteUser();
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        {inputs.username}'s <span className="text-blue-500"> Profile</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="label p-2">
            <span className="text-base label-text">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full input input-bordered  h-10"
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
          />
        </div>

        <div>
          <label className="label p-2 ">
            <span className="text-base label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="johndoe"
            className="w-full input input-bordered h-10"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full input input-bordered h-10"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-base label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full input input-bordered h-10"
            value={inputs.confirmPassword}
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
          />
        </div>

        <GenderCheckbox
          onCheckboxChange={handleCheckboxChange}
          selectedGender={inputs.gender}
        />

        <div>
          <button
            className="btn btn-block btn-sm mt-2 border border-slate-700"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Update"
            )}
          </button>
          <button
            type="button"
            onClick={handleDeleteUser}
            className="btn btn-block btn-sm mt-2 border border-slate-700"
          >
            Delete
          </button>
        </div>
      </form>
      <Link className="mt-2 " to={"/"}>
        <BiHome className="w-5 h-5 text-white cursor-pointer" />
      </Link>
    </div>
  );
}
