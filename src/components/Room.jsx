import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Loading from './Loading';
import { Scrollbars } from 'react-custom-scrollbars';
import { Mentions, Upload } from 'antd';
import CSSTransition from 'react-transition-group/cjs/CSSTransition';
import TransitionGroup from 'react-transition-group/cjs/TransitionGroup';
import { chatHostName } from '../API/HostNames';
import { getRoom } from '../API/getRoom';
import setMessagesRead from '../utils/setMessageRead';
import UserMessage from './UserMessage';

const Room = ({
	userChatId,
	newMess,
	AddNewMessage,
	modalId,
	rooms,
	setRooms,
}) => {
	const { Option } = Mentions;
	const [prefix, setPrefix] = useState('@');
	const chatScroll = useRef();
	const [userText, setUserText] = useState('');
	const [roomName, setRoomName] = useState('');
	const [dId, setDialogId] = useState();
	const [user, setUser] = useState({});
	const [messages, setMessages] = useState([]);
	const [roomIsLoading, setRoomIsLoading] = useState(true);
	const [fileList, setFileList] = useState([]);

	const params = useParams();

	useEffect(() => {
		setDialogId(modalId || params.id);
	}, [params.id, modalId]);

	const MOCK_DATA = {
		'@': ['user1', 'user2', 'user3'],
		'#': ['11111111111', '22222222222', '3333333333'],
	};

	const chatScrollUpdate = () => {
		if (chatScroll.current) {
			if (chatScroll.current.getValues().top !== 1) {
				chatScroll.current.scrollToBottom();
			}
		}
	};

	const getPrev = (index) => {
		if (index) {
			return {
				time: new Date(messages[index - 1].timestamp).getMinutes(),
				id: messages[index - 1].sender.userId,
			};
		} else {
			return { id: 0, time: 0 };
		}
	};

	const removeImageHandler = (imageFile) => {
		const updatedList = fileList.filter((item) => item.uid !== imageFile.uid);
		setFileList(updatedList);
	};

	const propsUpl = {
		name: 'files',
		action: chatHostName + '/api/files',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
		},
		accept: 'image/*',
		multiple: true,

		onChange(info) {
			if (info.file.status === 'done') {
				console.log(`Files uploaded!`);
				setFileList((prev) => [...prev, { ...info.file, loading: true }]);
			}
		},
	};

	const selfNewMess = (text) => {
		const obj = {
			content: text,
			dialogId: dId,
			uniqueCode: new Date().valueOf(),
			files: [],
		};
		AddNewMessage(obj);
	};

	const addNewMessage = () => {
		let str = userText?.trim();
		if (str) {
			selfNewMess(str);
			setUserText(null);
		}
	};

	useEffect(() => {
		if (newMess) {
			if (!roomIsLoading) {
				if (parseInt(dId) === parseInt(newMess.dialogId))
					setMessages((st) => [...st, newMess]);

				const currentRoom = rooms.filter(
					(room) => Number(room.dialogId) === Number(dId),
				)[0];

				const updatedRoom = setMessagesRead(rooms, currentRoom);
				setRooms(updatedRoom);
			}
		}
	}, [newMess]);

	useEffect(() => {
		if (dId) {
			getRoom(dId)
				.then((roomData) => {
					setRoomName(roomData.name);
					setMessages(roomData.messages);
					setUser(roomData.users.filter((el) => el.userId !== userChatId)[0]);
				})
				.then(() => {
					setRoomIsLoading(false);
				});
		}
	}, [dId]);

	useEffect(() => {
		chatScrollUpdate();
	}, [messages]);

	return (
		<div className="chat-room">
			<div className="chat__switcher-content">
				<div className="chat__dialog__header">
					{roomIsLoading ? (
						<div className="chat-room__title-loading">
							<Loading />
						</div>
					) : (
						<>
							<div className="btn--go-back btn--close-dialog mobile">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none">
									<path
										d="M15 18L9 12L15 6"
										stroke="#031E16"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<div className="chat__dialog__photo">
								<img
									src={user.avatar}
									alt="User"
								/>
							</div>
							<div className="chat__dialog__data">
								<div className="chat__dialog__product">{user.username}</div>
								<div className="chat__dialog__name">
									{user.lastName} {user.firstName}
								</div>
							</div>
							<a
								href="#"
								className="chat__dialog__phone">
								<span>+7 (000) 123-45-67</span>
								<button className="btn btn__green">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none">
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M10.8581 13.1463C9.6881 11.9763 8.8061 10.6663 8.2201 9.33731C8.0961 9.05631 8.1691 8.72731 8.3861 8.51031L9.2051 7.69231C9.8761 7.02131 9.8761 6.07231 9.2901 5.48631L8.1161 4.31231C7.3351 3.53131 6.0691 3.53131 5.2881 4.31231L4.6361 4.96431C3.8951 5.70531 3.5861 6.77431 3.7861 7.83431C4.2801 10.4473 5.7981 13.3083 8.2471 15.7573C10.6961 18.2063 13.5571 19.7243 16.1701 20.2183C17.2301 20.4183 18.2991 20.1093 19.0401 19.3683L19.6911 18.7173C20.4721 17.9363 20.4721 16.6703 19.6911 15.8893L18.5181 14.7163C17.9321 14.1303 16.9821 14.1303 16.3971 14.7163L15.4941 15.6203C15.2771 15.8373 14.9481 15.9103 14.6671 15.7863C13.3381 15.1993 12.0281 14.3163 10.8581 13.1463Z"
											stroke="white"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</button>
							</a>
						</>
					)}
				</div>
				<div className="chat__dialog__messages">
					<Scrollbars
						autoHide
						ref={chatScroll}>
						{roomIsLoading ? (
							<div>
								<Loading />
							</div>
						) : (
							<>
								<div className="chat__dialog__date">Date</div>
								<div className="chat__dialog__message message--outgoing">
									<div className="message-text">Привет!</div>
									<div className="message-time">23:47</div>
								</div>
								<div className="chat__dialog__message message--incoming">
									<div className="message-text">
										Здесь какой-то текст про часы и про то, как их хочется
										купить, потому что они очень классные...........
									</div>
									<div className="message-time">23:47</div>
								</div>
								<div className="chat__dialog__message message--outgoing">
									<div className="message-text">
										Здесь какой-то текст про часы и про то, как их
									</div>
									<div className="message-time">23:47</div>
								</div>
								<div className="chat__dialog__message message--incoming">
									<div className="message-text">Супер!</div>
									<div className="message-time">23:47</div>
								</div>

								{messages && messages.length > 0 ? (
									<TransitionGroup className="messages-date-wrapper">
										{messages.map((mess, index) => (
											<CSSTransition
												timeout={300}
												key={mess.messageId}
												className="user-message">
												<UserMessage
													message={mess}
													update={() => chatScrollUpdate()}
													prev={getPrev(index)}
													userId={userChatId}
													fileList={fileList}
												/>
											</CSSTransition>
										))}
									</TransitionGroup>
								) : (
									<div className="chat__dialog__messages chat__dialog__messages--empty">
										<span>
											Здесь будет ваша переписка. <br />
											Чат предназначен для решения проблем и ответа на вопросы
										</span>
									</div>
								)}
							</>
						)}
					</Scrollbars>
				</div>
				<div className="chat__dialog__footer">
					{fileList.length > 0 && (
						<div className="chat__dialog__footer__row chat__img-preview-box">
							<ul className="chat__img-preview-list">
								{fileList.map((image, i) => (
									<li
										key={i}
										className="chat__img-preview-item">
										<button
											className="chat__img-preview-item-btn"
											onClick={() => {
												removeImageHandler(image);
											}}>
											<svg
												width="28"
												height="28"
												viewBox="0 0 28 28"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<rect
													x="1"
													y="1"
													width="26"
													height="26"
													rx="13"
													fill="#1D7D4D"
												/>
												<rect
													x="1"
													y="1"
													width="26"
													height="26"
													rx="13"
													stroke="white"
													stroke-width="2"
												/>
												<path
													d="M10 10L18 18"
													stroke="white"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
												<path
													d="M18 10L10 18"
													stroke="white"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</button>
										<div className="chat__img-preview-item-img">
											{image.originFileObj && (
												<img
													src={URL.createObjectURL(image.originFileObj)}
													alt={image.name}
												/>
											)}
										</div>
									</li>
								))}
							</ul>
						</div>
					)}
					<div className="chat__dialog__footer__row">
						<Mentions
							autoSize
							style={{ width: '100%' }}
							placeholder="Напишите сообщение"
							value={userText}
							onChange={(value) => setUserText(value)}
							onKeyPress={(e) => {
								if (e.charCode === 13) {
									e.preventDefault();
									addNewMessage();
								}
							}}>
							{(MOCK_DATA[prefix] || []).map((value) => (
								<Option
									key={value}
									value={value}>
									{value}
								</Option>
							))}
						</Mentions>
						<div className="chat__dialog__btns">
							<div className="btn--add-photo">
								<Upload {...propsUpl}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 30 26"
										fill="none">
										<path
											d="M19.3187 10.2521C21.6543 12.5877 21.6543 16.3743 19.3187 18.7098C16.9832 21.0454 13.1966 21.0454 10.861 18.7098C8.52549 16.3743 8.52549 12.5877 10.861 10.2521C13.1966 7.91661 16.9832 7.91661 19.3187 10.2521"
											stroke="#031E16"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M28.5 8.5V22C28.5 23.6575 27.1575 25 25.5 25H4.5C2.8425 25 1.5 23.6575 1.5 22V8.5C1.5 6.8425 2.8425 5.5 4.5 5.5H7.5L9.693 1.744C9.9615 1.2835 10.455 1 10.989 1H18.945C19.4715 1 19.959 1.276 20.2305 1.726L22.5 5.5H25.5C27.1575 5.5 28.5 6.8425 28.5 8.5Z"
											stroke="#031E16"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</Upload>
							</div>
							<div
								className="btn--send"
								onClick={addNewMessage}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 32 32"
									fill="none">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M19.5238 26.5432L26.7984 6.91654C27.1944 5.84721 26.1531 4.80721 25.0851 5.20321L5.45176 12.4832C4.22376 12.9392 4.31976 14.7072 5.59043 15.0259L14.7024 17.3152L16.9784 26.4032C17.2984 27.6752 19.0678 27.7725 19.5238 26.5432V26.5432Z"
										stroke="#031E16"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M26.4937 5.50781L14.707 17.3211"
										stroke="#031E16"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Room;
