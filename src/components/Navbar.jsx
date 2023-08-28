import React from "react";

const Navbar = () => {
  return (
    <div className="border-solid border bg-white rounded-b-3xl flex">
      <div className="  text-3xl  h-20   w-full  items-center flex pl-6 pb-1    text-gray-600 border-gray-400 font-serif font-extrabold ">
        FabinaHut
        <select
          className="  rounded  text-sm font-sans font-medium ml-8 h-10 p-1 bg-gray-700 text-white"
          name=""
          id=""
        >
          <option disabled className=" " value="">
            Username
          </option>
          <option value="">Logout</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
