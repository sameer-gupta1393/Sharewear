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

    {/* <div className="h-auto mt-[30px] bg-white rounded-lg w-3/5 m-auto border-black border-2">
          <h6 className="p-5 border-b-2 border-black/20 font-bold">CHOOSE A CATEGORY</h6><hr className="h-[5px]"/>
          {catagories.map((item,id)=>{
            return <TabButton click={()=>{handleCLick(id)}} key={id}>{item}</TabButton>
          })}
    </div>

    <section>
      <div><h2>SELECTED CATEGORY</h2>
      <p> {catagories.filter((item,id)=>{
            return  cate==id
          })}</p>
      </div>
    </section> */}
  
    <TabButton />

    </>
      
  )
}