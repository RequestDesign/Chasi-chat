import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {createRoom} from "../API/createRoom";

export const Support = ({ rooms }) => {
	const sup = 82830;
	const params = useParams();
	const dId = params.id === 'support';

	const checkRooms = () => {
		const room = rooms.filter((x) => x.users.filter((e)=> e.userId === sup).length === 1 )
		const id = room.length ? room[0].dialogId : 0
		return id === Number(params.id) ? true : false
	};
	const adminRoom = () => {
		createRoom(82830)
		.then((e) => {
			localStorage.setItem('idaroom', e.dialogId);
		})
		return localStorage.getItem('idaroom')
	};

	return (
		<Link
			to={`/profile/chat/${adminRoom()}`}
			className={`chat__dialogs__support${checkRooms() ? 'active' : ''}`}>

			<div className={`chat__dialogs__item ${checkRooms() ? 'active' : ''}`}>
				<div className="chat__dialogs__photo">
					<svg className="support-ico" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
						<path
							d="M1.66797 34.9985V34.9985C1.66797 31.6668 4.36797 28.9668 7.69964 28.9668H13.7313C17.063 28.9668 19.763 31.6668 19.763 34.9985V34.9985"
							stroke="#031E16"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M14.4482 15.4327C16.5095 17.494 16.5095 20.8361 14.4482 22.8974C12.3869 24.9587 9.0448 24.9587 6.98349 22.8974C4.92217 20.8361 4.92217 17.494 6.98349 15.4327C9.0448 13.3714 12.3869 13.3714 14.4482 15.4327"
							stroke="#031E16"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M30.1616 23.0127C34.6749 23.0127 38.3349 19.3527 38.3349 14.8393C38.3349 10.326 34.6766 6.66602 30.1616 6.66602C25.6466 6.66602 21.9883 10.326 21.9883 14.8393"
							stroke="#031E16"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M30.1709 23.0215C28.9409 23.0215 27.7759 22.7498 26.7292 22.2648L21.6992 23.3332L22.7509 18.2932C22.2626 17.2432 21.9892 16.0732 21.9892 14.8398"
							stroke="#031E16"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M26.3571 14.9404C26.3896 14.973 26.3896 15.0257 26.3571 15.0583C26.3246 15.0908 26.2718 15.0908 26.2393 15.0583C26.2067 15.0257 26.2067 14.973 26.2393 14.9404C26.2718 14.9079 26.3246 14.9079 26.3571 14.9404"
							stroke="#031E16"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M30.1071 14.9404C30.1396 14.973 30.1396 15.0257 30.1071 15.0583C30.0746 15.0908 30.0218 15.0908 29.9893 15.0583C29.9567 15.0257 29.9567 14.973 29.9893 14.9404C30.0218 14.9079 30.0746 14.9079 30.1071 14.9404"
							stroke="#031E16"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M33.8571 14.9404C33.8896 14.973 33.8896 15.0257 33.8571 15.0583C33.8246 15.0908 33.7718 15.0908 33.7393 15.0583C33.7067 15.0257 33.7067 14.973 33.7393 14.9404C33.7718 14.9079 33.8246 14.9079 33.8571 14.9404"
							stroke="#031E16"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div className="chat__dialogs__data">
					<div className="chat__dialogs__product">Поддержка</div>
					<div className="chat__dialogs__message">Будем рады помочь</div>
				</div>
				<div className="chat__dialogs__details">
					<button className="btn--go-to">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
							<path d="M9 18L15 12L9 6" stroke="#031E16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</div>
            </div>
		</Link>
	);
};
