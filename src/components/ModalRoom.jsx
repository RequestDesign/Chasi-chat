import React, {useEffect, useState} from 'react';
import {Modal} from "antd";
import Loading from "./Loading";
import Room from "./Room";

const ModalRoom = ({userChatId, newMess, AddNewMessage}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [dialogId, setDialogId] = useState(null)

	const callModal = (id) => {
		setIsOpen(true)
		setDialogId(id);
	}

	useEffect(() => {
		window.callModalRoom = callModal
	},[])

	const closeModalChat = () => {
		setIsOpen(false)
		setDialogId(null);
	}

	return (
		<>
			<div onClick={() => window.callModalRoom(82791)}>
				tts
			</div>
			<Modal className="chat-modal" title={ "Чат " + dialogId } visible={isOpen} onCancel={closeModalChat}>
				<Room userChatId={userChatId} newMess={newMess} AddNewMessage={AddNewMessage} modalId={dialogId}/>
			</Modal>
		</>
	);
};

export default ModalRoom;
