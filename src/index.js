import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if (document.getElementById('chat-box')) {
	const root = ReactDOM.createRoot(document.getElementById('chat-box'));
	root.render(
		<App/>
	);
}
