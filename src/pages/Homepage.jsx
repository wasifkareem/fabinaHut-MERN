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
      .post("https://fabinahut-backend-wasifkareem.vercel.app/posts", formData)
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

        <div className=" sm:flex sm:flex-col sm:max-w-4xl sm:ml-[700px] sm:mt-1 ">
          <section className="    rounded-md bg-white mt-10 mx-6 border flex flex-col  ">
            <div className="flex items-center">
              <img
                className="border object-cover object-center rounded-full w-16 h-16 flex  mt-8 mb-4 ml-6 sm:w-24 sm:h-24 sm:"
                src={`https://fabinahut-backend-wasifkareem.vercel.app/assets/${picturePath}`}
                alt=" DP"
              />
              <input
                ref={inputRef}
                placeholder="What's on your mind..."
                className=" capitalize focus:outline-none text-gray-600  border-none pl-5 border focus:shadow-sm rounded-full w-48 bg-gray-200 h-16 flex  mt-8 mb-4 ml-6 sm:w-3/4 sm:text-2xl "
              ></input>
            </div>
            <p className=" flex-none sm:flex animate-bounce  text-red-900  sm:text-xl p-2 sm:justify-center rounded-lg px-5 font-semibold mt-2">
              {error}
            </p>
            {!imageBox ? (
              <div className="flex justify-between sm:pl-6 pl-2 mt-5 items-center py-4">
                <div className="flex ">
                  <button
                    onClick={imgClick}
                    className="flex justify-center  sm:text-2xl  text-gray-500 items-center p-2"
                  >
                    <BiImageAlt className=" sm:text-3xl text-xl mr-1 " /> Image
                  </button>
                  <button className="flex justify-center  sm:text-2xl  text-gray-500 items-center p-2 ml-5">
                    <CgAttachment className=" sm:text-3xl text-xl mr-1 " />{" "}
                    Attachment
                  </button>
                </div>

                {!fieldValue ? (
                  <button
                    onClick={disabledClick}
                    className=" bg-gray-300  focus:outline-none cursor-not-allowed font-semibold sm:p-4 sm:px-6 sm:text-xl text-white p-2 px-3  rounded-3xl mr-3"
                  >
                    Post
                  </button>
                ) : (
                  <button
                    onClick={handleClick}
                    className=" bg-gray-800 hover:shadow-lg font-semibold sm:p-4 sm:px-6 sm:text-xl text-white p-2 px-3  rounded-3xl"
                  >
                    Post
                  </button>
                )}
              </div>
            ) : (
              <div>
                <div className="w-4/5 ml-8 rounded-lg border-gray-400  border p-4  mt-4  text-gray-400 sm:flex sm:justify-center sm:text-3xl cursor-pointer sm:ml-24 sm:h-32 h-24 text-md ">
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
                <div className="flex justify-between px-6 mt-5 items-center py-4">
                  <div className="flex ">
                    <button
                      onClick={hideClick}
                      className="flex justify-center  sm:text-2xl  text-gray-600 items-center p-2"
                    >
                      <BiImageAlt className=" sm:text-3xl text-xl mr-1 " />{" "}
                      Image
                    </button>
                    <button className="flex justify-center  sm:text-2xl  text-gray-600 items-center p-2">
                      <CgAttachment className=" sm:text-3xl text-xl mr-1 " />{" "}
                      Attachment
                    </button>
                  </div>
                  {!fieldValue ? (
                    <button
                      onClick={disabledClick}
                      className=" bg-gray-300  focus:outline-none cursor-not-allowed font-semibold sm:p-4 sm:px-6 sm:text-xl text-white p-2 px-3  rounded-3xl"
                    >
                      Post
                    </button>
                  ) : (
                    <button
                      onClick={handleClick}
                      className=" bg-gray-800 hover:shadow-lg font-semibold sm:p-4 sm:px-6 sm:text-xl text-white p-2 px-3  rounded-3xl"
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
        <div className=" sm:fixed hidden lg:block right-0 bg-yellow-100 p-3  max-h-[500px] w-[400px] mt-[45px] mr-5 rounded-md ">
          <section className=" items-center flex justify-between mx-3 my-3">
            <p className="   font-semibold text-xl text-gray-400">Sponsored</p>
            <p className=" font-bold text-xl  p-1 px-3 rounded-md">Create Ad</p>
          </section>
          <section>
            <img
              className=" rounded-lg shadow-md "
              src="https://wasifkareem.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprojectpic.7a3306a9.png&w=1920&q=75"
              alt="Fabina"
            />
          </section>
          <section className="flex py-3 px-1 justify-between">
            <p className=" text-xl font-medium ">Fabina Sarees</p>
            <a
              className=" font-medium text-xl text-red-500 underline"
              href="https://fabinatextiles.netlify.app/"
              target="_blank"
            >
              Fabinatextlies.com
            </a>
          </section>
          <section>
            <p className=" text-xl  text-gray-600">
              Fabina Textiles - Where tradition meets modernity in every thread
              of our exceptional sarees. Embrace the charm of our handcrafted
              creations
            </p>
          </section>
        </div>
        <p className="  text-white bg-black sm:font-bold sm:text-center sm:h-8 sm:bottom-0 sm:w-full  sm:fixed sm:tracking-widest ">
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
