import React, { useEffect ,useState ,useRef} from 'react'
import SideBar from '../components/parts/SideBar'
import { TiDeleteOutline } from "react-icons/ti";
import {  useLocation,Link, Outlet,useNavigate, Navigate } from 'react-router-dom'
import  { toast,Toaster } from 'react-hot-toast';
import useConversation from "../zustand/useConversation";
import { getLocation } from "../components/utils/getLocation"
 
const Page1 = () => {

  const navigate=useNavigate();
  const searchText=useRef('');
  const location2= useLocation();
  const [selectedTags, setSelectedTags] = useState([]);
  let auth=localStorage.getItem('user');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [currentValue, setCurrentValue] = useState(1);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const { location,setLocation} = useConversation();
  const [error, setError] = useState('');
  const handleToggle = () => {
    if(location==null){
      getLocation()
    }else{
      console.log(location)
    }
    setIsEnabled(!isEnabled);
    
  };
  const handleToggle2 = () => {
    setIsEnabled2(!isEnabled2);
  };
  const handleSliderChange = (event) => {
    setCurrentValue(event.target.value);
  };

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



  const handleMinChange = (e) => {
      const value = parseInt(e.target.value);
      setMinValue(value);
      if (value >= maxValue) {
          setError('Minimum value must be less than the maximum value.');
      } else {
          setError('');
      }
  };

  const handleMaxChange = (e) => {
      const value = parseInt(e.target.value);
      setMaxValue(value);
      if (value <= minValue) {
          setError('Maximum value must be greater than the minimum value.');
      } else {
          setError('');
      }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
      if(isEnabled2){
          // Validate min price
          if (isNaN(minValue)||minValue>=maxValue) {
            // Show error toast for NaN min price
            // setError('Minimum price must be a valid number.');
            toast.error('Minimum price must be a valid number and less than maxValue')
            return;
          }
      
          // Validate max price
          if (isNaN(maxValue) || maxValue === 0) {
            // Show error toast for NaN or zero max price
            // setError('Maximum price must be a valid number and greater than zero.');
            toast.error('Maximum price must be a valid number and greater than zero.')
            return;
          }

      }
    
        
    // Gather the data
    const searchData = {
      searchText:searchText.current.value,
      selectedCategories: selectedTags,
      distance: isEnabled ? currentValue : null,
      minPrice: isEnabled2 ? minValue:null,
      maxPrice: isEnabled2 ? maxValue :null
    };

    // Perform necessary actions (e.g., navigation or API calls)
    console.log(searchData);
    // Navigate to the search results page or trigger API call with searchData
    // navigate('/search-results');
  };


  useEffect(()=>{
    if(!auth) {
      // auth=JSON.parse(auth);
      navigate('/signup')
    }else{
      // if(!location && isEnabled)setIsEnabled(!isEnabled)
      // else {setIsEnabled(isEnabled)}
    }
    
  },[location])
  const logout=()=>{
    localStorage.clear();
    navigate('/signup')
  }

  return (
 
  <div>
  <Toaster
  position="top-center"
  reverseOrder={false}
/>
  <div className='flex  py-[10px] px-[20px] bg-brown-300/10'>
  <div className='w-[40%] m-auto'>
      <form onSubmit={handleSearch}> 
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input type="search" 
               id="default-search" 
               ref={searchText}
               className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               placeholder="Search  Clothes..."  
               
               />
              {location2.pathname === desiredRoute && (
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
    {location2.pathname === desiredRoute && (<div className='flex flex-col'>
       {/* <Filter/> */}
        
        <div className='inline-block w-[15vw]  h-fit  mt-[1vh] bg-white p-6 rounded-lg shadow-lg'>
            <p className='font-semibold text-[15px] text-center mt-[1vh] mb-4'>Filter by categories</p>
            <div className='flex flex-wrap gap-2 mb-6'>
              <p onClick={() => handleTagClick('Men')} className={`cursor-pointer bg-blue-200 hover:bg-blue-300 py-1 px-2 rounded-lg text-sm ${selectedTags.includes('Men') && 'bg-blue-400'}`}>
                Men
              </p>
              <p onClick={() => handleTagClick('Children')} className={`cursor-pointer bg-green-200 hover:bg-green-300 py-1 px-2 rounded-lg text-sm ${selectedTags.includes('Children') && 'bg-green-400'}`}>
                Children
              </p>
              <p onClick={() => handleTagClick('Women')} className={`cursor-pointer bg-purple-200 hover:bg-purple-300 py-1 px-2 rounded-lg text-sm ${selectedTags.includes('Women') && 'bg-purple-400'}`}>
                Women
              </p>
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
          <p className='font-semibold text-[15px] text-center mt-[1vh] mb-4'>Filter by  Distance(km)</p>
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox"  onChange={handleToggle} className="sr-only peer" value={isEnabled}/>
            <div className={`relative w-9 h-5 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer 
                               
                               rtl:peer-checked:after:-translate-x-full
                             peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white
                             after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 

                               ${location?"peer-checked:after:translate-x-full after:transition-all  peer-checked:bg-blue-600 ":""}
                            `}>
                            </div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{!isEnabled?"Disabled":"Enabled"}</span>
          </label>
          {/* <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default range</label> */}
          <div className="relative mb-6">
          <input id="default-range" type="range" min="1" max="15" value={currentValue} 
          onChange={handleSliderChange} 
          disabled={location?(!isEnabled):true}  className="w-full h-2  bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">1km</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">15km</span>
          </div>
          <div className='border-t-2  border-black/15 mt-8'>
                 <p className='mt-2'> {location?(isEnabled?`In ${currentValue} km`:""):""}</p>
          </div>
          <p hidden={location!==null} className='text-red-500 font-semibold'>please give location permission</p>
        </div>
        
        <div className='inline-block w-[15vw]  h-fit  mt-[2vh] bg-white p-6 rounded-lg shadow-lg'>
          <p className='font-semibold text-[15px] text-center mt-[1vh] mb-4'>Filter by  Price(Rs)</p>
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox"  onChange={handleToggle2} className="sr-only peer" value={isEnabled2}/>
            <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{!isEnabled2?"Disabled":"Enabled"}</span>
          </label>
          <div className='border-t-2 border-black/15'>
          <div className='relative'>
            <label htmlFor="min" className='w-14 '>Min</label>
            <input
                disabled={!isEnabled2}
                className={`inline-block mb-2 mt-2 w-14 ml-2 border-2 rounded-lg px-1 ${isEnabled2 ? "border-black" : "border-white"}`}
                type="number"
                id="min"            
                name="min"
                min="0"
                value={isEnabled2?minValue:""}
                onChange={handleMinChange}
            />
            <br/>
            <label htmlFor="max" className='w-14'>Max</label>
            <input
                disabled={!isEnabled2}
                className={`inline-block w-14 ml-2 border-2 rounded-lg px-1 ${isEnabled2 ? "border-black" : "border-white"}`}
                type="number"
                id="max"
                name="max"
                min="0"
                value={isEnabled2?maxValue:""}
                onChange={handleMaxChange}
            />
            
        </div>
        <p hidden={!isEnabled2} className='text-red-500 font-semibold'>{error && <span className="error">{error}</span>}</p>
          </div>
        </div>
     
     
    </div>
    )}
    </div>
  
  </div>
  
  )
}

export default Page1