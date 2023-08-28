import {
  RiUserSettingsLine,
  RiShoppingBagLine,
  RiTwitterFill,
  RiPencilLine,
  RiGithubFill,
} from "react-icons/ri";
import { LuMapPin } from "react-icons/lu";

const UserCard = () => {
  return (
    <div>
      <div className="  pb-6 rounded-xl bg-white mt-10 mx-6 border flex flex-col  ">
        <section className="flex items-center">
          <div className="border rounded-full w-16 h-16 flex  mt-8 mb-4 ml-6 overflow-hidden">
            <img
              src="https://wasifkareem.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fphotodp.11553dd7.jpg&w=1920&q=75"
              alt=""
            />
          </div>
          <div className=" mx-4 mt-2">
            <h1 className=" text-xl font-semibold  ">Wasif Kareem</h1>
            <p className=" text-gray-400">43 friends</p>
          </div>
          <RiUserSettingsLine className=" ml-8 text-xl" />
        </section>
        <hr className="  w-5/6 flex ml-7  bg-gray-400 " />

        <section>
          <div className=" py-4 pl-10 text-gray-500 ">
            <p className=" flex flex-row gap-3 mb-2 items-center">
              <LuMapPin className=" text-3xl" />
              New Delhi,IN
            </p>
            <p className=" items-center  gap-3 flex flex-row">
              <RiShoppingBagLine className=" text-3xl" /> MERN Developer
            </p>
          </div>
        </section>
        <hr className="  w-5/6 flex ml-7  bg-gray-400 " />
        <section>
          <div className="flex flex-row justify-between   my-4 mx-8 text-sm">
            <p className=" text-gray-400">Who viewed your profile</p>
            <p className=" font-bold text-gray-800">12351</p>
          </div>
          <div className="flex flex-row justify-between   my-4 mx-8 text-sm">
            <p className=" text-gray-400">Impressions of your post</p>
            <p className=" font-bold text-gray-800">55555</p>
          </div>
        </section>
        <hr className="  w-5/6 flex  bg-gray-400 ml-7" />

        <section className=" text-gray-500 gap-2 flex flex-col">
          <div className=" font-bold p-2 ml-6 text-gray-600">
            Social Profiles
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row ml-8 items-center gap-3">
              <RiTwitterFill className=" text-3xl" />
              <div>
                <p className=" font-bold">Twitter</p>
                <p>Social Network</p>
              </div>
            </div>

            <RiPencilLine className=" mr-8 text-xl" />
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row ml-8 items-center gap-3">
              <RiGithubFill className=" text-3xl" />
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
