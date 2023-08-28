import React from "react";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";

const Homepage = () => {
  return (
    <div className=" bg-gray-100 min-h-screen">
      <Navbar />
      <UserCard />
    </div>
  );
};

export default Homepage;
