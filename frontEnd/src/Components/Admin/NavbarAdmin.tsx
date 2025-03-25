import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogout } from '../../redux/authSlice'


const NavbarAdmin = () => {


    const dispatch=useDispatch()
    const navigate=useNavigate()


    const handleLogout=()=>{
      localStorage.removeItem("adminToken");                                 
      dispatch(adminLogout())
      // navigate('/')
    }
  



  return (
    <div className="bg-[#3f3f3f] shadow-md ">
    <div className="container mx-auto">
      <div className="flex justify-between items-center py-3 px-6 border-b-4 border-white">
        {/* Navbar Title */}
        <div className="text-white font-bold text-lg">Navbar</div>
  
        {/* LogOut Button */}
        <button 
          className="bg-white text-red-500 font-medium py-2 px-4 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
    </div>
  </div>
     
  )
}

export default NavbarAdmin
