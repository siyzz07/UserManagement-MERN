import React, { useState } from "react";
import { deleteUser } from "../../services/adminApi";
import Edituser from "./EdituserbyAdmin";


interface User {
  name: string;
  email: string;
  role: string;
  _id: string;
  isActive: Boolean;
}
interface UserDataTableProps {
  users: User[] | any;
  refetch: () => void;
  //   title: string;
  //   onRowClick?: (user: User) => void;
}

const UserDataTable = ({ users, refetch }: UserDataTableProps) => {

    const [editUserPopup,setEditUserPopup]=useState<Boolean>(false)
    const  [userDetails,setUserDetails]=useState<User|null>(null)


  const handleDeleteUser = async (user: User) => {
    try {
      
      const token = localStorage.getItem("adminToken");
      const request: any = await deleteUser(
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        user
      );

      if (request) {
        refetch();
      }
    } catch (error: any) {}
  };

  
  const handleEditUse=(user:User)=>{
    setEditUserPopup(!editUserPopup)
    setUserDetails(user)
    }
  

  return (

    <div>
      <div>
        <div>
          {editUserPopup && <Edituser popup={()=>setEditUserPopup(false)}  user={userDetails} refetch={refetch}/>}

          <table className="border-collapse border border-gray-400 w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
                <th className="border border-gray-400 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: User) => (
                <tr key={user._id}>
              
                  {/* Add a unique key */}
                  <td className="border border-gray-400 px-4 py-2">
                    {user.name}
                  </td>
                  
                  <td className="border border-gray-400 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {user.isActive?"Active":"Inactive"}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button onClick={()=>handleEditUse(user)} className="bg-blue-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>

                    {user.isActive ? (
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                      >
                        Active
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default UserDataTable;
