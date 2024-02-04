import { useEffect,useState } from "react";

export default function TabButton( ){
    const [selectedValue, setSelectedValue] = useState([]);
    
 
    const handleSelectChange = (event) => {
      const data=[event[0].value,event[1].value,event[2].value,event[3].value]
      setSelectedValue(data);
      
    };
    useEffect(()=>{
    console.log(selectedValue)
    },[selectedValue])
    return (
   <div>
  
    <section className="bg-gray-100 dark:bg-gray-900">
     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Rent Your Product
              </h1>
              <form onSubmit={(e)=>
               { 
                 e.preventDefault();
                  
                 handleSelectChange(e.target);
                  }
                 } 
                className="space-y-4 md:space-y-6"  >
              <div className="relative h-10  w-full mt-[30px] mx-auto">
              <select className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200
                      placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2
                      focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0
                      disabled:bg-blue-gray-50"
                  >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="children">Children</option>
   
                </select>
                <label
                  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Select a  category
                </label>
                  </div>
                  <div>
                      <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Label</label>
                      <input type="text" name="product" id="product" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your product name" required=""/>
                  </div>
                  <div>
                      <label htmlFor="productDesc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product  Description</label>
                      <textarea name="productDesc" id="productDesc" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your product description" required=""/>
                  </div>
                  <div>
                      <label htmlFor="productPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rent Amount 	<b>	&#8377;</b> </label>
                      <input type="number" name="productPrice" id="productPrice" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your product rent amount" required=""/>
                  </div>
                  <div>
                      <label htmlFor="productImg" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Images   </label>
                      <input type="file" multiple name="productImg" id="productImg" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your product rent amount" required=""/>
                  </div>
                   
                  <button type="submit"   className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Rent</button>
                  
              </form>
          </div>
      </div>
  </div>
</section>
</div>
    )
    }