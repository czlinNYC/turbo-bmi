import './navbar.css';
import { schema } from '../../schemas/schema';
// Creates the nav bar a simple map of the material symbol icons and their titles
// Hard coded for now, but menu items can later be supplied by a CMS
const Navbar = ({ selectDrawer, toggleOpen, setSelectedItem }) => {
	return (
		<nav id="navbar" className="flex-column">
			{schema['navbar'].map((icon, i) => {
				return (
					<div
						key={`nav-box-${i}`}
						onClick={() => {
							selectDrawer(icon[1]);
							toggleOpen(true);
							setSelectedItem(null);
						}}
						className="navbar-icon-box zain flex-column center-items"
					>
						<span className="material-symbols-sharp block">
							{icon[0]}
						</span>
						{icon[1]}
					</div>
				);
			})}
		</nav>
	);
};
export default Navbar;
