import './leftdrawer.css';
// Same as the other right drawer. Just lets the drawer slide out and display.
const LeftDrawer = ({ drawer, open, toggleOpen, setSelectedItem }) => {
	return drawer && open ? (
		<div id="left-drawer" className="zain">
			<div id="ld-search">
				<div id="ld-searchcont">
					<input
						id="ld-input"
						type="name"
						placeholder="Search Opportunities"
					/>
					<span className="material-symbols-sharp big-icon">
						search
					</span>
				</div>
			</div>
			<div id="ld-title-box">
				<span id="ld-section-title">{drawer}</span>
				<span
					className="material-symbols-sharp medium-icon"
					onClick={() => {
						toggleOpen(false);
						setSelectedItem(null);
					}}
				>
					arrow_back_ios_new
				</span>
			</div>
			<div id="ld-menu-box">menu items click mock open next</div>
		</div>
	) : (
		<></>
	);
};

export default LeftDrawer;
