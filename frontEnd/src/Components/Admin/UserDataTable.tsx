import React from "react";
import { deleteUser } from "../../services/adminApi";

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
  const handleDeleteUser = async (user: User) => {
    try {
      console.log("user", user);
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

  


  return (
    <div>
      <div>
        <div>
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
                  {" "}
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
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
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
