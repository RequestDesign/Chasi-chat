import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createRoom} from "./API/createRoom";

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
			createRoom(Number(button.getAttribute('chat-id')))
				.then((e) => {
					console.log(e.dialogId);
					if (e.dialogId) {
						window.location.href = window.location.origin + '/profile/chat/' + e.dialogId
					}
				})
		});
	}
}