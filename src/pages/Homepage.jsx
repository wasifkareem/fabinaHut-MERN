import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import { useSelector } from "react-redux";
import { BiImageAlt } from "react-icons/bi";
import Posts from "../components/Posts";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const Homepage = () => {
  const inputRef = useRef();
  // const [caption, setCaption] = useState("");
  const [fieldValue, setFieldValue] = useState(null);
  const [refresh, setRefresh] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },

    onDrop: (acceptedFiles) => {
      setFieldValue(acceptedFiles[0]);
    },
  });
  const picturePath = useSelector(
    (state) => state.user.currentUser.user.picturePath
  );
  const userId = useSelector((state) => state.user.currentUser.user._id);

  const handleClick = () => {
    const caption = inputRef.current.value;

    const formData = new FormData();
    for (let value in fieldValue) {
      formData.append(value, fieldValue[value]);
    }
    formData.append("picturePath", fieldValue.name);
    formData.append("description", caption);
    formData.append("userId", userId);
    formData.append("picture", fieldValue);

    axios
      .post(" http://localhost:3001/posts", formData)
      .then((response) => {
        setRefresh(response.data);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div className=" bg-slate-700 min-h-screen">
      <Navbar />
      <UserCard />
      <section className="    rounded-md bg-white mt-10 mx-6 border flex flex-col ">
        <div className="flex flex-row">
          <img
            className="border object-cover object-center rounded-full w-16 h-16 flex  mt-8 mb-4 ml-6"
            src={`http://localhost:3001/assets/${picturePath}`}
            alt=" DP"
          />
          <input
            ref={inputRef}
            placeholder="What's on your mind"
            className=" focus:outline-none text-gray-600  border-none pl-7 border rounded-full w-48 bg-gray-100 h-16 flex  mt-8 mb-4 ml-6 "
          ></input>
        </div>
        <div className="  w-4/5 ml-8 border-gray-700  border p-4  mt-4  text-gray-400 ">
          <section className=" w-full border-gray-600  focus:outline-none  border border-dashed  ">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here</p>
            </div>
          </section>
        </div>
        <hr />
        <div className="flex justify-between px-6 items-center py-4">
          <button className="flex justify-center  text-gray-600 items-center p-2">
            <BiImageAlt className=" text-xl mr-1" /> Image
          </button>
          <button
            onClick={handleClick}
            className=" bg-gray-600 font-semibold text-white p-2 px-3  rounded-3xl"
          >
            Post
          </button>
        </div>
      </section>
      <Posts refresh={refresh} />
    </div>
  );
};

// const input = ({ caption, setCaption }) => {
//   return <input value={caption} onChange={(e) => setCaption(e.target.value)} />;
// };

export default Homepage;
