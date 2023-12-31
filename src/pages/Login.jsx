import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import icon from "../assets/icon.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate("/register");
  };
  return (
    <div className=" flex flex-col  items-center bg-gray-700 min-h-screen  ">
      <div className="  text-4xl border-solid border bg-white rounded-b-3xl h-20   w-full justify-center flex items-end pb-2    text-gray-600 border-gray-400 font-serif font-extrabold sm:text-2xl sm:h-14 ">
        FabinaHut
      </div>
      <div className=" sm:flex sm:gap-40 items-center justify-center">
        <div>
          <img className=" hidden mt-12 lg:block h-[500px]" src={icon} alt="" />
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            const loginUserResponse = await fetch(
              "https://fabinahut.onrender.com/auth/login",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify(values),
              }
            );

            const loggedinUser = await loginUserResponse.json();
            dispatch(loginSuccess(loggedinUser));
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Required"),
            password: Yup.string().required("Required!"),
          })}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="  flex flex-col justify-center   p-4 sm:p-7 mt-24 mx-4  border-solid border   h-80  bg-white sm:w-[400px] ">
                <input
                  placeholder="Enter your Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className=" sm:text-xl w-full border-gray-300 border-solid p-4 sm:p-2 focus:outline-none border"
                />
                {errors.email && touched.email && (
                  <div className=" text-red-700 ">{errors.email}</div>
                )}
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className=" w-full border-gray-300 border-solid p-4  border focus:outline-none sm:p-2  mt-4 sm:text-xl"
                />
                {errors.password && touched.password && (
                  <div className=" text-red-700 ">{errors.password}</div>
                )}
                {/* <p className=" text-red-600">{alert}</p> */}
                <button
                  className="  sm:mt-10  bg-white mb-2 border-4 border-b-gray-500 border-r-gray-500 h-16  focus:outline-none  text-gray-600  border-gray-600 font-semibold text-xl mt-8"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>

                <span
                  onClick={handleClick}
                  className=" text-gray-500 underline sm:text-base cursor-pointer"
                >
                  Don&#39;t have an account&#63; Sign Up here
                </span>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
