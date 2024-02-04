
function TabButton({children}){
  return (
    <li className="list-none text-base font-normal">
    <button className=" w-full"><p className="text-center py-[20px] hover:bg-gray-300">{children}</p></button>
    </li>
  )

}
const catagories=["men","women","children"];
export default function Page3() {

  return(
    
    < >
    <nav className=' h-[4rem] w-full p-5 flex items-center justify-center basis-0 bg-[#eeeeee]'>
      <i className="fa-solid fa-arrow-left cursor-pointer "></i>
      <h1 className="grow p-20 font-bold">POST YOUR AD</h1>
    </nav>
    <div className="h-auto mt-[30px] bg-white rounded-lg w-3/5 m-auto border-black border-2">
          <h6 className="p-5 border-b-2 border-black/20">CHOOSE A CATEGORY</h6><hr className="h-[5px]"/>
          {catagories.map((item)=>{
            return <TabButton>{item}</TabButton>
          })}
    </div>
    </>
      
  )
}