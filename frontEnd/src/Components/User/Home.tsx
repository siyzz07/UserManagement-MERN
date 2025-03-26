import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { userDataFetch } from "../../services/userAPI";
import { useNavigate } from "react-router-dom";
import EditUser from "./EditUser";
import { logout } from "../../redux/authSlice";

interface ueserData {
  id: String;
  name: String;
  email: String;
  profileImage: String;
  role: String;
}

const Home = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<ueserData | undefined>();
  const [popupEdit, setPopup] = useState<boolean>(false);
  const naviage = useNavigate();
  useEffect(() => {
    fetchUser();
  }, []);

  // fuction to fetch the uer data
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      //fetch user data
      const respose = await userDataFetch({
        headers: { Authorization: `Bearer ${token}` },
      });

      if (respose) {
        if (!respose.isActive) {
          localStorage.removeItem("token");
          dispatch(logout());
          // fetchUser()
          naviage("/");
          console.log(
            "Token removed from local storage as the user is inactive."
          );
        } else {
          setUserData(respose);
        }
      } else {
        naviage("/");
      }
    } catch (error: any) {
      // naviage('/')
      console.log(error.message);
    }
  };

  const handlePopup = () => {
    setPopup(!popupEdit);
  };

  return (
    <div>
      {popupEdit && (
        <EditUser user={userData || undefined} closePopup={handlePopup} refetch={fetchUser} />
      )}
      <div className="w-full mt-6 h-screen bg-gradient-to-b from-[#32c2ff] to-white flex items-center justify-center">
        {/* Main Card Container */}
        <div className="w-full h-full 2xl:w-2/4 xl:w-2/4 lg:w-2/4 xl:h-2/4 lg:h-2/4 2xl:h-2/4 bg-white flex flex-col sm:flex-row shadow-2xl shadow-black rounded-xl">
          {/* Image Section */}
          <div className="h-1/2 sm:h-full w-full sm:w-1/2 flex items-center justify-center p-4">
            <img
              className="w-full h-auto max-w-[80%] sm:max-w-[70%] lg:max-w-[60%] rounded-2xl"
              src={`http://localhost:3000${userData?.profileImage}`}
              alt="Profile"
            />
          </div>

          {/* Data Section */}
          <div className="h-1/2 sm:h-full w-full sm:w-1/2 flex flex-col items-center sm:items-start justify-center p-4">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                {userData?.name || "Unknown User"}
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                <strong>Email:</strong> {userData?.email || "N/A"}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <strong>Role:</strong> {userData?.role || "N/A"}
              </p>
            </div>
            <div
              onClick={handlePopup}
              className=" w-full h-10 cursor-pointer hover:bg-[hsl(197,100%,77%)]  text-lg bg-[#43c7ff] mt-7 text-center flex items-center justify-center rounded"
            >
              <p>Edit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
