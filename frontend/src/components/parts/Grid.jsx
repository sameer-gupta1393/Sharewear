import React from "react"
import Cards from "./Cards";
const Grid=()=>{
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