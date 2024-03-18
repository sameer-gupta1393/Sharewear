 
import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4  w-1/4 flex flex-col bg-gray-400'>
			<p>PREVIOUS CHATS</p>
			<div className='divider px-3'></div>
			<Conversations />
			 
		</div>
	);
};
export default Sidebar;