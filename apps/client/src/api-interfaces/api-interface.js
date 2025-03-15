const baseUrl = window.location.origin + '/';

export const getAll = async (route, page, queries) => {
	try {
		const response = await fetch(
			`${baseUrl}${route}?page=${page}${queries ? queries : ''}`
		);
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};
export const update = async (data, route) => {
	try {
		const response = await fetch(`${baseUrl}${route}/${data.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		console.log(response);
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};
export const create = async (data, route) => {
	try {
		const response = await fetch(`${baseUrl}${route}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};
export const deleteOne = async (id, route) => {
	try {
		const response = await fetch(`${baseUrl}${route}/${id}`, {
			method: 'DELETE'
		});
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};
export const getUser = async (token, route) => {
	try {
		const response = await fetch(`${route}${token}`);
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};
