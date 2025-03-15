import './login.css';
import Login from './login';
import Logout from './logout';
import { useEffect } from 'react';

const LoginPage = ({ login, setCurrentUser }) => {
	return (
		<>
			<div id="view-container" className="title">
				Blue Max Icon
				<div
					id="o-auth"
					className="main-color center-items zain default-size"
				>
					Log in placeholder for OAuth
				</div>
				<button
					id="login-button"
					className="main-color center-items zain default-size"
					onClick={login}
				>
					Click here to mock login
				</button>
				<Login login={login} setCurrentUser={setCurrentUser} />
			</div>
		</>
	);
};

export default LoginPage;
