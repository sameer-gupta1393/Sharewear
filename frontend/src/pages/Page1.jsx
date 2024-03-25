import React, { useEffect ,useState} from 'react'
import SideBar from '../components/parts/SideBar'
import { TiDeleteOutline } from "react-icons/ti";
import {  useLocation,Link, Outlet,useNavigate, Navigate } from 'react-router-dom'
import Filter from '../components/parts/Filter';
const Page1 = () => {

  const navigate=useNavigate();
  const location = useLocation();
  const [selectedTags, setSelectedTags] = useState([]);
  let auth=localStorage.getItem('user');
  
  const desiredRoute = '/';
  const handleTagClick = (tag) => {
    // Check if the tag is already selected
    if (selectedTags.includes(tag)) {
      // If selected, remove it
      setSelectedTags([...selectedTags]);
    } else {
      // If not selected, add it
      setSelectedTags([...selectedTags,tag]);
    }
  };
  const handleRemoveTagClick = (tag) => {
  
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    
  };


  
  useEffect(()=>{
    if(!auth) {
      // auth=JSON.parse(auth);
      navigate('/signup')
    }
    
  },[])
  const logout=()=>{
    localStorage.clear();
    navigate('/signup')
  }

  return (
 
  <div>
  <div className='flex  py-[10px] px-[20px] bg-brown-300/10'>
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
              <input type="search" 
               id="default-search" 
              
               className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               placeholder="Search  Clothes..." required 
               
               />
              {location.pathname === desiredRoute && (
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              )}
          </div>
      </form>
  </div>  
  
  {auth?<Link onClick={logout} to="/signup" className='self-center'><button type="button" className="text-white  bg-blue-700 hover:bg-blue-800    font-medium rounded-lg text-sm px-5 py-2.5 me-2   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">LogOut</button></Link>:  <Link to="/signup"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign up</button></Link>}
 
  <Link to={auth?"/rent":"/signup"} className='self-center'><button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Rent</button></Link>
  </div>
  <div className='flex  gap-[1vw]'>
  <div className="grid grid-cols-4 h-auto max-w-[80vw] flex-grow gap-[1vw]">
      <div className="col-span-1 self-stretch">
        {/* Sidebar content */}
        <SideBar/>
      </div>
       <Outlet/> 
    </div>
    {location.pathname === desiredRoute && (<div className='flex flex-col'>
       {/* <Filter/> */}
        
        <div className='inline-block w-[15vw]  h-fit  mt-[1vh] bg-white p-6 rounded-lg shadow-lg'>
            <p className='font-semibold text-[15px] text-center mt-[1vh] mb-4'>Filter by categories</p>
            <div className='flex flex-wrap gap-2 mb-6'>
              <a href='#' onClick={() => handleTagClick('Men')} className={`bg-blue-200 hover:bg-blue-300 py-1 px-2 rounded-lg text-sm ${selectedTags.includes('Men') && 'bg-blue-400'}`}>
                Men
              </a>
              <a href='#' onClick={() => handleTagClick('Children')} className={`bg-green-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm ${selectedTags.includes('Children') && 'bg-green-400'}`}>
                Children
              </a>
              <a href='#' onClick={() => handleTagClick('Women')} className={`bg-purple-200 hover:bg-purple-300 py-1 px-2 rounded-lg text-sm ${selectedTags.includes('Women') && 'bg-purple-400'}`}>
                Women
              </a>
            </div>
            <div className='border-t-2 border-black/15'>
            {/* Render selected tags as buttons */}
            {selectedTags.map((tag) => {
              let color="bg-black"
              if(tag=="Men"){
                color="bg-blue-300"
              }else if(tag=="Women"){
                color="bg-purple-300"
              }else{
                color="bg-green-300"
              }
              
              return (<button key={tag} onClick={() => handleRemoveTagClick(tag)} className={` ${color} py-1 px-2 rounded-lg text-sm mt-2 mx-1`}>
                {tag} <TiDeleteOutline className='inline text-white ' />
              </button>)
              })}
            </div>
          </div>
              
        <div className='inline-block w-[15vw]  h-fit  mt-[2vh] bg-white p-6 rounded-lg shadow-lg'>
          <p className='font-semibold text-[15px] text-center mt-[1vh] mb-4'>Filter by Price</p>
          <div className='border-t-2 border-black/15'>
          </div>
        </div>
        
        <div className='inline-block w-[15vw]  h-fit  mt-[2vh] bg-white p-6 rounded-lg shadow-lg'>
          <p className='font-semibold text-[15px] text-center mt-[1vh] mb-4'>Filter by Distance</p>
          
          <div className='border-t-2 border-black/15'>
           
          </div>
        </div>
     
     
    </div>
    )}
    </div>
  
  </div>
  
  )
}

export default Page1