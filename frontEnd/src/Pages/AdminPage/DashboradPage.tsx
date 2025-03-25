import React from 'react'
import NavbarAdmin from '../../Components/Admin/NavbarAdmin'
import Dashboard from '../../Components/Admin/Dashboard'

const DashboradPage = () => {
  return (
    <div>
      <div >
        <div className="w-full 2xl:h-13 xl:h-13 lg:h-7 shadow-2xl shadow-black">
   <NavbarAdmin/>
        </div >
        <div>

      <Dashboard/>
        </div>
      </div>
    </div>
  )
}

export default DashboradPage
