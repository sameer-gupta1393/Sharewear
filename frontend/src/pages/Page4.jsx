import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
 
import { Carousel } from "@material-tailwind/react";
 
import { useEffect, useState } from "react";
  export default function EcommerceCard() {
    

    const [data,setData]=useState([])
    const auth=JSON.parse(localStorage.getItem('user'))._id;
    
    async function getProductArray() {
     try {
       const response = await fetch(`http://localhost:5000/products?userID=${auth}`);
   
       if (response.ok) {
         const data2 = await response.json();
         if(data2.err){
            setData([])
         }
         else{
          setData(data2)
          console.log(data2)
         }
         
       } else {
         const errorData = await response.json();
         console.error('Error:', errorData);
       }
     } catch (error) {
       console.error('Fetch error:', error);
     }
   }
   
   useEffect(()=>{
     // Example usage
     console.log("check ceck")
     if(auth) getProductArray();
   },[])
// ... Other imports

const ProductCard = (props) => {
  const card = props.info[0].productImg;
  const { productName, productPrice, productDesc } = props.info[0];

  console.log(card);

  return (
    <Card className="w-full">
      <CardHeader shadow={false} floated={false} className="h-[200px]">
        <Carousel className="rounded-xl page2div5">
          {card[0]  && (
            <img
              src={card[0]}
              alt="image 1"
              className="h-full w-full object-cover object-center"
            />
          )}
          {card[1] && (
            <img
              src={card[1]}
              alt="image 1"
              className="h-full w-full object-cover object-center"
            />
          )}
          {card[2] && (
            <img
              src={card[2]}
              alt="image 1"
              className="h-full w-full object-cover object-center"
            />
          )}
          {card[3] && (
            <img
              src={card[3]}
              alt="image 1"
              className="h-full w-full object-cover object-center"
            />
          )}
        </Carousel>
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {productName}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            <span className="bg-green-500 text-white rounded-md px-1">
              <span className="text-[15px]">₹ &nbsp;</span>
              <span className="text-[15px] ">{productPrice}</span>
            </span>
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {productDesc}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-red-500 text-white px-2 py-1 rounded-lg focus:outline-none hover:bg-red-600"
        >
          REMOVE
        </Button>
      </CardFooter>
    </Card>
  );
};


    return (
        <div className="col-span-3 p-2 overflow-hidden grid grid-cols-3 gap-4 ">
       
       { 
        
        data.map((item,id)=>{
         return (
            <div key={id} className="flex items-stretch  "> 
               <ProductCard info={item} />
            </div>
         )
       }
       )}
      
     
      </div>
    );
  }