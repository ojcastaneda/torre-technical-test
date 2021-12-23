const fetch = require('cross-fetch');

const retrieveUser = async (request, response, next) => {
	try {
		const { username } = request.params;
		const fetchedUser = await fetch(`https://bio.torre.co/api/bios/${username}`);
		if (!fetchedUser.ok) return response.status(fetchedUser.status).send();
		response.status(200).json(await fetchedUser.json());
	} catch (error) {
		next(error);
	}
};

const retrieveUsersWithSkill = async (request, response, next) => {
	try {
		const { skill, proficiency } = request.body;
		const fetchedUsers = await fetch('https://search.torre.co/people/_search', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 'skill/role': { text: skill, proficiency } })
		});
		if (!fetchedUsers.ok) return response.status(fetchedUsers.status).send();
		response.status(200).json(await fetchedUsers.json());
	} catch (error) {
		next(error);
	}
};

const retrieveUsersWithName = async (request, response, next) => {
	try {
		const { name } = request.body;
		const fetchedUsers = await fetch('https://search.torre.co/people/_search', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: { term: name } })
		});
		if (!fetchedUsers.ok) return response.status(fetchedUsers.status).send();
		response.status(200).json(await fetchedUsers.json());
	} catch (error) {
		next(error);
	}
};

module.exports = { retrieveUser, retrieveUsersWithSkill, retrieveUsersWithName };
