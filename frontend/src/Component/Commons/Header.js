import React from 'react'
import logo from '../../images/gtlogo.png'
import { FaFacebook, FaInstagram, FaSearch, FaTwitter } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../Context/UserContext'
import './header.css'

const Header = () => {
  const navigate = useNavigate()
  const {user} = useUser()
  const {logout} = useUser()

  const handleLogout=()=>{
    logout()
    window.location.reload()
  }

  const initial = 1;
  const size = 3;

  return (
    <nav className="header w-full px-6 py-4" style={{backgroundColor:'transparent'}}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logo} alt="logo" className="h-[30px] lg:h-[35px] rounded-lg"/>
                <p className="text-white text-[15px] lg:text-xl font-bold">GlobeTales</p>
              </div>
              <div className="hidden xl:flex items-center space-x-8">
                <a onClick={()=>navigate('/')} className="text-white hover:text-gray-300 cursor-pointer">Home</a>
                <a href="#" className="text-white hover:text-gray-300 cursor-pointer">Destinations</a>
                {/* <a href="#" className="text-white hover:text-gray-300 cursor-pointer">Travel Tips</a> */}
                <a onClick={()=>navigate(`/all-blogs/${parseInt(initial)}`)} className="text-white hover:text-gray-300 cursor-pointer">Blog</a>
                <a href="#" className="text-white hover:text-gray-300 cursor-pointer">About</a>
                <a href="#" className="text-white hover:text-gray-300 cursor-pointerdqdd">Contact</a>
              </div>
              <div className="flex items-center hidden md:flex space-x-6">
                <div>
                  {user?<div className=''>
                      <div className='flex items-center gap-5'>
                        <p className='flex cursor-pointer items-center gap-2 bg-gray-800 px-2 py-1 pl-1 rounded-xl text-[13px]'><span><img src={user.avatar} className='h-[30px] rounded-[20px]' alt='icon'/></span>{user.firstname}</p>
                        <p className='text-[13px] cursor-pointer bg-red-900 opacity-90 py-1.5 px-4 rounded-lg' onClick={handleLogout}>Logout</p>
                      </div>
                  </div>:<p className='text-[14px] cursor-pointer bg-gray-800 px-4 py-1 rounded-lg' onClick={()=>navigate('/register')}>Sign up</p>}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-white bg-opacity-20 text-white placeholder-white px-4 py-2 rounded-full focus:outline-none"
                  />
                  <FaSearch className="absolute right-3 top-3 text-white" />
                </div>
                <div className="flex space-x-4">
                  <FaFacebook className="text-white hover:text-gray-300 cursor-pointer" />
                  <FaTwitter className="text-white hover:text-gray-300 cursor-pointer" />
                  <FaInstagram className="text-white hover:text-gray-300 cursor-pointer" />
                </div>
              </div>
            </div>
          </nav>
  )
}

export default Header
