import {useState} from 'react';

import TabButton from './parts/TabButton';

const catagories=["MEN","WOMEN","CHILDREN"];

export default function Page3() {
  const [cate,setCate]=useState('');
  const handleCLick=(n)=>{
    setCate(n);
  }
  return(
    
    < >
    <nav className=' h-[4rem] w-full p-5 flex items-center justify-center basis-0 bg-[#eeeeee]'>
      <i className="fa-solid fa-arrow-left cursor-pointer "></i>
      <h1 className="grow p-20 font-bold">POST YOUR AD</h1>
    </nav>
  
    <TabButton />

    </>
      
  )
}