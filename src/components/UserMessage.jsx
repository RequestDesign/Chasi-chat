import React, { useEffect } from 'react';
import ava from '../assets/img/ava.png';

const UserMessage = ({ message, userId, admin, prev, update }) => {
	const messageClass =
		!message.content.length && message.files.length > 0
			? 'chat__dialog__message message--outgoing  message--only-img'
			: 'chat__dialog__message message--outgoing';

	return (
		<>
			{userId > 0 && message.sender.userId === userId ? (
				<>
					<div className={admin ? messageClass : messageClass}>
						{message.content !== '' && (
							<div className="message-text">{message.content}</div>
						)}
						{message.files.length > 0 &&
							message.files.map((file, index) =>
								file.contentType.includes('image') ? (
									<div
										className="user-message__img user-message__img--self"
										key={index}>
										<img
											onLoad={() => {
												if (update) {
													update();
												}
											}}
											src={file.uri}
											alt=""
										/>
									</div>
								) : (
									<div
										className="user-message__text-wrapper"
										key={index}>
										<div className="user-message__text">
											<a
												target="_blank"
												href={file.uri}>
												{file.originalName}
											</a>
										</div>
									</div>
								),
							)}
						{(prev.time !== new Date(message.timestamp).getMinutes() ||
							prev.id !== message.sender.userId) && (
							<div className="message-time">
								{new Date(message.timestamp)
									.getHours()
									.toString()
									.padStart(2, '0')}
								:
								{new Date(message.timestamp)
									.getMinutes()
									.toString()
									.padStart(2, '0')}
							</div>
						)}
					</div>
				</>
			) : (
				<>
					<div className="chat__dialog__message message--incoming">
						{message.content !== '' && (
							<div className="message-text">{message.content}</div>
						)}
						{message.files.length > 0 &&
							message.files.map((file) =>
								file.contentType.includes('image') ? (
									<div className="user-message__img">
										<img
											onLoad={() => {
												if (update) {
													update();
												}
											}}
											src={file.uri}
											alt=""
										/>
									</div>
								) : (
									<div className="user-message__text-wrapper">
										<div className="user-message__text">
											<a
												target="_blank"
												href={file.uri}>
												{file.originalName}
											</a>
										</div>
									</div>
								),
							)}
						{(prev.time !== new Date(message.timestamp).getMinutes() ||
							prev.id !== message.sender.userId) && (
							<div className="message-time">
								{new Date(message.timestamp).getHours()}:
								{new Date(message.timestamp)
									.getMinutes()
									.toString()
									.padStart(2, '0')}
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default UserMessage;
