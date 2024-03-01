import React, { useEffect, useState } from 'react';
import './assets/scss/style.scss';
import { BrowserRouter } from 'react-router-dom';
import { useStomp } from './hooks/useStomp';
import { Route, Routes, useParams } from 'react-router';
import Chat from './pages/Chat';
import Room from './components/Room';
import { routeNames } from './router/RouteNames';
import { getRooms } from './API/getRooms';
import { getUserData } from './API/getUserData';
import ModalRoom from './components/ModalRoom';
import { Divider } from 'antd';
import setMessagesRead from './utils/setMessageRead';

function App() {
	const [connectWS, isConnected, sendNewMessage, newMessage] = useStomp();
	const [rooms, setRooms] = useState([]);
	const [roomsIsLoading, setRoomsLoading] = useState(true);
	const userID = localStorage.getItem('userID');
	const params = useParams();
	console.log(params);

	useEffect(() => {
		if (!isConnected) {
			connectWS();
		}
	}, [isConnected, connectWS]);

	useEffect(() => {
		if (
			localStorage.getItem('jwtToken') &&
			localStorage.getItem('exchangeName')
		) {
			getRooms(0).then((chatRooms) => {
				console.log('chatRooms', chatRooms);
				setRooms(chatRooms);
				setRoomsLoading(false);
			});

		
		}
		if (!userID) {
			getUserData().then((resp) => localStorage.setItem('userID', resp.userId));
		}
	}, [newMessage]);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={routeNames.chat}
					element={
						<Chat
							rooms={rooms}
							setRooms={setRooms}
							roomsIsLoading={roomsIsLoading}
							setRoomsIsLoading={setRoomsLoading}
						/>
					}>
					<Route
						path=":id"
						element={
							<Room
								rooms={rooms}
								setRooms={setRooms}
								newMess={newMessage}
								userChatId={parseInt(userID)}
								AddNewMessage={sendNewMessage}
							/>
						}
					/>
				</Route>
				<Route
					path="*"
					element={
						<ModalRoom
							newMess={newMessage}
							userChatId={parseInt(userID)}
							AddNewMessage={sendNewMessage}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
