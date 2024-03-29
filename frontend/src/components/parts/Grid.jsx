import React,{useEffect, useState} from "react"
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";
import useConversation from "../../zustand/useConversation";
const Grid=()=>{
  const navigate=useNavigate()
  const [Cards1,setCards]=useState([]);
  const {ProductsCards,setProductsCards}=useConversation()
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
    let response=await fetch('/api/getProducts')
    response=await response.json()
    response.map((item1)=>{
       item1.products.map((pro)=>{
         Cards2.push([item1._id,item1.name,pro])
         console.log("cards",[item1._id,item1.name,pro])
       })
    })
    setCards(Cards2)
    setProductsCards(Cards2)
    console.log(Cards2)

  }
    return (
      
      
       /* Main Content Grid */
       <div className="col-span-3 p-2 overflow-hidden grid grid-cols-3 gap-2 content-start">
       {/* Card 1 */}
       {ProductsCards.map((cards,key)=>{
        return  (<div className="flex items-stretch " key={key}>
                    {/* Card Content */}
                    <Cards info={cards} />
                  </div>)
        })}
 
     </div>
    )
  }
  export default Grid;