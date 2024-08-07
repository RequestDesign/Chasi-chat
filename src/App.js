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
import {createRoom} from "./API/createRoom";

function App() {
	const [connectWS, isConnected, sendNewMessage, newMessage] = useStomp();
	const [rooms, setRooms] = useState([]);
	const [roomsIsLoading, setRoomsLoading] = useState(true);
	const userID = localStorage.getItem('userID');
	const params = useParams();

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
				setRooms(chatRooms);
				setRoomsLoading(false);
			});
		}
		if (!userID) {
			getUserData().then((resp) => localStorage.setItem('userID', resp.userId));
		}
	}, [newMessage]);

	// useEffect(() => {
	// 	const button = document.querySelector(".creating-room");

	// 	if(button) {
	// 		button.addEventListener("click", (event) => {
	// 			if(button.getAttribute('data-userId')) {
	// 				createRoom(Number(button.getAttribute('data-userId')))
	// 				.then((e) => {
	// 					console.log(e.dialogId);
	// 				});
	// 			}
	// 		});
	// 	}

	// }, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={'/test'}
					element={<p>test</p>}
				/>
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
					path={routeNames.chat_app}
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
