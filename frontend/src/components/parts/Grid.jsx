import React,{useEffect} from "react"
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";
const Grid=()=>{
  const navigate=useNavigate()
  const auth=localStorage.getItem("user")
  useEffect(()=>{
    if(auth){

    }else{
      navigate("/login")
    }
  })
    return (
      
       /* Main Content Grid */
       <div className="col-span-3 p-2 overflow-hidden grid grid-cols-3 gap-4">
       {/* Card 1 */}
       <div className="flex items-stretch ">
         {/* Card Content */}
         <Cards/>
       </div>

       {/* Card 2 */}
       <div className="flex items-stretch  ">
         {/* Card Content */}
         <Cards/>
       </div>

       {/* Card 3 */}
       <div className="flex items-stretch  ">
         {/* Card Content */}
          <Cards/>
       </div>

       {/* Card 4 */}
       <div className="flex items-stretch  ">
         {/* Card Content */}
          <Cards/>
       </div>
       <div className="flex items-stretch ">
         {/* Card Content */}
         <Cards/>
       </div>

       {/* Card 2 */}
       <div className="flex items-stretch  ">
         {/* Card Content */}
         <Cards/>
       </div>

       {/* Card 3 */}
       <div className="flex items-stretch  ">
         {/* Card Content */}
          <Cards/>
       </div>

       {/* Card 4 */}
       <div className="flex items-stretch  ">
         {/* Card Content */}
          <Cards/>
       </div>
     </div>
    )
  }
  export default Grid;