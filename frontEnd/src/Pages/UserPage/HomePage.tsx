import React from "react";
import Navbar from "../../Components/Common/Navbar";
import Home from "../../Components/User/Home";

const HomePage = () => {
  return (
    <div>
      <div >
        <div className="w-full 2xl:h-13 xl:h-13 lg:h-7 shadow-2xl shadow-black">
          <Navbar />
        </div >
        <div>

        <Home />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
