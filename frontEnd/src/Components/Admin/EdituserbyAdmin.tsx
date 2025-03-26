import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { userRegister } from "../../services/userAPI";
import { toast } from "react-toastify";
import { editUserby } from "../../services/adminApi";

interface Props {
  popup: any;
  user: any;
  refetch: any;
}

interface initialValues {
  name: String;
  email: String;
  profileImage: String;
}
const Edituser = ({ popup, user, refetch }: Props) => {
  const initialValues: initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    profileImage: user?.profileImage || "",
  };
  const validationSchema = yup.object({
    name: yup.string().required("Name is required").min(4, "Name must be at least 4 characters"),
    
  });
  const handleSubmit =async (values:any) => {

    try{
      const  adminToken=localStorage.getItem('adminToken')
      const response = await editUserby(
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        },
        values
      );
      if(response){
        toast.success(response.message)
        popup()
        refetch()
      }
      

    }catch(error){

    }



  };

  return (
    <div>
    <div>
      <div>
        <div>
          <div
            className="fixed inset-0 bg-gray-500/75 z-10"
            aria-hidden="true"
          ></div>

          <div
            className="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
          >
            <div className="bg-gradient-to-b from-gray-700 to-white w-full max-w-lg p-6 rounded-lg shadow-lg">
              <div className="flex w-full flex-row items-center justify-between">
                <h1 className="font-semibold text-2xl text-center flex-1 text-white">
                  EDIT USER
                </h1>
                <p
                  className="font-bold cursor-pointer ml-auto mr-4 text-lg text-white"
                  onClick={popup}
                >
                  X
                </p>
              </div>

              <div className="mt-6 text-center">
               
                  <img
                    src={`http://localhost:3000${user?.profileImage}`}
                    alt="User Profile"
                    className="w-30 h-30 rounded-full mx-auto border-4 border-[#232323]"
                  />
              
                <h2 className="text-xl font-semibold mt-4">{initialValues.name}</h2>
                <p className="text-gray-600">{initialValues.email}</p>
              </div>

              <div className="mt-6">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form>
                      <div className="mt-4">
                        <Field
                          name="name"
                          type="text"
                          placeholder="Username"
                          className="w-full border-b-2 h-10 px-2 bg-transparent focus:outline-none focus:border-[#2bbedf]"
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
                          className="w-full border-b-2 bg-transparent h-10 px-2 focus:outline-none focus:border-[#2bbedf]"
                          readOnly
                        />
                        <ErrorMessage
                          name="email"
                          component="small"
                          className="text-red-600"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#7cd8ff] text-white h-10 mt-8 rounded-md hover:bg-[#4a7e9b] transition-all"
                      >
                        UPDATE USER
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
  
  );
};

export default Edituser;
