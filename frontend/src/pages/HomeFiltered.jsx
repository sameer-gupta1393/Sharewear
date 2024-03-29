import MessagesContainer from "../components/messages/MessagesContainer.jsx";
import SidebarFiltered from "../components/sidebar/SidebarFiltered.jsx";

const HomeFiltered = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-red-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<SidebarFiltered />  
			<MessagesContainer /> 
		</div>
	);
};
export default HomeFiltered;