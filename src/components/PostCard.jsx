import { MdPersonAddAlt } from "react-icons/md";
import { BiShareAlt, BiCommentDetail } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";

const PostCard = ({ item }) => {
  const token = useSelector((state) => state.user.currentUser.token);

  const handleClick = () => {
    const postData = {
      userid: item.userId,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .patch(
        `https://fabinahut-server.onrender.com/posts/${item._id}/like`,
        JSON.stringify({ postData }),
        {
          headers,
        }
      )
      .then((response) => {
        console.log("Post created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div className="  pb-6 px-5  rounded-md bg-white mt-10 mx-6 border flex flex-col   ">
      <section className="flex items-center pt-7 sm:pt-4 sm:mb-0 mb-3">
        <div>
          {
            <img
              className="border rounded-full  h-16 w-16 sm:h-14 sm:w-14 object-cover "
              src={`https://fabinahut-server.onrender.com/assets/${item.userPicturePath}`}
              alt="dp"
            />
          }
        </div>
        <div className=" flex gap-12 sm:gap-[350px] items-center sm:mb-2 ">
          <div className=" ml-4 mt-2">
            <h1 className=" text-base sm:text-base  text-gray-700  font-semibold  ">
              {item.firstName} {item.lastName}
            </h1>
            <p className=" text-sm text-gray-400">{item.location}</p>
          </div>
          <div>
            <MdPersonAddAlt className="  text-cyan-700 flex justify-end bg-cyan-100 rounded-full p-2 w-9 h-9  sm:w-8 sm:h-8" />
          </div>
        </div>
      </section>
      <p
        className=" text-sm sm:text-base sm:mb-0  sm:mt-6
        font-sans text-gray-600 mt-2"
      >
        {item.description}
      </p>
      <img
        className=" rounded-lg mt-2 sm:max-h-[90vh] sm:object-cover shadow-gray-950 shadow-sm"
        src={`https://fabinahut-server.onrender.com/assets/${item.picturePath}`}
        alt=""
      />
      <section className=" flex  text-gray-600 justify-between text-2xl mx-2 mt-4 ">
        <div className="flex items-center ">
          <AiFillHeart
            onClick={handleClick}
            className="  text-red-600 sm:text-xl"
          />
          <p className=" ml-2  text-sm  mr-6 sm:text-xs">4</p>
          <BiCommentDetail className=" sm:text-xl" />{" "}
          <p className=" ml-2 text-sm sm:text-xs">7</p>
        </div>
        <div>
          <BiShareAlt className=" sm:text-xl" />
        </div>
      </section>
    </div>
  );
};

export default PostCard;
