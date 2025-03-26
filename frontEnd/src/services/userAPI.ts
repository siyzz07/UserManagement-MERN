import API from "../api/AxiosConfig";
import { useNavigate } from "react-router-dom";

interface InitialVal {
  email: string;
  password: string;
}

// register user
export const userRegister = async (formData: FormData): Promise<void> => {
  const response = await API.post("/users/register", formData);
  return response.data;
};

// login user
export const loginUser = async (values: InitialVal): Promise<void> => {
  const response = await API.post("/users/login", values);
  return response.data;
};

// fetch the specific user data
// export const userDataFetch = async (val: Object): Promise<any> => {
//   try {
//     const response = await API.get('/users/home', val);
//     console.log(response,'res frrom user api')
//     return response.data;
//   } catch (error: any) {

//     if (error.response && error.response.status === 401) {

//       throw new Error('Token expired or unauthorized');
//     } else {

//       throw new Error(error.message || 'An error occurred');
//     }
//   }
// };

export const userDataFetch = async (val: Object): Promise<any> => {
  const response = await API.get("/users/home", val);

  return response.data;
};

// edit user api

export const editUser = async (
  token: any,
  FormData: FormData
): Promise<any> => {
  // let profileImage = FormData.get("profileImage");

  // if (profileImage instanceof File && profileImage.name) {
  //   FormData.set("profileImage", profileImage.name);
  // }

  const response = await API.post("/users/edituser", FormData, token);
  return response
};
