import './batchlist.css';
import { useEffect, useState } from 'react';
import { getAll, deleteOne } from '../../api-interfaces/api-interface';
const moment = require('moment');

function convertToLocalTime(utcDateString) {
	const utcDate = moment.utc(utcDateString);
	return utcDate.local().format('YYYY-MM-DD HH:mm:ss');
}
const BatchList = ({ changeData, page }) => {
	const [selected, setSelected] = useState({});
	const [deleteActive, setDeleteActive] = useState(false);
	const [data, setData] = useState([]);
	useEffect(() => {
		const fetchBatches = async () => {
			const data = await getAll('api/batches', 0);
			setData(data);
		};
		if (data.length === 0) {
			fetchBatches();
		}
	}, [data]);
	return (
		<div id="batch-management-form" className="zain">
			<div id="bm-header" className="center-vertical">
				<div id="bm-title">Batch Management</div>
				{deleteActive ? (
					<>
						<div
							id="bm-confirm"
							className="bm-button center-items"
							onClick={async () => {
								setSelected({});
								setDeleteActive(false);
								await deleteOne(selected.id, 'api/batches');
								changeData(await getAll('api/prospects'), page);
								setData(await getAll('api/batches', 0));
							}}
						>
							Confirm Delete
						</div>
						<div
							id="bm-confirm"
							className="bm-button center-items"
							onClick={async () => {
								setSelected({});

								setDeleteActive(false);
							}}
						>
							Cancel
						</div>
					</>
				) : selected.id ? (
					<div
						className="bm-button center-items"
						onClick={() => setDeleteActive(true)}
					>
						Delete
					</div>
				) : (
					<></>
				)}
				{selected.id && !deleteActive ? (
					<>
						<div className="bm-button center-items">Re-assign</div>
						<div className="bm-button center-items">Split</div>
						<div className="bm-button center-items">Combine</div>
						<div
							className="bm-button center-items"
							onClick={() => setSelected({})}
						>
							Cancel
						</div>
					</>
				) : (
					<></>
				)}
			</div>
			<div id="bm-list">
				<div id="bm-list-header" className="center-items">
					<div className="datapoint-display center-items">
						<span>Creation Date</span>
					</div>
					<div className="datapoint-display center-items">
						<span>Assignee Name</span>
					</div>
					<div className="datapoint-display center-items">
						<span>Entries</span>
					</div>
				</div>
				<div className="bm-list-container center-items">
					{data.length > 0 ? (
						data.map((item) => {
							return (
								<div
									className={
										selected.id === item.id
											? 'bm-list-card center-items selected'
											: 'bm-list-card center-items'
									}
									onClick={() => setSelected(item)}
								>
									<div className="datapoint-display center-items">
										<span>
											{convertToLocalTime(
												item.created_at
											)}
										</span>
									</div>
									<div className="datapoint-display center-items">
										<span>{item.assignee_name}</span>
									</div>
									<div className="datapoint-display center-items">
										<span>{item.entries}</span>
									</div>
								</div>
							);
						})
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};
export default BatchList;
