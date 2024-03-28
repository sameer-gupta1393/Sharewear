import { Carousel } from "@material-tailwind/react";
import { useEffect ,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
export default function  Page2() {
  let {sellerId,productId}= useParams();
  const navigate=useNavigate();
   
  let auth=localStorage.getItem('user');
  const [info,setInfo]=useState({name:"",sellerId:"",productCard:""})
  const getProduct =async(req,res)=>{
    const response=await fetch(`/api/getProducts/${sellerId}/${productId}`)
    const data =await response.json()
    console.log(data.name,data.sellerId,data.productCard[0][0])
    setInfo({name:data.name,sellerId:data.sellerId,productCard:data.productCard[0][0]})
  }
  useEffect(()=>{
    if(auth){
      getProduct()
    }
    else{
      navigate('/signup')
    }
  },[])
  
  return (info.productCard?.productImg)?(
    
    <div className="parentGridPage2    h-[80vh] "> 
    
    <Carousel className="rounded-xl page2div5">
     
    {info.productCard?.productImg[0] && <img
        src={info.productCard.productImg[0]}
        alt="image 1"
        className="h-full w-full object-cover object-center"
      />}
      
      {info.productCard?.productImg[1] && <img
        src={info.productCard.productImg[1]}
        alt="image 1"
        className="h-full w-full object-cover object-center"
      />}
      {info.productCard?.productImg[2] && <img
        src={info.productCard.productImg[2]}
        alt="image 1"
        className="h-full w-full object-cover object-center"
      />}
       {info.productCard?.productImg[3] && <img
        src={info.productCard.productImg[3]}
        alt="image 1"
        className="h-full w-full object-cover object-center"
      />}
    </Carousel>
    <div className="page2div4 bg-white rounded-lg p-[10px] mt-[10px]">
        <h2><span className="font-bold">Product: </span> {info.productCard.productName}</h2>
    </div>
    <div className="page2div3 bg-white rounded-lg p-[10px] mt-[10px]">
        <h2><span className="font-bold">Product description: </span> {info.productCard.productDesc}</h2>
    </div>
    <div className="page2div1 bg-white rounded-lg p-[10px]  ml-[10px]">
        <h2 className="text-[20px]"> <span className="font-bold ">Product Price: </span><b>Rs</b>{info.productCard.productPrice}</h2>
    </div>
    <div className="page2div2 bg-white rounded-lg p-[10px] ml-[10px] mt-[10px]">
        <h2 className="text-[20px]"><span className="font-bold">Product Location: </span> {info.productCard.productLocation}</h2>
    </div>
    <div className="page2div6 bg-white rounded-lg p-[10px]  ml-[10px] mt-[10px] grid">
    <button type="button" className=" m-auto text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center   ">
      Chat with Seller
    </button>
    </div>
    </div>
  ):(<></>);
}