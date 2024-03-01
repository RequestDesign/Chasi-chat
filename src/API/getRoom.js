import { chatHostName } from './HostNames';

export const getRoom = async (dId) => {
	let resp = '';

	try {
		const response = await fetch(chatHostName + '/api/dialog/' + dId, {
			crossDomain: true,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
			},
		});

		resp = response.json();
		if (!response.ok) {
			throw new Error(response.statusText);
		}
	} catch (e) {
		console.log(e);
	}
	return resp;
};
