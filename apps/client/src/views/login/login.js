import { Client, Account, OAuthProvider } from 'appwrite';
import { getUser } from '../../api-interfaces/api-interface';
// Go to OAuth provider login page

// Provider information

const Login = ({ setCurrentUser, login }) => {
	const client = new Client()
		.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
		.setProject('674927cc00186505acab'); // Your project ID

	const account = new Account(client);

	const startOauth = async () => {
		account.createOAuth2Session(
			OAuthProvider.Google, // provider
			'http://localhost:3000', // redirect here on success
			'http://localhost:3000' // redirect here on failure // scopes (optional)
		);

		// const session = await account.getSession('current');
		// console.log(session);
		// console.log(session.providerUid);
		// console.log(session.providerAccessToken);
		// let user = await getUser(
		// 	session.providerAccessToken,
		// 	'https://www.googleapis.com/oauth2/v3/userinfo?access_token='
		// );
		// console.log(user, 'USER');
		// setCurrentUser(user);
		// login();
	};

	return (
		<>
			<div id="signin-button" className="zain" onClick={startOauth}>
				<img id="g-logo" src={'./google.png'} alt={'no imae'} />{' '}
				<span id="sign-in-text">Sign in with Google</span>
			</div>
		</>
	);
};
export default Login;
