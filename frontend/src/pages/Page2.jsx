import { Carousel } from "@material-tailwind/react";
 
export default function  Page2() {
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
        <h2><span className="font-bold">Product: </span>Kurta</h2>
    </div>
    <div className="page2div3 bg-white rounded-lg p-[10px] mt-[10px]">
        <h2><span className="font-bold">Product description: </span> Kurta size india:L</h2>
    </div>
    <div className="page2div1 bg-white rounded-lg p-[10px]  ml-[10px]">
        <h2 className="text-[20px]"> <span className="font-bold ">Product Price: </span> $200</h2>
    </div>
    <div className="page2div2 bg-white rounded-lg p-[10px] ml-[10px] mt-[10px]">
        <h2 className="text-[20px]"><span className="font-bold">Product Location: </span> Nit Rourkela</h2>
    </div>
    <div className="page2div6 bg-white rounded-lg p-[10px]  ml-[10px] mt-[10px]">
        <h2><span className="font-bold"> chat with seller</span> L</h2>
    </div>
    </div>
  );
}