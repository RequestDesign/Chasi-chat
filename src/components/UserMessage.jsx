import React, { useEffect } from 'react';
import Fancybox from './Fancybox';
import { SpaceContext } from 'antd/es/space';

const Linkify = ({children})=> {
    const isUrl = word => {
        const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
        return word.match(urlPattern)
    }

    const addMarkup = word => {
        return isUrl(word) ? 
            `<a href="${word}">${word}</a>`:  
            word
    }
    const words = children.split(' ')
    const formatedWords = words.map((w, i) => addMarkup(w))
    const html = formatedWords.join(' ')
    return (<span dangerouslySetInnerHTML={{__html: html}} />)
}

const UserMessage = ({ message, userId, admin, prev, update }) => {
	if(message.files && prev) {
		const messageClass =
			!message.content.length && message.files.length > 0
				? 'chat__dialog__message message--outgoing chat__dialog__message--photo'
				: 'chat__dialog__message message--outgoing';
		const messageClassIn =
				!message.content.length && message.files.length > 0
					? 'chat__dialog__message message--incoming chat__dialog__message--photo'
					: 'chat__dialog__message message--incoming';
		const isSameDay =
			new Date(prev.date).getDay() === new Date(message.timestamp).getDay();
	
		return (
			<>					
				{!isSameDay && (
					<div className="chat__dialog__date">
						{new Intl.DateTimeFormat('ru-RU', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})
							.format(new Date(message.timestamp))
							.replace(' г.', '')}
					</div>
				)}
				{userId > 0 && message.sender.userId === userId ? (
					<>
	
						<div className={admin ? messageClass : messageClass} data-files={message.files.length}>
							{message.content !== '' && (
								<div className="message-text">
									<Linkify>{message.content}</Linkify>
								</div>
							)}
							{message.files.length > 0 && (
								<Fancybox
									options={{
										idle: false,
										Carousel: {
											transition: "slide",
										},
										Thumbs: {
											type: "classic",
										},
										Toolbar: {
											display: {
												middle: [,'infobar'],
												left: ["back"],
												right: ["close"],
											},
											items: {
												infobar: {
													tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>из<span data-fancybox-count></span></div>',
												},
												back: {
													tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="#031E16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
												},
											},
											
										},
									}}
								>
	
									{message.files.map((file, index) =>
										file.contentType.includes('image') ? (
											<div
												className="chat__dialog__message__image-wrapper"
												key={index}>
												<a data-fancybox="gallery" href={file.uri}>
													<img
														onLoad={() => {
															if (update) {
																update();
															}
														}}
														src={file.uri}
														alt=""
													/>
												</a>
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
								</Fancybox>
							)
	
							}
							{
								//(prev.time !== new Date(message.timestamp).getMinutes() ||
								//prev.id !== message.sender.userId) && (
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
								//)
							}
						</div>
					</>
				) : (
					<>
						<div className={messageClassIn} data-files={message.files.length}>
							{message.content !== '' && (
								<div className="message-text">
									<Linkify>{message.content}</Linkify>
								</div>
							)}
							{message.files.length > 0 && (
								<Fancybox
									options={{
										idle: false,
										Carousel: {
											transition: "slide",
										},
										Thumbs: {
											type: "classic",
										},
										Toolbar: {
											display: {
												middle: [,'infobar'],
												left: ["back"],
												right: ["close"],
											},
											items: {
												infobar: {
													tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>из<span data-fancybox-count></span></div>',
												},
												back: {
													tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="#031E16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
												},
											},
											
										},
									}}
	
								>
								{message.files.map((file) =>
									file.contentType.includes('image') ? (
										<div className='chat__dialog__message__image-wrapper'>
											<a data-fancybox="gallery" href={file.uri}>
												<img
													onLoad={() => {
														if (update) {
															update();
														}
													}}
													src={file.uri}
													alt=""
												/>
											</a>
	
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
								)
								}
								</Fancybox>
							)
	
							}
							{
							// (prev.time !== new Date(message.timestamp).getMinutes() ||
							// 	prev.id !== message.sender.userId) && 
							(
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
	}
};

export default UserMessage;
