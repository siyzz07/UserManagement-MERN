import API from "../api/AxiosConfig";

interface InitialVal {
  email: string;
  password: string;
}

// log admin api
export const loginAdmin = async (values: InitialVal): Promise<void> => {
  const respons = await API.post("/admin/login", values);
  console.log(respons.data);

  return respons.data;
};

// fect user data to user dashboard
export const fetchUserData = async (value: object): Promise<any> => {
  const response = await API.get("/admin/dashboard", value);
  return response
  
};


// delet user api
export const deleteUser=async (value:any,user:any):Promise<void>=>{
  
  
  console.log('user._id', user._id)
  
  const request=await API.delete(`/admin/deleteuser/${user._id}`,value)
  return request.data
  
}
