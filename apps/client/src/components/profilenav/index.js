import './profilenav.css';
import { schema } from '../../schemas/schema';

//Hardcoded Icons to can be supplied with CMS or db for scaling

const ProfileNav = ({ rightDrawer, selectRightDrawer, user, logout }) => {
	console.log(user, 'profile nav');
	return (
		<nav id="profile-nav">
			<div id="prof-nav-box-cont">
				{/* Creating the menu. If null, then produces the profile page. Else it makes the icon box with the appropriate icon. */}
				{schema['profilenav'].map((icon, i) => {
					if (icon === null) {
						return (
							<div
								key={`prof-box-${i}`}
								onClick={() => selectRightDrawer('Profile')}
								className="prof-nav-icon-box center-items"
							>
								<img
									src={user.picture}
									id="prof-picture"
									className="center-items"
									alt="profile img"
								/>
							</div>
						);
					} else {
						return (
							<div
								key={`prof-box-${i}`}
								onClick={() => selectRightDrawer(icon[1])}
								className="prof-nav-icon-box center-items"
							>
								<span className="material-symbols-sharp small-icon black">
									{icon[0]}
								</span>
							</div>
						);
					}
				})}
				<div className="center-items">
					<button className="prof-nav-button center-items">
						<span className="zain">Call</span>
					</button>
				</div>
				<div className="nav-button-cont center-items">
					<button className="prof-nav-button center-items">
						<span className="zain">New Ticket</span>
					</button>
				</div>
			</div>
			<div id="prof-nav-title" className="zain">
				Home
			</div>
		</nav>
	);
};

export default ProfileNav;
