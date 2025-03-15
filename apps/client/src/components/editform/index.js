// CSS for this file can be found in coredisplay.css
// It shares many same id's and classes with createform component.
import { useEffect, useState } from 'react';
import { getAll, create } from '../../api-interfaces/api-interface';
import { schema } from '../../schemas/schema';
const moment = require('moment');

const EditForm = ({
	formView,
	view,
	handleChange,
	selectApiCall,
	selectView,
	subView
}) => {
	function formatDate(isoDate) {
		return moment(isoDate).format('MM-DD-YYYY');
	}
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const handleNoteEdit = (event) => {
		setNewNote(event.target.value);
	};
	const handleSubmit = () => {
		create({ note: newNote, prospect_id: view.item.id }, 'api/notes');
		setNewNote('');
		getNotes(view.item.id);
	};

	const getNotes = async (id) => {
		const data = await getAll('api/notes', 0, `&prospect_id=${id}`);
		setNotes(data);
	};
	useEffect(() => {
		console.log(view.item, 'ITEM');
		getNotes(view.item.id);
	}, [view]);
	console.log(notes, 'NOTES');
	console.log(view, 'viewinside -------------');
	return (
		<>
			<div
				id="entity-edit-form"
				className={`${subView === 'Details' ? '' : 'flex-row flex-wrap'}`}
			>
				{subView === 'Details' ? (
					formView.schema.map((item, index) => {
						return (
							<>
								<div className="form-input-label zain">
									{item[0]}
								</div>
								<input
									type="text"
									value={view.item[item[1]]}
									className="form-input zain"
									onChange={handleChange(item[1])}
								></input>
							</>
						);
					})
				) : (
					<>
						{[
							['Phone Verified', 'phone_verified'],
							['Phone Status', 'phone_status'],
							['Phone Type', 'phone_type'],
							['Do Not Call', 'phone_DNC'],
							['Email Verfied', 'email_verified'],
							['Email Type', 'email_type'],
							['Email Status', 'email_status'],
							['Email Sub Status', 'email_sub_status']
						].map((item) => {
							return (
								<>
									<div className="flex-column flex-four">
										<div className="form-input-label zain">
											{item[0]}
										</div>
										<input
											type="text"
											value={
												view.item[item[1]]
													? view.item[
															item[1]
														].toString()
													: view.item[item[1]]
											}
											className="form-input-fixed zain"
											readonly
										></input>
									</div>
								</>
							);
						})}
					</>
				)}
				{subView === 'Details' ? (
					<div id="form-button-row" className="flex-row center-items">
						<button
							className="prof-nav-button form-button zain"
							onClick={() => {
								selectApiCall(view.item, 'UPDATE');
								selectView({
									view: 'list',
									item: null,
									schema: null
								});
							}}
						>
							Update
						</button>
						<button
							className="prof-nav-button form-button zain"
							onClick={() => {
								selectView({
									view: 'list',
									item: null,
									schema: null
								});
							}}
						>
							Cancel
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
			{subView === 'More Info' ? (
				<div id="note-container" className="flex-column">
					{notes.length > 0 ? (
						notes.map((note) => {
							return (
								<div className="note-card flex-column zain">
									<div className="note">{note.note}</div>
									<div className="note-date">
										{formatDate(note.created_at)}
									</div>
								</div>
							);
						})
					) : (
						<></>
					)}
					<div id="input-note-container">
						<textarea
							type="text"
							value={newNote}
							cols={1}
							rows={6}
							id="input-note"
							className="input-note zain"
							onChange={handleNoteEdit}
						></textarea>
					</div>
					<div
						id="submit-note"
						className="center-items zain"
						onClick={handleSubmit}
					>
						Add Note
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default EditForm;
