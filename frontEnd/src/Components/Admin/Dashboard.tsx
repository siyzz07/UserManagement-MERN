import React, { useEffect, useState } from "react";
import UserDataTable from "./UserDataTable";
import { useFormState } from "react-dom";
import Adduser from "./Adduser";
import { fetchUserData } from "../../services/adminApi";


interface User {
  name: string;
  email: string;
  role: string;
  _id: string;
  isActive:Boolean
}
const Dashboard = () => {
  const [addUserPopup, setAddUserPopup] = useState<Boolean>();
  const [usersData,setUsersData]=useState<User[]>()
  const [searchQuery, setSearchQuery] = useState("");
useEffect(()=>{
  fetchUser()
},[])

  const fetchUser = async () => {
    const token = localStorage.getItem("adminToken");
    const respose = await fetchUserData({
      headers: { Authorization: `Bearer ${token}` },
    });

    if(respose?.data){
      setUsersData(respose.data.userData)
    }
    

  };

  const closeAdduserPopup = () => {
    setAddUserPopup(false);
  };
  
  const filterUsers = usersData?.filter(
    (userData) =>
      userData.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userData.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>

      {addUserPopup && <Adduser closePopup={closeAdduserPopup} refetch={fetchUser} />}

      <div className="w-full mt-5 h-screen bg-gradient-to-b from-[#242424] to-white flex flex-col items-center justify-start">
      
        <div className="w-full max-w-4xl mt-8 px-4 flex items-center justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search Users"
              onChange={(e)=>setSearchQuery(e.target.value)}
              className="w-full p-2 border bg-[#ffffff] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

            />
          </div>
          <div className="ml-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all"
              onClick={() => setAddUserPopup(true)}
            >
              Add User
            </button>
          </div>
        </div>

      
        <div className="w-full flex items-center justify-center mt-6">
          <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-2xl">
            <UserDataTable refetch={fetchUser} users={filterUsers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
