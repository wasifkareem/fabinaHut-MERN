import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import { useSelector } from "react-redux";
import { BiImageAlt } from "react-icons/bi";
import { CgAttachment } from "react-icons/cg";
import Posts from "../components/Posts";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const Homepage = () => {
  const inputRef = useRef(null);
  const [fieldValue, setFieldValue] = useState(null);
  const [refresh, setRefresh] = useState("");
  const [error, setError] = useState(null);
  const [imageBox, setImageBox] = useState(0);

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
      .post("https://fabinahut.onrender.com/posts", formData)
      .then((response) => {
        setRefresh(response.data);
        setFieldValue(null);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
    inputRef.current.value = "";
  };

  const disabledClick = () => {
    setError("Add  image & Caption first!");
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const imgClick = () => {
    setImageBox(1);
  };
  const hideClick = () => {
    setImageBox(0);
  };

  return (
    <div className="bg-slate-700 min-h-screen pt-20 ">
      <Navbar />
      <div className=" sm:flex ">
        <div className=" sm:w-1/3 sm:fixed sm:mt-1  ">
          <UserCard />
        </div>

        <div className=" sm:flex sm:flex-col sm:max-w-[650px] sm:ml-[440px] sm:mt-1 ">
          <section className="    rounded-md bg-white mt-10 sm:mt-2 mx-6 border flex flex-col  ">
            <div className="flex items-center">
              <img
                className="border object-cover object-center rounded-full w-16 h-16 flex  mt-8 sm:mt-6 sm:mb-1 mb-4 ml-6 sm:w-14 sm:h-14 "
                src={`https://fabinahut.onrender.com/assets/${picturePath}`}
                alt=" DP"
              />
              <input
                ref={inputRef}
                placeholder="What's on your mind..."
                className="  focus:outline-none text-gray-600  border-none pl-5 border focus:shadow-sm rounded-full w-48 bg-gray-200 h-16  sm:h-11 sm:ml-4 flex  sm:mb-1 mt-8 sm:mt-4 mb-4 ml-2 sm:w-3/4 sm:text-md "
              ></input>
            </div>
            <p className=" flex-none sm:flex animate-bounce  text-red-900  sm:text-sm p-2 sm:justify-center rounded-lg px-5 font-semibold mt-2">
              {error}
            </p>
            {!imageBox ? (
              <div className="flex justify-between sm:pl-3 pl-2 mt-5 sm:mt-0 items-center py-4 sm:py-2 sm:mb-3">
                <div className="flex ">
                  <button
                    onClick={imgClick}
                    className="flex justify-center  sm:text-md  text-gray-500 items-center p-2"
                  >
                    <BiImageAlt className=" sm:text-xl text-xl mr-1 " /> Image
                  </button>
                  <button className="flex justify-center  sm:text-md  text-gray-500 items-center p-2 ml-0 sm:ml-2">
                    <CgAttachment className=" sm:text-xl text-xl mr-1 " /> Files
                  </button>
                </div>

                {!fieldValue ? (
                  <button
                    onClick={disabledClick}
                    className=" bg-gray-300  focus:outline-none cursor-not-allowed font-semibold sm:p-2 sm:px-4 sm:text-md text-white p-2 px-3  rounded-3xl mr-3"
                  >
                    Post
                  </button>
                ) : (
                  <button
                    onClick={handleClick}
                    className=" bg-gray-800 hover:shadow-lg font-semibold sm:p-2 sm:px-4 sm:text-md text-white p-2 px-3  rounded-3xl"
                  >
                    Post
                  </button>
                )}
              </div>
            ) : (
              <div>
                <div className="w-4/5 sm:w-3/4 ml-8 rounded-lg border-gray-400  border p-4  mt-4  text-gray-400 sm:flex sm:justify-center sm:text-xl sm:mt-0 sm:mb-5 cursor-pointer sm:ml-24 sm:h-26  h-24 text-md ">
                  <section className=" w-full h-full border-gray-500 flex justify-center align-middle items-center border border-dashed text-center">
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      {!fieldValue ? (
                        <p>Drop a beautiful pic</p>
                      ) : (
                        <p>{fieldValue.name}</p>
                      )}
                    </div>
                  </section>
                </div>
                <div className="flex justify-between px-6 mt-5 items-center py-4 sm:py-0 sm:mt-2 sm:mb-5">
                  <div className="flex ">
                    <button
                      onClick={hideClick}
                      className="flex justify-center  sm:text-md  text-gray-500 items-center p-2"
                    >
                      <BiImageAlt className=" sm:text-xl text-xl mr-1 " /> Image
                    </button>
                  </div>

                  {!fieldValue ? (
                    <button
                      onClick={disabledClick}
                      className=" bg-gray-300  focus:outline-none cursor-not-allowed font-semibold sm:p-2 sm:px-4 sm:text-md text-white p-2 px-3  rounded-3xl mr-3 sm:mr-1"
                    >
                      Post
                    </button>
                  ) : (
                    <button
                      onClick={handleClick}
                      className=" bg-gray-800 hover:shadow-lg font-semibold sm:p-2 sm:px-4 sm:text-md text-white p-2 px-3  rounded-3xl"
                    >
                      Post
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>

          <Posts refresh={refresh} />
        </div>
        <div className=" sm:fixed hidden lg:block right-0 bg-yellow-100 p-3  max-h-[500px] w-[250px] mt-[13px] mr-5 rounded-md ">
          <section className="  mb-2 items-center flex justify-between mx-3 ">
            <p className="   font-semibold text-base text-gray-400">
              Sponsored
            </p>
            <p className=" font-bold text-base  pl-3 rounded-md">Create Ad</p>
          </section>
          <section>
            <img
              className=" rounded-lg shadow-md "
              src="https://wasifkareem.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprojectpic.7a3306a9.png&w=1920&q=75"
              alt="Fabina"
            />
          </section>
          <section className="flex py-3 px-1 justify-between">
            <a
              className=" animate-bounce font-medium text-sm text-red-500 underline"
              href="https://fabinatextiles.netlify.app/"
              target="_blank"
            >
              Fabinatextlies.com
            </a>
          </section>
          <section>
            <p className=" text-sm italic  text-gray-600">
              Fabina Textiles - Where tradition meets modernity in every thread
              of our exceptional sarees. Embrace the charm of our handcrafted
              creations
            </p>
          </section>
        </div>
        <p className="  text-white bg-black sm:font-semibold sm:text-center sm:h-5 sm:bottom-0  sm:w-full  sm:fixed sm:tracking-widest ">
          This MERN app is developed By{" "}
          <a
            href="https://twitter.com/Wasif83794508"
            target="_blank"
            className=" underline "
          >
            Wasif
          </a>
        </p>
      </div>
    </div>
  );
};

export default Homepage;
