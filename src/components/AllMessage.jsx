import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { routeNames } from '../router/RouteNames';

const AllMessage = ({ rooms }) => {
    const countMessages = (rooms) => {
        let count = 0
        rooms.forEach((room) => {
            count += room.unreadMessages
        })
        
        return count ? count : ''
    };
	return (
		<span>
			{countMessages(rooms)}
		</span>
	);
};

export default AllMessage;
