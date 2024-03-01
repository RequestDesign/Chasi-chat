import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const Support = () => {
	const params = useParams();
	const dId = params.id === 'support';
	return (
		<Link
			to="/profile/chat/82863"
			className={`chat__dialogs-support chat__box-item${dId ? 'active' : ''}`}>

			<span className="support-ico">
				<svg
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M1.66797 35.0004V35.0004C1.66797 31.6688 4.36797 28.9688 7.69964 28.9688H13.7313C17.063 28.9688 19.763 31.6688 19.763 35.0004V35.0004"
						stroke="#031E16"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M14.4482 15.4288C16.5095 17.4901 16.5095 20.8322 14.4482 22.8935C12.3869 24.9548 9.0448 24.9548 6.98349 22.8935C4.92217 20.8322 4.92217 17.4901 6.98349 15.4288C9.0448 13.3675 12.3869 13.3675 14.4482 15.4288"
						stroke="#031E16"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M30.1616 23.0107C34.6749 23.0107 38.3349 19.3507 38.3349 14.8374C38.3349 10.3241 34.6766 6.66406 30.1616 6.66406C25.6466 6.66406 21.9883 10.3241 21.9883 14.8374"
						stroke="#031E16"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M30.1709 23.0176C28.9409 23.0176 27.7759 22.7459 26.7292 22.2609L21.6992 23.3293L22.7509 18.2893C22.2626 17.2393 21.9892 16.0693 21.9892 14.8359"
						stroke="#031E16"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M26.3571 14.9385C26.3896 14.971 26.3896 15.0238 26.3571 15.0563C26.3246 15.0889 26.2718 15.0889 26.2393 15.0563C26.2067 15.0238 26.2067 14.971 26.2393 14.9385C26.2718 14.9059 26.3246 14.9059 26.3571 14.9385"
						stroke="#031E16"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M30.1071 14.9385C30.1396 14.971 30.1396 15.0238 30.1071 15.0563C30.0746 15.0889 30.0218 15.0889 29.9893 15.0563C29.9567 15.0238 29.9567 14.971 29.9893 14.9385C30.0218 14.9059 30.0746 14.9059 30.1071 14.9385"
						stroke="#031E16"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M33.8571 14.9385C33.8896 14.971 33.8896 15.0238 33.8571 15.0563C33.8246 15.0889 33.7718 15.0889 33.7393 15.0563C33.7067 15.0238 33.7067 14.971 33.7393 14.9385C33.7718 14.9059 33.8246 14.9059 33.8571 14.9385"
						stroke="#031E16"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>

			<div className="chat__dialogs-support-box">
				<p className="chat__dialogs-support-title">Поддержка</p>
				<p className="chat__dialogs-support-subtitle">Будем рады помочь</p>
			</div>

			<span className="btn--go-to">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M9 18L15 12L9 6"
						stroke="#031E16"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
		</Link>
	);
};
