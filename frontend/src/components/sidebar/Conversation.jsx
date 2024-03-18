// import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
 
	const isSelected = selectedConversation?._id === conversation._id;
	// const isSelected =  true;
	// const { onlineUsers } = useSocketContext();
	
	// const isOnline = onlineUsers.includes(conversation._id);
	const isOnline =  true;

	return (
		<>
			<div
				className={`flex gap-2 items-center bg-blue-100 hover:bg-blue-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-blue-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				{/* <div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src="ho.jpeg"
						// {conversation.profilePic}
						 alt='user avatar' />
					</div> */}
					
				

				{/* </div> */}
				<div className={`avatar relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
					<svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
				</div>
				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>
						{conversation.name}
						 
						</p>
						<span className='text-xl'>
						{emoji}
						
						</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;

 