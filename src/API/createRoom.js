import {chatHostName} from "./HostNames";

export const createRoom = async (dId) => {
	let resp = '';
	try {
		const response = await fetch(chatHostName + '/api/dialog/create?id=' + dId, {
			crossDomain: true,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": "Bearer " + localStorage.getItem('jwtToken')
			}
		});
		resp = response.json();
		if (!response.ok) {
			throw new Error(response.statusText);
		}
	} catch (e) {
		console.log(e);
	}
	return resp;
}
