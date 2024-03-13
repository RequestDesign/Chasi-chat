import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import SnippetsOutlined from '@ant-design/icons/lib/icons/SnippetsOutlined';
import setMessagesRead from '../utils/setMessageRead';
import { routeNames } from '../router/RouteNames';

const RoomList = ({ rooms, setRooms }) => {

	const params = useParams();
	const dId = params.id;

	return (
		<>
			{rooms.length &&
				rooms.map((room, index) => (
					<NavLink
						to={routeNames.chat + '/' + room.dialogId}
						className={`chat__dialogs__item chat__box-item ${
							room.dialogId === dId ? 'active' : ''
						}`}
						key={index}>
						<div className="chat__dialogs__photo">
							<div>{}</div>
							<img
								src={room.image}
								alt="Avatar of sender	"
							/>
						</div>
						<div className="chat__dialogs__data">
							<div className="chat__dialogs__product">{room.name}</div>
							<div className="chat__dialogs__message">{room.content}</div>
						</div>
						<div className="chat__dialogs__details">
							<div className="chat__dialogs__time">
								{new Date(room.timestamp)
									.getHours()
									.toString()
									.padStart(2, '0')}
								:
								{new Date(room.timestamp)
									.getMinutes()
									.toString()
									.padStart(2, '0')}
							</div>
							{room.unreadMessages > 0 && (
								<div className="chat__dialogs__unread-messages">
									{room.unreadMessages}
								</div>
							)}
						</div>
					</NavLink>
				))}

			{/* {Array.from({ length: 10 }, (_, index) => index + 1).map((_, index) => {
				return (
					<NavLink
						key={index}
						to={''}
						className={`chat__dialogs__item`}>
						<div className="chat__dialogs__photo">
							<div>{}</div>
							<img
								src={
									'https://img.freepik.com/free-photo/bright-petals-gift-love-in-a-bouquet-generated-by-ai_188544-13370.jpg?size=626&ext=jpg&ga=GA1.1.1292351815.1709078400&semt=ais'
								}
								alt="Avatar of sender	"
							/>
						</div>
						<div className="chat__dialogs__data">
							<div className="chat__dialogs__product">room.name</div>
							<div className="chat__dialogs__message">room.content</div>
						</div>
						<div className="chat__dialogs__details">
							<div className="chat__dialogs__time">123123123</div>
						</div>
					</NavLink>
				);
			})} */}
		</>
	);
};

export default RoomList;
