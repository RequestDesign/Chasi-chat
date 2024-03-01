import React from 'react';

const UnreadMessagesCounter = ({count}) => {
	return (
		<>
			{count > 0 && <div id="unreadMessagesCounter">{count}</div>}
		</>
	);
};

export default UnreadMessagesCounter;
