import React, { useEffect, useState } from 'react';
import './assets/scss/style.scss';
import { BrowserRouter } from 'react-router-dom';
import { useStomp } from './hooks/useStomp';
import { Route, Routes, useParams } from 'react-router';
import { getRooms } from './API/getRooms';
import { getUserData } from './API/getUserData';
import AllMessage from './components/AllMessage';

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
					path="*"
					element={
					<AllMessage
						rooms={rooms}
					/>}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
