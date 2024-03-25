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
  return (
    <div className="parentGridPage2    h-[80vh] "> 
    <Carousel className="rounded-xl page2div5">
      <img
        src="https://projectbandi.com/cdn/shop/products/IMG_5995.jpg?v=1573801843"
        alt="image 1"
        className="h-full w-full object-cover object-center"
      />
      <img
        src="https://projectbandi.com/cdn/shop/products/IMG_5989_700x@2x.jpg?v=1573801843"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://projectbandi.com/cdn/shop/products/IMG_5987_700x@2x.jpg?v=1573801843"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
    <div className="page2div4 bg-white rounded-lg p-[10px] mt-[10px]">
        <h2><span className="font-bold">Product: </span> {info.productCard.productName}</h2>
    </div>
    <div className="page2div3 bg-white rounded-lg p-[10px] mt-[10px]">
        <h2><span className="font-bold">Product description: </span> Kurta size india:L</h2>
    </div>
    <div className="page2div1 bg-white rounded-lg p-[10px]  ml-[10px]">
        <h2 className="text-[20px]"> <span className="font-bold ">Product Price: </span><b>Rs</b>{info.productCard.productPrice}</h2>
    </div>
    <div className="page2div2 bg-white rounded-lg p-[10px] ml-[10px] mt-[10px]">
        <h2 className="text-[20px]"><span className="font-bold">Product Location: </span> {info.productCard.productLoc}</h2>
    </div>
    <div className="page2div6 bg-white rounded-lg p-[10px]  ml-[10px] mt-[10px] grid">
    <button type="button" className=" m-auto text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center   ">
      Chat with Seller
    </button>
    </div>
    </div>
  );
}