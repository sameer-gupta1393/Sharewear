import React,{useEffect, useState} from "react"
import Cards from "../components/parts/Cards";
import { useNavigate } from "react-router-dom";
 
 
const Wishlist = () => {

    const navigate=useNavigate()
    const [Cards1,setCards]=useState([]);
    const auth=localStorage.getItem("user")
    useEffect(()=>{
      if(auth){
          getCards()
      }else{
        navigate("/login")
      }
    },[])

    const getCards=async()=>{
        let Cards2=[];
        let id=JSON.parse(auth)._id;
        let response=await fetch(`http://localhost:5000/getWishlist/${id}`)
        response=await response.json()
        response.map((item1)=>{
           item1.products.map((pro)=>{
             Cards2.push([item1._id,item1.name,pro])
             console.log("cards",[item1._id,item1.name,pro])
           })
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

export default Wishlist