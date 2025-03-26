import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { userRegister } from "../../services/userAPI"; // Import userRegister
import { toast } from "react-toastify";

// Interface for form initial values
interface initialValuesInterface {
  name: string;
  email: string;
  profile: File | null;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(4, "Name must be at least 4 characters long"),
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
    profile: yup
      .mixed()
      .required("Image is required")
      .test(
        "fileType",
        "Only image files are allowed (jpeg, png, jpg)",
        (value: any) => {
          if (!value) return false;
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
          return allowedTypes.includes(value.type);
        }
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number"),
  });

  const initialValues: initialValuesInterface = {
    name: "",
    email: "",
    profile: null,
    password: "",
  };

  const handleSubmit = async (values: initialValuesInterface) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (values.profile) formData.append("profile", values.profile);

  
    
    // Log form data before sending
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    try {
      const response = await userRegister(formData);
      toast.success("registered successfully", { autoClose: 2000 });
      navigate("/"); 
    } catch (error: any) {
      console.error("Registration failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, { autoClose: 2000 });
        setMessage(error.response.data.message); // Show error message from backend
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#32c2ff] to-white">
      <div className="bg-white w-full sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 p-6 rounded-lg shadow-md">
        <div>
          <h1 className="font-semibold text-2xl text-center">
            CREATE AN ACCOUNT
          </h1>
        </div>
        <div className="mt-7">
          <p className="text-red-600 text-center">{message}</p>
        </div>
        <div className="2xl:mt-16">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => ( 
            <Form>
                {/* Name field */}
                <div className="mt-5">
                  <Field
                    name="name"
                    type="text"
                    className="border-b-2 h-10 w-full focus:outline-none focus:border-[#2bbedf]"
                    placeholder="Username"
                  />
                  <ErrorMessage
                    name="name"
                    component="small"
                    className="text-red-600"
                  />
                </div>

                {/* Email field */}
                <div className="mt-5">
                  <Field
                    name="email"
                    type="email"
                    className="border-b-2 h-10 w-full focus:outline-none focus:border-[#2bbedf]"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="small"
                    className="text-red-600"
                  />
                </div>

                {/* File input for profile image */}
                <div className="mt-5">
                  <input
                    type="file"
                    name="profile"
                    className="border-b-2 h-10 w-full focus:outline-none focus:border-[#2bbedf]"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;
                     
                      setFieldValue("profile", file);
                    }}
                  />
                  <ErrorMessage
                    name="profile"
                    component="small"
                    className="text-red-600"
                  />
                </div>

                {/* Password field */}
                <div className="mt-5">
                  <Field
                    name="password"
                    type="password"
                    className="border-b-2 h-10 w-full focus:outline-none focus:border-[#2bbedf]"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="small"
                    className="text-red-600"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#32c2ff] h-10 mt-10 text-lg cursor-pointer"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <p className="text-end mt-9">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer text-blue-800"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
