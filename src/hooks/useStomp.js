import Stomp from "../utils/stomp";
import {useState} from "react";
import {wsChat} from "../API/HostNames";
import { v4 as uuidv4 } from 'uuid';
import {message} from "antd";

let stomp;

export const useStomp = () => {
	const [sockConnected, setSockConnected] = useState(false)
	const [newMessage, setNewMessage] = useState(null)
	let connecting = false, connected = false

	const notificationConnect = () => {
		if (!stomp) {
			let sc;
			console.log("Go")
			sc = Stomp.client(wsChat);
			stomp = sc;
			sc.heartbeat.outgoing = 10000;
			sc.heartbeat.incoming = 10000;
			sc.connect('test', 'test', onConnectedNotif, onErrorNotif);
		}
	}

	const onConnectedNotif = (resp) => {
		connected = true
		setSockConnected(true);
		if (!localStorage.getItem('uuid')) {
			localStorage.setItem('uuid', uuidv4())
		}
		console.log(localStorage.getItem('uuid'));
		stomp.subscribe('/exchange/' + localStorage.getItem('exchangeName'), onMessageReceived,
			{
				"id": "sub", "auto-delete": false, "x-queue-name": localStorage.getItem('uuid'), "ack": "client"
			});
	}

	const onMessageReceived = (payload) => {
		payload.ack();
		let message = JSON.parse(payload.body);
		setNewMessage(message.payload);
		console.log(payload.body);
	}

	const onErrorNotif = (error) => {
		console.log("fail")
		console.log('STOMP: ' + error);
		//stomp.disconnect();
		stomp = null;
		setSockConnected(false);
		setTimeout( () => {notificationConnect()}, 5000);
		console.log('STOMP: Reconecting in 5 seconds');
		console.log("try");
	}

	const sendNewMessage = (message) => {
		if (message) {
			console.log('try to send')
			console.log(message)
			let rabbitMessage = {
				type: "MESSAGE",
				payload: message
			}
			if (stomp) {
				stomp.send(
					"/queue/chat-application-messages",
					{"Authorization": "Bearer " + localStorage.getItem('jwtToken')},
					JSON.stringify(rabbitMessage)
				);
			}
		}
	}

	const connectWS = () => {
		if (localStorage.getItem('jwtToken') && localStorage.getItem('exchangeName')) {
			if (!connecting && !connected) {
				connecting = true
				notificationConnect();
			}
		} else {
			message.error('Нет данных для авторизации в чате')
		}
	}

	return [connectWS, sockConnected, sendNewMessage, newMessage]
}
