import React, { useEffect } from 'react'
import SideBar from './parts/SideBar'
import Cards from './parts/Cards'
import { BrowserRouter, Route, Routes,Link, Outlet,useNavigate, Navigate } from 'react-router-dom'
import Page3 from './Page3'
import Page2 from './Page2'
import Login from './parts/Login'
import Signup from './parts/Signup'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
const Page1 = () => {

  const navigate=useNavigate();
  let auth=localStorage.getItem('user');
  const dispatch=useDispatch()
  useEffect(()=>{
    if(auth) {
      // auth=JSON.parse(auth);
      const auth2 = JSON.parse(auth);
      dispatch(addUser({username:auth2.name,email:auth2.email}));
      console.log(auth2.name)
    }
    
  })
  const logout=()=>{
    localStorage.clear();
    navigate('/signup')
  }

  return (
 
  <div>
  
  <div className='flex  py-[10px] px-[20px] bg-stone-300/10'>
  <div className='w-[40%] m-auto'>
      <form onSubmit={(e)=>{
        e.preventDefault()
      }}>   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
      </form>
  </div>  
  
  {auth?<Link onClick={logout} to="/signup"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">LogOut</button></Link>:  <Link to="/signup"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign up</button></Link>}
 
  <Link to={auth?"/rent":"/signup"}><button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Rent</button></Link>
  </div>
  <div className="grid grid-cols-4 h-auto max-w-[80vw] ">
     

      <div className="col-span-1 self-stretch">
        {/* Sidebar content */}
        <SideBar/>
      </div>
       <Outlet/> 
        
    
    </div>
    
  </div>
  
  )
}

export default Page1