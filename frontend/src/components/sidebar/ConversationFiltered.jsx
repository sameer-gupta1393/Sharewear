import Conversation from "./Conversation";
import { useParams } from "react-router-dom";
import { getRandomEmoji } from "../utils/emojis";
import useGetConversationsfiltered from "../../hooks/useGetConversationsfiltered";
const ConversationsFiltered = () => {
    let {userID}= useParams();
	const { loading, conversations } = useGetConversationsfiltered(userID);

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}
           
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default ConversationsFiltered;