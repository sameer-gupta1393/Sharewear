import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
    const auth_id=JSON.parse(localStorage.getItem('user'))._id
	useEffect(() => {
	console.log("it renders")
		const getMessages = async () => {
			
			setLoading(true);
			try {
				const res = await fetch(`http://localhost:5000/api/messages/${selectedConversation._id}?_id=${auth_id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
				console.log(data)
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;