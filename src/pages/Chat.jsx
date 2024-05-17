import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import RoomList from '../components/RoomList';
import Loading from '../components/Loading';
import { Outlet, useParams } from 'react-router';
import { getRooms } from '../API/getRooms';
import { Support } from '../components/Support';

const Chat = ({ rooms, setRooms, roomsIsLoading, setRoomsIsLoading }) => {
	const [allRoomsRender, setAllRoomsRender] = useState(false);
	const [curPage, setCurPage] = useState(0);

	const params = useParams();

	const getPageDialogs = (page) => {
		setRoomsIsLoading(true);
		getRooms(page).then((roomsresp) => {
			if (roomsresp.length < 25) {
				setAllRoomsRender(true);
			}
			setRooms([...rooms, roomsresp]);
			setRoomsIsLoading(false);
			console.log(roomsresp);
		});
	};

	const infiniteScroll = (val) => {
		if (!allRoomsRender) {
			if (val.top > 0.9) {
				if (!roomsIsLoading) {
					getPageDialogs(curPage + 1);
					setCurPage(curPage + 1);
				}
			}
		}
	};

	return (
		<div className="chat__content">
			<div className="chat__dialogs">
				<p className="chat__dialogs-title desktop">Сообщения</p>
				<div className="chat__dialogs__header mobile">
					<div className="btn--go-back" onClick={() => {
						window.location.href = window.location.origin + '/profile/'}}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
							<path d="M15 18L9 12L15 6" stroke="#031E16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
                    <span className="title">Сообщения</span>
                </div>
				<Support rooms={rooms} />
				{rooms.length > 0 ? (
					<div className="chat__dialogs__list">
						<RoomList
							rooms={rooms}
							setRooms={setRooms}
						/>
						{roomsIsLoading && (
							<div>
								<Loading />
							</div>
						)}
					</div>
				) : (
					<div>
						<Loading />
					</div>
				)}
			</div>
			{params.id ? (
				<div className="chat__dialog active" >
					<Outlet />
				</div>
				) : (
				<div className="chat__dialog" >
					<p className="chat__dialog-salutation">
						Выберите, кому бы вы хотели написать
					</p>
				</div>
			)}
			{/* <div className="chat__dialog" >
				{params.id ? (
					<Outlet />
				) : (
					<p className="chat__dialog-salutation">
						Выберите, кому бы вы хотели написать
					</p>
				)}
			</div> */}
		</div>
	);
};

export default Chat;
