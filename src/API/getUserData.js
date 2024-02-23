import {chatHostName} from "./HostNames";

export const getUserData = async () => {
	let resp = '';
	try {
		const response = await fetch(chatHostName + '/api/user/auth', {
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
