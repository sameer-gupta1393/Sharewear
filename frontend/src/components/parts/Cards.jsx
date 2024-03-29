import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import {Toaster ,toast} from "react-hot-toast"
import { addUser } from '../utils/userSlice'
const Cards = ({info}) => {
  const userData = useSelector((state) => state.user);
  const auth=localStorage.getItem('user');
  const dispatch=useDispatch();

  console.log(info)
  let url=null;
  let j=0;

  const handleClick=async()=>{
    try{
     const url=userData.id?userData.id:JSON.parse(auth)._id;
     console.log({sellerId:info[0],productId:info[2][0]._id})
     let wishlist=await fetch(`/api/wishlist/${url}`,{
      method:"POST",
      body:JSON.stringify({sellerId:info[0],productId:info[2][0]._id}),
      headers: {  // important to add
        'Content-Type': 'application/json',
      },
     })
     wishlist=await wishlist.json();
     console.log(wishlist)
     if(wishlist.code==0){
      toast.error('Item already added!')
     }else{
      toast.success('Successfully added!')
     }
    
     dispatch(addUser({wishlist:Number(userData.wishlist)+1}))
    //  setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
    }catch(e){
      console.log("wishlist adding item failed")
    }
  }
  while(url==null){
    url=info[2][0].productImg[j];
    j++;
  }
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg h-[310px] bg-white w-full">
          <Toaster
        position="top-center"
        reverseOrder={false}
      />
     <img className="w-full h-[50%] object-cover object-top" src={url} alt="Sunset in the mountains"/>
     
   <div className="px-6 pt-4">
    <div className="font-bold text-xl">{info[2][0].productName}
    <span className=" float-right bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
       {info[2][0].productCat}</span></div>
    
 
    <p className="text-gray-700 text-base inline">
      {info[2][0].productDesc}
    </p>
    <div className="bg-green-500 text-white rounded-md px-1 inline float-right">
                <span className=" text-[15px] ">₹ &nbsp;</span>
                <span className=" text-[15px]  ">{info[2][0].productPrice}</span>
              </div>
  </div>
  <p className="text-gray-700 text-[10px] px-6  h-fit m-0 text-base inline">
      owner-<b>{info[1]}</b>
    </p>
  <div className="px-6 py-4  flex justify-between items-center">
        <Link to={`/card/${info[0]}/${info[2][0]._id}/${info[4]}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-brown-500 rounded-lg hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800">
            Rent it  
        </Link>
        {info[3]?<span className='bg-orange-500 text-white text-sm font-bold  px-2.5  h-fit rounded dark:bg-yellow-900 dark:text-yellow-300'>{info[3]?`${info[3]} km`:''}</span>:<></>}
        <a className='cursor-pointer p-2 ' onClick={handleClick}>
                <svg className="w-5 h-5 text-red-500 hover:text-red-700  dark:text-white-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg>

        </a>
        
     
  </div>
</div>
  )
}

export default Cards