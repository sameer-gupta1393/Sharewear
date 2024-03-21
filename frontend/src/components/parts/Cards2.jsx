import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import {Toaster ,toast} from "react-hot-toast"
import { addUser } from '../utils/userSlice'
import { MdDeleteForever } from "react-icons/md";

const Cards2 = ({info}) => {
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
     let wishlist=await fetch(`http://localhost:5000/wishlist/${url}`,{
      method:"POST",
      body:JSON.stringify({sellerId:info[0],productId:info[2]._id}),
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
    url=info[2].productImg[j];
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
    <div className="font-bold text-xl">{info[2].productName}
    <span className=" float-right bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
       {info[2].productCat}</span></div>
    
 
    <p className="text-gray-700 text-base inline">
      {info[2].productDesc}
    </p>
    <div className="bg-green-500 text-white rounded-md px-1 inline float-right">
                <span className=" text-[15px] ">₹ &nbsp;</span>
                <span className=" text-[15px]  ">{info[2].productPrice}</span>
              </div>
  </div>
  <p className="text-gray-700 text-[10px] px-6  h-fit m-0 text-base inline">
      owner-<b>{info[1]}</b>
    </p>
  <div className="px-6 py-4  flex justify-between">
        <Link to="/card" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-brown-500 rounded-lg hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800">
            Rent it  
        </Link>
        <MdDeleteForever size={30} className='text-red-500 self-center '   />
        
     
  </div>
</div>
  )
}

export default Cards2