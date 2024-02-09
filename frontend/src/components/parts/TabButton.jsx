import { useEffect,useState ,useRef} from "react";
import Google from "./Google";
import { addUser,addUserCard } from "../utils/userSlice";
import { useDispatch } from "react-redux";

export default function TabButton( ){
    const [selectedValue, setSelectedValue] = useState([]);
    //setting images 
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();
    const [file3, setFile3] = useState();
    const [file4, setFile4] = useState();
    const dispatch=useDispatch()
    function handleChange1(e) {
        if(e.target.files.length!=0){
        console.log(e.target.files);
        setFile1(URL.createObjectURL(e.target.files[0]));
    }else{
        setFile1(null)
    }
    }
    function handleChange2(e) {
        if(e.target.files.length!=0){
        console.log(e.target.files);
        setFile2(URL.createObjectURL(e.target.files[0]));
    }else{
        setFile2()
    }
    }
    function handleChange3(e) {
        if(e.target.files.length!=0){
        console.log(e.target.files);
        setFile3(URL.createObjectURL(e.target.files[0]));
    }else{
        setFile3()
    }
    }
    function handleChange4(e) {
        if(e.target.files.length!=0){
        console.log(e.target.files);
        setFile4(URL.createObjectURL(e.target.files[0]));
    }else{
        setFile4()
    }
    }

   
    const handleSelectChange = (event) => {
      const data=[event[0]?.value,event[1]?.value,event[2]?.value,event[3]?.value,event[4].value,event[5]?.value,event[6]?.value,event[7].value,event[8].value,event[9].value]
      setSelectedValue(data);
    dispatch(addUser({location:event[9].value}))
    dispatch(addUserCard([{productCat:event[0].value,productName:event[1].value,productDesc:event[2].value,productPrice:event[3].value,productImg:[{img1:event[4].value,img2:event[5].value,img3:event[6].value,img4:event[7].value}],productLoc:event[8].value,productCoord:event[9].value}]))
      
    };
    useEffect(()=>{
    console.log(selectedValue)
    },[selectedValue])
    return (
   <div>
  
    <section className="bg-gray-100 dark:bg-gray-900">
     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
       
      <div className="w-full bg-white rounded-lg shadow dark:border md:my-10 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                      <label htmlFor="productImg1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Images   </label>
                      <input type="file"  name="productImg1" onChange={handleChange1} accept="image/*" id="file1" className="hidden bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your product rent amount" required=""/>
                      <input type="file" name="productImg2" onChange={handleChange2} accept="image/*" id="file2" className="hidden bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your product rent amount" />
                      <input type="file" name="productImg3" onChange={handleChange3} accept="image/*" id="file3" className="hidden bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your product rent amount" />
                      <input type="file" name="productImg4" onChange={handleChange4} accept="image/*" id="file4" className="hidden bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your product rent amount" />
                   <div className="inline-flex border-2   m-auto p-[10px]">
                      {file1?<div className="h-[50px] relative w-[60px]   inline-flex justify-center items-center mr-[10px] border-2 border-black border-dashed">
                      <i onClick={()=>{setFile1(""); document.getElementById("file1").value=null; }} className="fa-solid absolute right-0 top-0 text-red-400 fa-circle-xmark"></i>
                        <img src={file1} className="h-[45px] w-[53px] " /></div>:<div className="h-[50px] w-[60px]   inline-flex justify-center items-center mr-[10px] border-2 border-black border-dashed" 
                      onClick={()=>{document.getElementById("file1").click();}}>

                         <svg xmlns="http://www.w3.org/2000/svg" className="h-[30px]" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm.008-12c.548 0 .992.445.992.993v9.349A5.99 5.99 0 0 0 20 13V5H4l.001 14 9.292-9.293a.999.999 0 0 1 1.32-.084l.093.085 3.546 3.55a6.003 6.003 0 0 0-3.91 7.743L2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016zM8 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/> </g> 
                         </svg>
                      </div>}
                      {file2?<div className="h-[50px] w-[60px]  relative inline-flex justify-center items-center mr-[10px] border-2 border-black border-dashed">
                      <i onClick={()=>{setFile2(""); document.getElementById("file2").value=null;}} className="fa-solid absolute right-0 top-0 text-red-400 fa-circle-xmark"></i>
                      <img src={file2} className="h-[45px] w-[53px] " /></div>:<div className="h-[50px] w-[60px]   inline-flex justify-center items-center mr-[10px] border-2 border-black border-dashed" 
                      onClick={()=>{document.getElementById("file2").click();}}>
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-[30px]" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm.008-12c.548 0 .992.445.992.993v9.349A5.99 5.99 0 0 0 20 13V5H4l.001 14 9.292-9.293a.999.999 0 0 1 1.32-.084l.093.085 3.546 3.55a6.003 6.003 0 0 0-3.91 7.743L2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016zM8 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/> </g> 
                         </svg>
                      </div>}
                      {file3?<div className="h-[50px] w-[60px]  relative inline-flex justify-center items-center mr-[10px] border-2 border-black border-dashed">
                      <i onClick={()=>{setFile3(""); document.getElementById("file3").value=null;}} className="fa-solid absolute right-0 top-0 text-red-400 fa-circle-xmark"></i>
                      <img src={file3} className="h-[45px] w-[53px] " /></div>: <div className="h-[50px] w-[60px]   inline-flex justify-center items-center mr-[10px] border-2 border-black border-dashed" 
                      onClick={()=>{document.getElementById("file3").click();}}>
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-[30px]" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm.008-12c.548 0 .992.445.992.993v9.349A5.99 5.99 0 0 0 20 13V5H4l.001 14 9.292-9.293a.999.999 0 0 1 1.32-.084l.093.085 3.546 3.55a6.003 6.003 0 0 0-3.91 7.743L2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016zM8 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/> </g> 
                         </svg>
                      </div>}
                      {file4?<div className="h-[50px] w-[60px]  relative inline-flex justify-center items-center mr-[10px] border-2 border-black border-dashed">
                      <i onClick={()=>{setFile4(""); document.getElementById("file4").value=null;}} className="fa-solid absolute right-0 top-0 text-red-400 fa-circle-xmark"></i>
                      <img src={file4} className="h-[45px] w-[53px] " /></div>: <div className="h-[50px] w-[60px]   inline-flex justify-center items-center mr-[10px] border-2 border-black border-dashed" 
                      onClick={()=>{document.getElementById("file4").click();}}>
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-[30px]" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm.008-12c.548 0 .992.445.992.993v9.349A5.99 5.99 0 0 0 20 13V5H4l.001 14 9.292-9.293a.999.999 0 0 1 1.32-.084l.093.085 3.546 3.55a6.003 6.003 0 0 0-3.91 7.743L2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016zM8 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/> </g> 
                         </svg>
                      </div>}
                      </div>
                  </div>
                <Google/>
                  <button type="submit"   className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Rent</button>
                  
              </form>
          </div>
      </div>
  </div>
</section>
</div>
    )
    }