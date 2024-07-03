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

if (document.querySelectorAll('[chat-id]')) {
	const button = document.querySelectorAll('[chat-id]');
	button.forEach((element) => {
		element.addEventListener("click", (event) => {
			if(document.getElementById("cardName")) {
				let text =  document.getElementById("cardName").getElementsByClassName('title')[0].textContent
				localStorage.setItem(`${element.getAttribute('chat-id')}cardName`, text);
				localStorage.setItem(`${element.getAttribute('chat-id')}Name`, element.getAttribute('data-name'));
			}
			localStorage.setItem(`${element.getAttribute('chat-id')}Tel`, element.getAttribute('data-tel'));
			createRoom(Number(element.getAttribute('chat-id')))
				.then((e) => {
					if (e.dialogId) {
						window.location.href = window.location.origin + '/profile/chat/' + e.dialogId
					}
				})
		});
	})
}
if (document.querySelectorAll('[appeal-id]')) {
	const button = document.querySelectorAll('[appeal-id]');
	button.forEach((element) => {
		element.addEventListener("click", (event) => {
			localStorage.setItem('rewId', element.getAttribute('appeal-id'));
			createRoom(82830)
				.then((e) => {
					if (e.dialogId) {
						window.location.href = window.location.origin + '/profile/chat/' + e.dialogId
					}
				})
		});
	})
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