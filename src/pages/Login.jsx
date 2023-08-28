import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };
  return (
    <div className=" bg-gray-100 min-h-screen">
      <div className="  text-4xl border-solid border bg-white rounded-b-3xl h-20   w-full justify-center flex items-end pb-2    text-gray-600 border-gray-400 font-serif font-extrabold ">
        FabinaHut
      </div>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            const loginUserResponse = await fetch(
              "http://localhost:3001/auth/login",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify(values),
              }
            );
            const loggedinUser = loginUserResponse.json();
            if (loggedinUser) {
              navigate("/homepage");
            }
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
              <div className="  flex flex-col  p-4 mt-24 mx-4  border-solid border   h-80 bg-white ">
                <input
                  placeholder="Enter your Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className=" w-full border-gray-300 border-solid p-4    border"
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
                  className=" w-full border-gray-300 border-solid p-4  border  mt-4"
                />
                {errors.password && touched.password && (
                  <div className=" text-red-700 ">{errors.password}</div>
                )}
                <button
                  className="  bg-gray-600 mb-2 rounded-md h-16   text-white font-semibold text-xl mt-8"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>

                <span
                  onClick={handleClick}
                  className=" text-gray-400 underline"
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
