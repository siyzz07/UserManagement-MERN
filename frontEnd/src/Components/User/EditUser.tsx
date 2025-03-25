import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import profilePhoto from "../../assets/blank-profile-picture-973460_1280.png";

// Interface for form initial values
interface initialValuesInterface {
  name: string;
  email: string;
  profile: File | null;
}

const EditUser = ({ user }: any) => {
  // State setup for image preview and filename
  const [previewImage, setPreviewImage] = useState<any>(null);

  // Set initial values for the form, prefilled with user data passed via props
  const initialValues: initialValuesInterface = {
    name: user ? user.name : "",
    email: user ? user.email : "",
    profile: null, // File input is initially null
  };

  // Validation schema using Yup
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
  });

  // Form submit handler
  const handleFormSubmit = async (values: initialValuesInterface) => {
    console.log(values); // Replace with your API call or desired logic
  };

  // Handle file selection and update the preview image and filename
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
    setFieldValue("profile", file);

    if (file) {
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl); // Update the preview image
    } else {
      // Reset preview if no file is selected
      setPreviewImage(null);
    }
  };

  // Effect hook to set the initial image preview if the user already has a profile image
  useEffect(() => {
    if (user.profileImage) {
      setPreviewImage(user.profileImage); // Use the user’s current image if available
    }
  }, [user.profileImage]);

  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl h-[500px] sm:h-[500px]">
              <div className="w-full h-10 bg-amber-400 text-center mt-4 text-3xl">
                <p>Edit Profile</p>
              </div>
              <div className="w-full h-full bg-fuchsia-200 flex">
                <div className="w-1/2 h-full bg-amber-400">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile"
                      className="w-36 h-36 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src={profilePhoto}
                      alt="Default Profile"
                      className="w-36 h-36 rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="w-1/2 h-full bg-amber-800 flex flex-col">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                  >
                    {({ setFieldValue }) => (
                      <Form>
                        <Field
                          name="name"
                          className="border-2 w-full h-11 mt-6 pl-4"
                          type="text"
                          placeholder="Name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm pl-4"
                        />

                        <Field
                          name="email"
                          className="border-2 w-full h-11 mt-6 pl-4"
                          type="text"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />

                        <div className="relative">
                          <Field
                            name="profile"
                            type="file"
                            className="border-2 w-full h-11 mt-6 pl-4"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                              handleFileChange(event, setFieldValue)
                            }
                          />
                        </div>
                        <ErrorMessage
                          name="profile"
                          component="div"
                          className="text-red-500 text-sm"
                        />

                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 mt-6 rounded"
                        >
                          Submit
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
