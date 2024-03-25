import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const SideBar = () => {
   
  const [totalProducts,settotalProducts]=useState(0);
  const [totalWishlistProducts,settotalWishlistProducts]=useState(0);
  
  const auth=localStorage.getItem('user');
  const dispatch=useDispatch();
//   dispatch(addUser({wishlist:Number(totalWishlistProducts)}))
  const userData = useSelector((state) => state.user);
  
 
  async function getProductArrayLength() {
   try {
     const url=userData.id?userData.id:JSON.parse(auth)._id;
     const response = await fetch(`/api/products/length?userID=${url}`);
 
     if (response.ok) {
       const data = await response.json();
       settotalProducts(data.productArrayLength)
    
       console.log('Product Array Length:', data.productArrayLength);
     } else {
       const errorData = await response.json();
       console.error('Error:', errorData);
       settotalProducts(0)
     }
   } catch (error) {
     console.error('Fetch error:', error);
   }
 }
 async function getWishlistArrayLength() {
   try {
     const url=userData.id?userData.id:JSON.parse(auth)._id;
     const response = await fetch(`/api/wishlist/length?userID=${url}`);
 
     if (response.ok) {
       const data = await response.json();
       settotalWishlistProducts(data.wishlistArrayLength)
      //  dispatch(addUser({wishlist:Number(userData.wishlist)}))
       console.log(' wishlistArray Length:', data.wishlistArrayLength);
    
     } else {
       const errorData = await response.json();
       console.error('Error:', errorData);
       settotalWishlistProducts(0)
     }
   } catch (error) {
     console.error('Fetch error:', error);
   }
 }

 useEffect(()=>{
   // Example usage

   if(auth){
   if(!userData.name){
     const{ name,email,_id}=JSON.parse(auth)
     dispatch(addUser({name:name,email:email,id:_id}))
   }
     }
   if(auth){
      getProductArrayLength();
      getWishlistArrayLength();
   }
 },[userData])
  return ( 
   <div className='h-full min-h-screen'>
   <div id="sidebar-multi-level-sidebar" className=" h-full min-h-screen z-40  " >
   <div className="h-full px-3 py-4 overflow-y-auto relative bg-[#fbe5ba] dark:bg-gray-800">
      <ul className="space-y-2 font-medium ">
         <li>
            <Link to={auth?"/":"/signup"} className="flex items-center p-2 text-gray-900 rounded-lg bg-[#ffd6a4] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
               <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>   
               </svg>
               <span className="ms-3">Home</span>
            </Link>
         </li>
          
          
         <li>
         <Link to={auth?"/messages":"/signup"} className="flex items-center p-2 bg-[#ffd6a4] text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group overflow-hidden">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Chatted Users</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </Link>
         </li>
         <li>
            <Link to={auth?"/products":"/signup"} className="flex items-center p-2 bg-[#ffd6a4] text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group overflow-hidden">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Your Products</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{totalProducts}</span>
            </Link>
         </li>
         <li>
         <Link to="/wishlist" className="flex overflow-hidden items-center p-2 bg-[#ffd6a4] text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Wishlist</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{totalWishlistProducts}</span>
            </Link>
         </li>
         <li>
         <Link to="/login" className="flex items-center p-2 bg-[#ffd6a4] text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Login In</span>
            </Link>
         </li>
         <li>
            <Link to="/signup" className="flex items-center p-2 bg-[#ffd6a4] text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap" >Sign Up</span>
            </Link>
            
         </li>
      </ul>
      <footer className='bg-white  fixed bottom-[10px] rounded-full  px-[15px] py-[5px] left-[7vw] cursor-pointer ' onClick={()=>{
           document.body.scrollTop = 0;
           document.documentElement.scrollTop = 0;
      }}><b>^</b></footer>
   </div>
</div>
</div>


  )
}

export default SideBar