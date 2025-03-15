import './css/App.css';
import LoginPage from './views/login/';
import Landing from './views/landing/';
import { useState, useEffect } from 'react';
import { getUser } from './api-interfaces/api-interface';
import { Client, Account, OAuthProvider } from 'appwrite';
const moment = require('moment');

function isFutureTime(dateString) {
	const givenTime = moment(dateString);
	const currentTime = moment();

	return givenTime.isAfter(currentTime);
}

const client = new Client()
	.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
	.setProject('674927cc00186505acab'); // Your project ID
const account = new Account(client);
const App = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(false);

	const login = () => {
		setLoggedIn(true);
	};
	const setCurrentUser = (user) => {
		setUser(user);
	};
	const logout = async () => {
		setLoggedIn(false);
		setCurrentUser(null);
		const account = new Account(client);
		try {
			await account.deleteSession('current');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const getSession = async () => {
			try {
				// await account.deleteSession('current');
				let session = await account.getSession('current');
				console.log(session, 'session');
				if (isFutureTime(session.providerAccessTokenExpiry) === false) {
					await account.deleteSession('current');
					session = await account.getSession('current');
				}
				if (session && user) {
					setLoggedIn(true);
				} else {
					let currentUser = await getUser(
						session.providerAccessToken,
						'https://www.googleapis.com/oauth2/v3/userinfo?access_token='
					);
					console.log(currentUser);
					setUser(currentUser);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getSession();
	});
	return (
		<>
			{loggedIn ? (
				<Landing user={user} logout={logout} />
			) : (
				<LoginPage
					login={login}
					setCurrentUser={setCurrentUser}
					logout={logout}
				/>
			)}
		</>
	);
};

export default App;
