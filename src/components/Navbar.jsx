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

  return (
    <div className="border-solid border bg-white rounded-b-3xl flex">
      <div className="  text-3xl  h-20   w-full  items-center flex pl-6 pb-1    text-gray-600 border-gray-400 font-serif font-extrabold ">
        FabinaHut
        <select
          onChange={handleChange}
          className="  rounded  text-sm font-sans font-medium ml-8 h-10 p-1 bg-gray-700 text-white"
        >
          <option selected disabled>
            {username}
          </option>
          <option value="logout">logout</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
