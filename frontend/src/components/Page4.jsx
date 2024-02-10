import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import {  useSelector } from "react-redux";
import { Carousel } from "@material-tailwind/react";

  export default function EcommerceCard() {
    const data=useSelector((state)=>state.user.users.cards)
  
    const ProductCard=(props)=>{
        const card=props.info[0][0].productImg[0]
        console.log(card)
        return (
            <Card className="">
             <CardHeader shadow={false} floated={false} className="h-[200px]">
                <Carousel className="rounded-xl page2div5">
                    
                            <img  
                                    src={card.img1}
                                    alt="image 1"
                                    className="h-full w-full object-cover object-center"
                                />
                            <img  
                            src={card.img2}
                            alt="image 1"
                            className="h-full w-full object-cover object-center"
                        />
                            <img  
                            src={card.img3}
                            alt="image 1"
                            className="h-full w-full object-cover object-center"
                        />
                            <img  
                            src={card.img4}
                            alt="image 1"
                            className="h-full w-full object-cover object-center"
                        />
           
               
            
            </Carousel>
         </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              Apple AirPods
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              $95.00
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            With plenty of talk and listen time, voice-activated Siri access, and
            an available wireless charging case.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
        )
    }
    return (
        <div className="col-span-3 p-2 overflow-hidden grid grid-cols-3 gap-4 ">
       {/* Card 1 */}
       {data.map((item,id)=>{
         return (
            <div key={id} className="flex items-stretch "> 
               <ProductCard info={item}/>
            </div>
         )
       })}
      
     
      </div>
    );
  }