const ProfileHeader = ({ user, handleNavClick, subView }) => {
	return (
		<>
			<div
				id="entity-header-container"
				className="flex-row center-vertical"
			>
				<div id="profile-pic" className="center-items zain bold">
					<img
						id="initials"
						className="center-items"
						src={user.picture}
						alt="profile pic"
					/>
				</div>
				<div id="username-title" className="zain">
					{user.name}
				</div>
			</div>
			<div id="entity-edit-menu" className="flex-row">
				<div
					className={`entity-edit-menu-item zain ${subView === 'Details' ? '' : 'selected-subview'}`}
					onClick={() => handleNavClick('Details')}
				>
					Details
				</div>
				<div
					className={`entity-edit-menu-item zain ${subView === 'More Info' ? '' : 'selected-subview'}`}
					onClick={() => handleNavClick('More Info')}
				>
					More Info
				</div>
			</div>
		</>
	);
};
export default ProfileHeader;
