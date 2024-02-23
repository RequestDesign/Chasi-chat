import {chatHostName} from "./HostNames";

export const getRooms = async (page) => {
	let resp = '';
	try {
		const response = await fetch(chatHostName + '/api/dialogs?pageSize=25&page=' + page, {
			crossDomain: true,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": "Bearer " + localStorage.getItem('jwtToken')
			}

		});
		resp = await response.json();
		if (!response.ok) {
			throw new Error(response.statusText);
		}
	} catch (e) {
		console.log(e);
	}
	return resp;
}
