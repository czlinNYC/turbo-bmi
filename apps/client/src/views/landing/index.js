import './landing.css';
import Navbar from '../../components/navbar/';
import '../../components/mainbody/mainbody.css';
import ProfileNav from '../../components/profilenav/';
import LeftDrawer from '../../components/leftdrawer/';
import CoreDisplay from '../../components/coredisplay/';
import RightDrawer from '../../components/rightdrawer';
import { useState } from 'react';
import '../../components/rightdrawer/rightdrawer.css';
import '../../components/subbody/subbody.css';
import '../../components/infopanel/infopanel.css';
import '../../components/coredisplay/coredisplay.css';
import { getAll } from '../../api-interfaces/api-interface';
import { schema } from '../../schemas/schema';
import getTimezoneAndLocalTime from '../../helpfuncs/timeconverter';

const Landing = ({ user, logout }) => {
	const [drawer, setDrawer] = useState(null);
	const [data, setData] = useState(null);
	const [newUpdate, setNewUpdate] = useState([]);
	const [rightDrawer, setRightDrawer] = useState(null);
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState(null);
	const setSelectedItem = (id) => {
		setSelected(id);
	};

	console.log(getTimezoneAndLocalTime('tx'), 'time checker');
	const selectDrawer = async (drawer) => {
		let data;
		if (drawer !== null) {
			data = await getAll(schema[drawer].route, 0);
			console.log(data, 'paginated data');
			await setData({ data: data, schema: schema[drawer].schema });
			setDrawer(drawer);
		} else {
			setDrawer(drawer);
		}
	};
	const updateData = (updatedItem) => {
		setNewUpdate(null);
		let update = false;
		data.data.forEach((dataItem, index) => {
			if (dataItem.id === updatedItem[0].id) {
				let newData = data;
				newData.data[index] = updatedItem[0];
				setData(newData);
				setNewUpdate([].push(newData));
				setNewUpdate({});
				update = true;
			}
		});
		if (update === false) {
			data.data.push(updatedItem[0]);
		}
	};
	const selectRightDrawer = (rightDrawer) => {
		setRightDrawer(rightDrawer);
	};
	const toggleOpen = (status) => {
		setOpen(status);
	};
	const changeData = (inputs) => {
		console.log(inputs, 'changedata inputs');
		console.log({ ...data, ...{ data: inputs } }, 'combined');
		setData({ ...data, ...{ data: inputs } });
	};

	return (
		<>
			<div id="landing-container" className="flex-row">
				<Navbar
					selectDrawer={selectDrawer}
					setSelectedItem={setSelectedItem}
					toggleOpen={toggleOpen}
				/>
				<LeftDrawer
					drawer={drawer}
					selectDrawer={selectDrawer}
					toggleOpen={toggleOpen}
					setSelectedItem={setSelectedItem}
					open={open}
				/>
				<div id="main-body" className="flex-column">
					<ProfileNav
						selectRightDrawer={selectRightDrawer}
						rightDrawer={rightDrawer}
						user={user}
					/>
					<div id="sub-body" className="flex-row">
						<div id="info-panel"></div>
						{data ? (
							<CoreDisplay
								data={data}
								drawer={drawer}
								updateData={updateData}
								selected={selected}
								setSelectedItem={setSelectedItem}
								changeData={changeData}
								selectDrawer={selectDrawer}
								user={user}
							/>
						) : (
							<div id="core-display"></div>
						)}
						{rightDrawer ? (
							<RightDrawer
								logout={logout}
								user={user}
								rightDrawer={rightDrawer}
								selectRightDrawer={selectRightDrawer}
							/>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Landing;
