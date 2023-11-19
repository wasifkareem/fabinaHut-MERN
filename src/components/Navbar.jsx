import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch(logout());
  };

  const username = useSelector(
    (state) => state.user.currentUser.user.firstName
  );
  const pic = useSelector((state) => state.user.currentUser.user.picturePath);

  return (
    <>
      <div className=" fixed w-full top-0 border-solid border bg-white rounded-b-3xl flex  ">
        <div className="  text-xl  h-14   w-full  items-center flex pl-6 pb-1  text-gray-600 border-gray-400 font-serif font-extrabold ">
          FabinaHut
          <select
            value="username"
            onChange={handleChange}
            className="  rounded  text-sm sm:text-xl font-sans font-medium ml-24 sm:ml-5 sm:h-10 h-10 p-1 bg-gray-700 text-white"
          >
            <option value="username" disabled>
              {username}
            </option>
            <option value="logout">logout</option>
          </select>
          <img
            className=" h-10 w-10 sm:h-10  sm:w-10 sm:ml-[1px] rounded border-4 object-cover sm:border-[3px] border-gray-700"
            src={`https://fabinahut.onrender.com/assets/${pic}`}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
