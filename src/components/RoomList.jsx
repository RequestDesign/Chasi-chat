import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useLocation  } from 'react-router-dom';
import SnippetsOutlined from '@ant-design/icons/lib/icons/SnippetsOutlined';
import setMessagesRead from '../utils/setMessageRead';
import { routeNames } from '../router/RouteNames';

const RoomList = ({ rooms, setRooms }) => {
	const [hideUnread, setHideUnread] = useState(rooms.map(() => true))

	const params = useParams();
	const dId = params.id;

	const checkRooms = (room) => {
		console.log(room);
		document.querySelector("body").style.overflow = "auto";
		if(document.querySelector('.footer')) {
			document.querySelector('.footer').style.display = "block"
		}
		const admin = Number(localStorage.getItem('userID'))
		if (admin !== 82830) {
			let check = room.users.filter((user) => user.userId !== 82830)
			return check.length === 2 ? false : true
		}
		else {
			return false
		}
	};
	let route
	if(RegExp('\\b'+ 'chat' +'\\b').test(useLocation().pathname)) {
		route = routeNames.chat
	}
	if(RegExp('\\b'+ 'chat_app' +'\\b').test(useLocation().pathname)) {
		route = routeNames.chat_app
	}

	return (
		<>
			{rooms.length &&
				rooms.map((room, index) => (
					<>
					{checkRooms(room) ? false :  
						
					<NavLink to={route + '/' + room.dialogId} onClick={() => {
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
					}}
						className={`chat__dialogs__item chat__box-item ${
							room.dialogId === dId ? 'active' : ''
						}`
					}
						key={index}>
						<div className="chat__dialogs__photo">
							<div>{}</div>
							<img
								src={room.users.filter((user) => user.userId !== Number(localStorage.getItem('userID')))[0].avatar}
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
								<div className={room.unreadMessages ? "chat__dialogs__unread-messages" : "chat__dialogs__unread-messages hidden"}>
									{room.unreadMessages}
								</div>
							)}
						</div>
					</NavLink>
					}
					</>
				)
			)}

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
