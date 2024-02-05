 
import { Link } from 'react-router-dom';
import TabButton from './parts/TabButton';
 
 
export default function Page3() {
 
  return(
    
    < >
    <nav className=' h-[4rem] w-full p-5 flex items-center justify-center basis-0 bg-[#eeeeee]'>
      <Link to="/"><i className="fa-solid fa-arrow-left cursor-pointer "></i></Link>
      <h1 className="grow p-20 font-bold">POST YOUR PRODUCT</h1>
    </nav>
  
    <TabButton />
 
    </>
      
  )
}