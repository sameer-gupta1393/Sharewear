import {
    FiEdit,
    FiChevronDown,
    FiTrash,
    FiShare,
    FiPlusSquare,
  } from "react-icons/fi";
  import { motion } from "framer-motion";
  import { Dispatch, SetStateAction, useState } from "react";
 
  
  const Filter = () => {
    const [open, setOpen] = useState(false);
  
    return (
      <div className="pt-8 pb-56 flex items-center justify-center w-[15vw]">
        <motion.div animate={open ? "open" : "closed"} className="relative">
          <button
            onClick={() => setOpen((pv) => !pv)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
          >
            <span className="font-medium text-sm">FILTER</span>
            <motion.span variants={iconVariants}>
              <FiChevronDown />
            </motion.span>
          </button>
  
          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "-50%" }}
            className="flex flex-col   rounded-lg   absolute   left-[50%] w-[15vw]  "
          >
            <Section1 setOpen={setOpen} Icon={FiEdit} text="Edit" />
            <Section2 setOpen={setOpen} Icon={FiPlusSquare} text="Duplicate" />
            <Section3 setOpen={setOpen} Icon={FiShare} text="Share" />
            {/* <Option setOpen={setOpen} Icon={FiTrash} text="Remove" /> */}
          </motion.ul>
        </motion.div>
      </div>
    );
  };
  
  const  Section1 = ({ text, Icon, setOpen }) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 w-full  text-xs font-medium whitespace-nowrap rounded-md   text-slate-700   transition-colors cursor-pointer"
      >
       
       <div className='inline-block w-[15vw]  h-fit  mt-[2vh] bg-white p-6 rounded-lg shadow-lg'>
          <p className='font-semibold text-[15px] text-center mt-[1vh] mb-4'>Filter by Distance</p>
          
          <div className='border-t-2 border-black/15'>
           
          </div>
        </div>
      </motion.li>
    );
  };
  const  Section2 = ({ text, Icon, setOpen }) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 w-full  text-xs font-medium whitespace-nowrap rounded-md   text-slate-700   transition-colors cursor-pointer"
      >
       
       <div className='inline-block w-[15vw]  h-fit  mt-[2vh] bg-white p-6 rounded-lg shadow-lg'>
          <p className='font-semibold text-[15px] text-center mt-[1vh] mb-4'>Filter by Distance</p>
          
          <div className='border-t-2 border-black/15'>
           
          </div>
        </div>
      </motion.li>
    );
  };
  const  Section3 = ({ text, Icon, setOpen }) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 w-full  text-xs font-medium whitespace-nowrap rounded-md   text-slate-700   transition-colors cursor-pointer"
      >
       
       <div className='inline-block w-[15vw]  h-fit  mt-[2vh] bg-white p-6 rounded-lg shadow-lg'>
          <p className='font-semibold text-[15px] text-center mt-[1vh] mb-4'>Filter by Distance</p>
          
          <div className='border-t-2 border-black/15'>
           
          </div>
        </div>
      </motion.li>
    );
  };
  
  
  export default  Filter;
  
  const wrapperVariants = {
    open: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      scaleY: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };
  
  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };
  
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        when: "afterChildren",
      },
    },
  };
  
  const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
  };