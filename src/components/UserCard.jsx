import {
  RiUserSettingsLine,
  RiShoppingBagLine,
  RiTwitterFill,
  RiPencilLine,
  RiGithubFill,
} from "react-icons/ri";
import { LuMapPin } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UserCard = () => {
  const firstName = useSelector(
    (state) => state.user.currentUser.user.firstName
  );
  const lastName = useSelector((state) => state.user.currentUser.user.lastName);
  const location = useSelector((state) => state.user.currentUser.user.location);
  const occupation = useSelector(
    (state) => state.user.currentUser.user.occupation
  );
  const picturePath = useSelector(
    (state) => state.user.currentUser.user.picturePath
  );

  return (
    <div>
      <div className="  pb-6  sm:text-sm rounded-md bg-white mt-2  ml-6 sm:ml-4 sm:mr-0 mr-6 border flex flex-col  ">
        <section className="flex items-center">
          {
            <img
              className="border object-cover object-center rounded-full w-14 h-14 flex  mt-8 mb-4 sm:mb-2  sm:mt-4 ml-6"
              src={`https://fabinahut.onrender.com/assets/${picturePath}`}
              alt="dp"
            />
          }
          <div className=" mx-4 mt-2">
            <h1 className=" font-sans text-xl sm:text-xl font-semibold ">
              {firstName} {lastName}
            </h1>
            <p className=" text-gray-400">43 friends</p>
          </div>
          <RiUserSettingsLine className=" ml-8 text-xl sm:text-2xl text-gray-600 sm:ml-28" />
        </section>
        <hr className="  w-5/6 flex ml-7  bg-gray-400 " />

        <section>
          <div className=" py-2 pl-10 text-gray-500 ">
            <p className=" flex flex-row gap-3 mb-2 items-center">
              <LuMapPin className=" text-3xl sm:text-xl" />
              {location}
            </p>
            <p className=" items-center  gap-3 flex flex-row">
              <RiShoppingBagLine className=" text-3xl sm:text-xl" />{" "}
              {occupation}
            </p>
          </div>
        </section>
        <hr className="  w-5/6 flex ml-7  bg-gray-400 " />
        <section>
          <div className="flex flex-row justify-between  sm:text-md  my-2 mx-8 text-sm">
            <p className=" text-gray-400">Who viewed your profile</p>
            <p className=" font-bold text-gray-800">12351</p>
          </div>
          <div className=" sm:text-md flex flex-row justify-between   my-2 mx-8 text-sm">
            <p className=" text-gray-400">Impressions of your post</p>
            <p className=" font-bold text-gray-800">55555</p>
          </div>
        </section>
        <hr className="  w-5/6 flex  bg-gray-400 ml-7" />

        <section className=" text-gray-500 gap-2 sm:gap-1 flex flex-col">
          <div className=" font-bold p-2 ml-6 text-gray-600">
            Social Profiles
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row ml-8 items-center gap-3">
              <RiTwitterFill className=" text-2xl" />
              <div>
                <p className=" font-bold">Twitter</p>
                <p>Social Network</p>
              </div>
            </div>

            <RiPencilLine className=" mr-8 text-xl" />
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row ml-8 items-center gap-3">
              <RiGithubFill className=" text-2xl" />
              <div>
                <p className=" font-bold">Github</p>
                <p>Developer platform</p>
              </div>
            </div>

            <RiPencilLine className=" mr-8 text-xl" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserCard;
