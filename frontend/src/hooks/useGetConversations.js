import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
    let auth=JSON.parse(localStorage.getItem('user'));
	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/users/${auth._id}`);
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				console.log(data)
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
				console.log("error ")
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;