import React from 'react';

const UnreadMessages = ({count}) => {
	return (
		<>
			{count > 0 && <div id="unreadMessages">{count}</div>}
		</>
	);
};

export default UnreadMessages;
