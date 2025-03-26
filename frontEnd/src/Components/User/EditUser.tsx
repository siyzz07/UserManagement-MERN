import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import profilePhoto from "../../assets/blank-profile-picture-973460_1280.png";
import { editUser } from "../../services/userAPI";
import { toast } from "react-toastify";

interface InitialValuesInterface {
  name: string;
  email: string;
  profileImage: File | null;
}

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const EditUser = ({ user, closePopup,refetch}: any) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [prevProfile, setPrevProfile] = useState<string>("");

  const initialValues: InitialValuesInterface = {
    name: user ? user.name : "",
    email: user ? user.email : "",
    profileImage: null, 
  };

  // Validation schema
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(4, "Name must be at least 4 characters long"),
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
    profileImage: yup
      .mixed()
      .test(
        "fileType",
        "Only image files are allowed (jpeg, png, jpg)",
        (value: any) => {
         
          if (!value && prevProfile !== "No file chosen") {
            return true; 
          }

          if (value && !ALLOWED_FILE_TYPES.includes(value?.type)) {
            return false;
          }

          return true;
        }
      )
      .nullable(), 
  });
  const handleFormSubmit = async (values: InitialValuesInterface) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);

    if (values.profileImage) {
      
      formData.append("profileImage", values.profileImage);
    } else if (prevProfile && prevProfile !== "No file chosen") {
      
      formData.append("profileImage", prevProfile);
    }

    console.log("Form submitted:", {
      name: values.name,
      email: values.email,
      profileImage: values.profileImage ? "New file" : prevProfile,
    });


    
    try {
      const token=localStorage.getItem("token")
      
     const response=await editUser({
        headers:{Authorization:`Bearer ${token}`}
     },formData)
    
     if(response){
      toast.success(response.message)
      closePopup()
      refetch()
     }

    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file && ALLOWED_FILE_TYPES.includes(file.type)) {
      setFieldValue("profileImage", file); 
      setFileName(file.name);
      setPreviewImage(URL.createObjectURL(file));
    } else if (file) {
      alert("Unsupported file type. Please upload a jpeg, png, or jpg image.");
      setFileName("No file chosen");
      setPreviewImage(null);
      setFieldValue("profileImage", null); 
    } else {
     
    }
  };

  useEffect(() => {
    console.log("5");
    if (user?.profileImage) {
      console.log("4");
      const isString = typeof user.profileImage === "string";
      setFileName(
        isString ? user.profileImage.split("/").pop() : "No file chosen"
      );
      setPrevProfile(
        isString ? user.profileImage.split("/").pop() : "No file chosen"
      );
      setPreviewImage(
        isString
          ? `http://localhost:3000${user.profileImage}` 
          : URL.createObjectURL(user.profileImage) 
      );
    }
  }, [user]);

 ;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#272222da]">
      <div className="relative w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg sm:my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Edit Profile</h2>
          <p
            onClick={closePopup}
            onKeyDown={(e) => e.key === "Enter" && closePopup()}
            role="button"
            tabIndex={0}
            className="text-end font-semibold text-gray-700 text-lg cursor-pointer"
          >
            X
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col items-center justify-center w-full sm:w-1/2 bg-gray-100 p-6 rounded-lg">
            <img
              src={previewImage || profilePhoto}
              alt="Profile Preview"
              className="w-36 h-36 rounded-full object-cover shadow-md mb-4"
            />
            <p className="text-sm text-gray-500">
              Upload a new profile picture if you’d like to update it.
            </p>
            <p className="text-sm text-gray-700">{fileName}</p>
          </div>

          <div className="w-full sm:w-1/2">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium"
                    >
                      Name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium"
                    >
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="Enter your email"
                      readOnly
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>
                  <div>
                    <input
                      id="profileImage"
                      name="profileImage"
                      type="file"
                      className="hidden"
                      onChange={(event) =>
                        handleFileChange(event, setFieldValue)
                      }
                    />
                    <label
                      htmlFor="profileImage"
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer"
                    >
                      <span>{fileName}</span>
                      <span className="text-blue-500">Choose File</span>
                    </label>
                    <ErrorMessage
                      name="profileImage"
                      component="div"
                      className="text-sm text-red-500 mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 text-white bg-[#30c1ff] rounded-lg hover:bg-[#6ad5e6] cursor-pointer transition-all"
                  >
                    Update Profile
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

export default EditUser;
