import React,{useEffect, useState} from "react"
import Cards2 from "../components/parts/Cards2.jsx";
import { useNavigate } from "react-router-dom";
const  Wishlist=()=>{
  const navigate=useNavigate()
  const [Cards1,setCards]=useState([]);
  const [change,setChange]=useState(0); // lifting state up so when click delete it recalls api
  const auth=localStorage.getItem("user")
  useEffect(()=>{
    if(auth){
      getWishlistCards()
    }else{
      navigate("/login")
    }
  },[change])
  console.log(change)
  const getWishlistCards = async () => {
    const url = JSON.parse(auth)._id;
    let response = await fetch(`/api/wishlistpop/${url}`);
    response = await response.json();
  
    // Use Promise.all to wait for all asynchronous fetch operations to complete
    const cardPromises = response.wishlist.map(async (item1) => {
      const url2 = item1.wishlistId.sellerId;
      let response2 = await fetch(`/api/productName/${url2}`);
      response2 = await response2.json();
      return [item1._id, response2.productName, item1.wishlistId.products,item1.wishlistId._id];
    });
  
    // Wait for all promises to resolve
    const Cards2 = await Promise.all(cardPromises);
    setCards(Cards2);
  };
  
    return (
      
      
       /* Main Content Grid */
       <div className="col-span-3 p-2 overflow-hidden grid grid-cols-3 gap-4">
       {/* Card 1 */}
       {Cards1.map((cards,key)=>{
        return  (<div className="flex items-stretch " key={key}>
                    {/* Card Content */}
                    <Cards2 info={cards} onchange={()=>setChange(change+1)}/>
                
                  </div>)
        })}
 
     </div>
    )
  }
  export default Wishlist;