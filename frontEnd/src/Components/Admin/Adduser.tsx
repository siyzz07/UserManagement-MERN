import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { userRegister } from "../../services/userAPI"; 
import { toast } from "react-toastify";

// Interface for form initial values
interface initialValuesInterface {
  name: string;
  email: string;
  profile: File | null;
  password: string;
}
type UserDataTableProps = {
    closePopup: () => void;
    refetch:()=>void
  };
  

const Adduser :React.FC<UserDataTableProps>  =({closePopup,refetch})=> {
 
  const [message, setMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

   

  

    try {
      const response = await userRegister(formData);
      toast.success("registered successfully", { autoClose: 2000 });
      closePopup()
      refetch()
    } catch (error: any) {
      console.error("Registration failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, { autoClose: 2000 });
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
     
      <div
        className="fixed inset-0 bg-gray-500/75 z-10"
        aria-hidden="true"
      ></div>

    
      <div
        className="fixed  inset-0 z-20 flex items-center justify-center overflow-y-auto"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div className="bg-gradient-to-b from-[#464646] to-white w-full max-w-lg p-6 rounded-lg shadow-lg">
          
          <div className="flex w-full flex-row items-center justify-between">
            <h1 className="font-semibold text-2xl text-center flex-1">
              CREAT AN USER ACCOUNT
            </h1>
            <p
              className="font-bold cursor-pointer ml-auto mr-4 text-lg"
              onClick={closePopup} 
            >
              X
            </p>
          </div>
   
          {/* {message && (
            <p className="mt-4 text-red-600 text-center">{message}</p>
          )} */}

         
          <div className="mt-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form>
               
                  <div className="mt-4">
                    <Field
                      name="name"
                      type="text"
                      placeholder="Username"
                      className="w-full border-b-2 h-10 px-2 bg-none focus:outline-none focus:border-[#2bbedf]"
                    />
                    <ErrorMessage
                      name="name"
                      component="small"
                      className="text-red-600"
                    />
                  </div>

                 
                  <div className="mt-4">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="w-full border-b-2 bg-none h-10 px-2 focus:outline-none focus:border-[#2bbedf]"
                    />
                    <ErrorMessage
                      name="email"
                      component="small"
                      className="text-red-600"
                    />
                  </div>

                  
                  <div className="mt-4">
                    <input
                      type="file"
                      name="profile"
                      className="w-full bg-none border-b-2 h-10 focus:outline-none bg-none focus:border-[#2bbedf]"
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

             
                  <div className="mt-4">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="w-full bg-none border-b-2 h-10 px-2 bg-none focus:outline-none focus:border-[#2bbedf]"
                    />
                    <ErrorMessage
                      name="password"
                      component="small"
                      className="text-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#32c2ff] text-white h-10 mt-8 rounded-md hover:bg-blue-500 transition-all"
                  >
                    ADD  USER
                  </button>
                </Form>
              )}
            </Formik>
          </div>

       
        
        </div>
      </div>
    </div>
  );
};

export default Adduser;
