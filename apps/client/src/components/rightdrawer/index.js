import './rightdrawer.css';

const RightDrawer = ({ rightDrawer, selectRightDrawer, logout, user }) => {
	return (
		<div id="right-drawer" className="flex-column zain">
			<div id="rd-header">
				{rightDrawer}
				<span
					className="material-symbols-sharp large-icon"
					onClick={() => selectRightDrawer(null)}
				>
					close
				</span>
			</div>
			<div id="rd-content">
				{rightDrawer === 'Profile' ? (
					<>
						<div>
							<div className="rd-content-item">{user.name}</div>
							<div className="rd-content-item">{user.email}</div>
							<div className="rd-content-item">Organization</div>
							<div className="rd-content-item">Teams</div>
						</div>
						<div
							className="rd-content-item"
							id="rd-logout"
							onClick={logout}
						>
							Logout
						</div>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};
export default RightDrawer;
