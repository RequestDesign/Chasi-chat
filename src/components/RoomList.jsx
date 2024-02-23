import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import SnippetsOutlined from "@ant-design/icons/lib/icons/SnippetsOutlined";
import {routeNames} from "../router/RouteNames";

const RoomList = ({rooms, setRooms}) => {
	const [hideUnread, setHideUnread] = useState(rooms.map(() => true))

	useEffect(() => {
		console.log('---ROOMS---')
		console.log(rooms)
		console.log('-----------')
	},[])

	return (
		rooms.length && rooms.map((room, index) =>
			<NavLink to={routeNames.chat + '/' + room.dialogId} onClick={() => {
				console.log(index);
				setRooms([...rooms].map((el) => {
					if (room.dialogId === el.dialogId) {
						return {...el, unreadMessages: 0 };
					} else {
						return el;
					}
				}))
				setHideUnread([...hideUnread].map((el, ind) => {
					if (index === ind) {
						return false;
					} else {
						return el;
					}
				}))
			}} className={hideUnread[index] ? "chat__dialogs__item" : "chat__dialogs__item hide-unread"} key={index}>
				<div className="chat__dialogs__photo">
					<div>{}</div>
					<img src="./assets/images/rolex-2.webp" alt="Product" />
				</div>
				<div className="chat__dialogs__data">
					<div className="chat__dialogs__product">{room.name}</div>
					<div className="chat__dialogs__message">{room.content}</div>
				</div>
				<div className="chat__dialogs__details">
					<div className="chat__dialogs__time">{(new Date(room.timestamp).getHours()).toString().padStart(2, '0')}:{(new Date(room.timestamp).getMinutes()).toString().padStart(2, '0')}</div>
					<div className={room.unreadMessages ? "chat__dialogs__unread-messages" : "chat__dialogs__unread-messages hidden"}>{room.unreadMessages}</div>
				</div>
			</NavLink>
		)
	);
};

export default RoomList;
