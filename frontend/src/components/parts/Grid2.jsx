import React,{useEffect, useState} from "react"
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";
const Grid2=()=>{
  const navigate=useNavigate()
  const [Cards1,setCards]=useState([]);
  const auth=localStorage.getItem("user")
  useEffect(()=>{
    if(auth){
      getWishlistCards()
    }else{
      navigate("/login")
    }
  },[])
  
  const getWishlistCards=async()=>{
    let Cards2=[];
    const url=userData.id?userData.id:JSON.parse(auth)._id;
    let response=await fetch(`/api/wishlistpop/${url}`)
    response=await response.json()
    console.log(response)
   
    response.wishlist.map(async(item1)=>{
         const url2=item1.productId;
         let response2=await fetch(`/api/productName/${url2}`)
         response2=await response.json()
         Cards2.push([item1._id,response2.name,item1.wishlistId.products ])
         console.log("cards",[item1._id,item1.productname,pro])
       
    })
    setCards(Cards2)
    console.log(Cards2)
  }
    return (
      
      
       /* Main Content Grid */
       <div className="col-span-3 p-2 overflow-hidden grid grid-cols-3 gap-4">
       {/* Card 1 */}
       {Cards1.map((cards,key)=>{
        return  (<div className="flex items-stretch " key={key}>
                    {/* Card Content */}
                    <Cards info={cards} />
                  </div>)
        })}
 
     </div>
    )
  }
  export default Grid2;