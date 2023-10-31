import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className=" sm:flex sm:flex-col sm:items-center bg-gray-700 min-h-screen">
      <div className="  text-4xl border-solid border bg-white rounded-b-3xl h-20 sm:h-14 sm:text-2xl   w-full justify-center flex items-end pb-2    text-gray-600 border-gray-400 font-serif font-extrabold ">
        FabinaHut
      </div>
      <div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            location: "",
            occupation: "",
            email: "",
            password: "",
            picture: "",
          }}
          onSubmit={async (values) => {
            console.log(values);
            const formData = new FormData();
            for (let value in values) {
              formData.append(value, values[value]);
            }
            formData.append("picturePath", values.picture.name);
            console.log(formData);

            const savedUserResponse = await fetch(
              "https://fabinahut-server.onrender.com/auth/register",
              {
                method: "POST",
                body: formData,
              }
            );
            const savedUser = await savedUserResponse.json();
            if (savedUser._id) {
              navigate("/");
            }
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            location: Yup.string().required("Required"),
            occupation: Yup.string().required("Required"),
            email: Yup.string().email().required("Required"),
            password: Yup.string()
              .min(6, "min 6 characters required")
              .required("Required!"),
            picture: Yup.string().required(),
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
            setFieldValue,

            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="  flex flex-col  p-4 mt-24 mx-4  border-solid border pb-16 sm:pb-20  bg-white  sm:w-[400px] sm:p-7 ">
                <input
                  placeholder="First Name"
                  type="firstName"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  className=" w-full  sm:text-xl focus:outline-none  border-gray-300 border-solid p-4  sm:p-2  capitalize  border"
                />
                {errors.firstName && touched.firstName && (
                  <div className=" text-red-700 ">{errors.firstName}</div>
                )}
                <input
                  placeholder="Last Name"
                  type="lastName"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  className=" w-full border-gray-300 border-solid p-4 mt-4  capitalize focus:outline-none  sm:text-xl sm:p-2  border"
                />
                {errors.lastName && touched.lastName && (
                  <div className=" text-red-700 ">{errors.lastName}</div>
                )}
                <input
                  placeholder="Location"
                  type="location"
                  name="location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                  className=" w-full sm:text-xl sm:p-2 focus:outline-none  border-gray-300 border-solid p-4  mt-4  border"
                />
                {errors.location && touched.location && (
                  <div className=" text-red-700 ">{errors.location}</div>
                )}
                <input
                  placeholder="Occupation"
                  type="occupation"
                  name="occupation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.occupation}
                  className=" w-full sm:text-xl sm:p-2 focus:outline-none  border-gray-300 border-solid p-4 mt-4   border"
                />
                {errors.occupation && touched.occupation && (
                  <div className=" text-red-700 ">{errors.occupation}</div>
                )}

                <div className=" w-full border-gray-200  border p-4 py-8 mt-4  text-gray-400  ">
                  <div className=" w-full border-gray-600  sm:text-xl sm:p-2  cursor-pointer focus:outline-none p-4 border border-dashed  ">
                    <UploadComponent
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                </div>

                <input
                  placeholder="Enter your Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className=" w-full sm:text-xl sm:p-2 focus:outline-none   border-gray-300 border-solid p-4  mt-4  border"
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
                  className=" w-full sm:text-xl sm:p-2 focus:outline-none  border-gray-300 border-solid p-4  border  mt-4"
                />
                {errors.password && touched.password && (
                  <div className=" text-red-700 ">{errors.password}</div>
                )}
                <button
                  className=" border-4 border-b-gray-500 border-r-gray-500  bg-white mb-2 h-16  focus:outline-none  text-gray-600 border-gray-600  font-semibold text-xl mt-8"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <span
                  onClick={handleClick}
                  className=" text-gray-500 underline sm:text-base cursor-pointer "
                >
                  Already have an account&#63; Login here
                </span>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const UploadComponent = (props) => {
  const { setFieldValue, values } = props;
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setFieldValue("picture", acceptedFiles[0]);
    },
  });

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {!values.picture ? (
          <p>Add Profile Image</p>
        ) : (
          <div>{values.picture.name}</div>
        )}
      </div>
    </div>
  );
};

export default Register;
