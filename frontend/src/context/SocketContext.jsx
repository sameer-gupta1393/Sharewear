import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const  auth_id=JSON.parse(localStorage.getItem('user'))?._id;
   
	useEffect(() => {
		if (auth_id) {
			const socket = io("http://localhost:5000/", {
				query: {
					userId: auth_id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			 
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [auth_id]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};