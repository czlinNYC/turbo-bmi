import './coredisplay.css';
import { useState, useEffect } from 'react';
import EntityList from '../entitylist';
import { schema } from '../../schemas/schema';
import { update, create } from '../../api-interfaces/api-interface';
import EditForm from '../editform';
import CreateForm from '../createform';
import CoreNav from '../corenav';
import ProfileHeader from '../profileheader';
import Uploader from '../uploader';
import { getAll } from '../../api-interfaces/api-interface';
const CoreDisplay = ({
	data,
	drawer,
	updateData,
	selected,
	setSelectedItem,
	changeData,
	selectDrawer,
	user
}) => {
	const [view, setView] = useState({
		view: 'list',
		item: null,
		schema: null
	});
	const [page, setPage] = useState(0);
	const [updated, setUpdated] = useState(false);
	const [subView, setSubView] = useState('Details');
	const updateBoard = () => {
		setUpdated(true);
	};
	const handleNavClick = (view) => {
		setSubView(view);
	};
	useEffect(() => {
		const newPage = async () => {
			changeData(await getAll(schema[drawer].route, page));
		};
		newPage();
	}, [page, drawer]);

	useEffect(() => {
		setView({ view: 'list', item: {}, schema: null });
	}, [drawer]);
	const selectView = (newView) => {
		setView(newView);
	};
	const handleChange = (key) => (event) => {
		let newObject = {
			[key]: event.target.value
		};
		newObject = { ...view.item, ...newObject };
		let newView = {
			view: view.view,
			item: newObject,
			schema: view.schema
		};
		setView(newView);
	};
	const selectApiCall = async (data, action) => {
		let item =
			action === 'UPDATE'
				? await update(data, schema[drawer].route)
				: await create(data, schema[drawer].route);
		updateData(item);
		return item;
	};
	const adjustPage = (action) => {
		if (action === 'increase') {
			setPage(page + 1);
		} else {
			setPage(page - 1);
		}
	};
	const makeFormView = (oldView) => {
		console.log(`${drawer + '_full'}`, 'SCHEMA item-------');
		if (drawer && schema) {
			let formView = {
				...oldView,
				...{
					schema: schema[`${drawer + '_full'}`].schema
				}
			};
			console.log(formView, 'FORM VIEW------------------');
			console.log(view, 'VIEW------------------');

			return formView;
		}
	};
	let formView = makeFormView(view);
	return (
		<>
			<div id="core-display" className="flex-column off-white-background">
				<CoreNav
					{...{
						view,
						drawer,
						selectView,
						adjustPage,
						page,
						data
					}}
				/>
				{view.view === 'list' ? (
					<EntityList
						{...{
							data,
							selectView,
							selected,
							setSelectedItem,
							page
						}}
					/>
				) : (
					<div
						id="core-display"
						className="flex-column off-white-background core-display-edit"
					>
						{view.view === 'bulk' ? (
							<Uploader
								selectDrawer={selectDrawer}
								changeData={changeData}
								drawer={drawer}
								updateBoard={updateBoard}
								page={page}
							/>
						) : (
							<div id="edit-form-container">
								<ProfileHeader
									{...{ handleNavClick, user, subView }}
								/>
								{view.item && view.item.id ? (
									<EditForm
										{...{
											formView,
											view,
											handleChange,
											selectApiCall,
											selectView,
											handleNavClick,
											user,
											drawer,
											subView
										}}
									/>
								) : (
									<CreateForm
										{...{
											formView,
											view,
											handleChange,
											selectApiCall,
											selectView,
											handleNavClick,
											user,
											drawer,
											subView
										}}
									/>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default CoreDisplay;
