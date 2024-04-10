import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CountMessage from './CountMessage';
import {createRoom} from "./API/createRoom";
import { getRooms } from './API/getRooms';

if (document.getElementById('chat-box')) {
	const root = ReactDOM.createRoot(document.getElementById('chat-box'));
	root.render(
		<App/>
	);
}

if (document.querySelector('[chat-id]')) {
	
	const button = document.querySelector('[chat-id]');
	if(button) {
		button.addEventListener("click", (event) => {
			if(document.getElementById("cardName")) {
				let text =  document.getElementById("cardName").getElementsByClassName('title')[0].textContent
				localStorage.setItem(`${button.getAttribute('chat-id')}cardName`, text);
			}
			createRoom(Number(button.getAttribute('chat-id')))
				.then((e) => {
					if (e.dialogId) {
						window.location.href = window.location.origin + '/profile/chat/' + e.dialogId
					}
				})
		});
	}
}
if (document.querySelector('.header__icon-num')) {
	
	const root = ReactDOM.createRoot(document.querySelector('.header__icon-num'));
	root.render(
		<CountMessage/>
	);
}
if (document.querySelector('.footer--mobile__num')) {
	
	const root = ReactDOM.createRoot(document.querySelector('.footer--mobile__num'));
	root.render(
		<CountMessage/>
	);
}