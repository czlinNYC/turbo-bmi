import './entitylist.css';
import { useEffect } from 'react';
import getTimezoneAndLocalTime from '../../helpfuncs/timeconverter';

const EntityList = ({
	data,
	schema,
	selectView,
	selected,
	setSelectedItem,
	page
}) => {
	useEffect(() => {}, [data]);
	return (
		<div id="core-body">
			<div className="data-card flex-row">
				<div id="edit-icon" className="center-items data-first">
					<span className="material-symbols-sharp small-icon black">
						select_all
					</span>
				</div>
				<div className="datapoint-display column-title zain center-items bold">
					Local Time
				</div>

				{data.schema ? (
					data.schema.map((item, index) => {
						if (data.schema.length !== index + 1) {
							return (
								<div className="datapoint-display column-title zain center-items bold">
									{item[0]}
								</div>
							);
						} else {
							return (
								<div className="datapoint-display column-title data-last zain center-items bold">
									{item[0]}
								</div>
							);
						}
					})
				) : (
					<></>
				)}
			</div>
			{data.schema && data.data ? (
				data.data.map((item, index) => {
					const time = getTimezoneAndLocalTime(
						data.data[index].state
					);
					return (
						<div
							className={
								selected === item.id
									? 'data-card flex-row selected'
									: 'data-card flex-row'
							}
							onClick={() => setSelectedItem(item.id)}
						>
							<div
								id="edit-icon"
								className="center-items data-first"
								onClick={() =>
									selectView({
										view: 'edit',
										item: item,
										schema: data.schema
									})
								}
							>
								<span className="material-symbols-sharp small-icon black">
									edit_note
								</span>
							</div>
							<div
								id="local-time"
								className="center-items datapoint-display zain"
							>
								<div className="center-items time-box">
									<span className="text-overflow time-box-text">
										{time.localTime}
									</span>
									<span className="text-overflow time-box-text">
										{time.timezone}
									</span>
								</div>
							</div>
							{data.schema ? (
								data.schema.map((schemaItem, index) => {
									const determinePhone = (item) => {
										if (
											item.phone_status ===
												'disconnected' ||
											item.phone_status ===
												'disconnected-75'
										) {
											return 'back-dot';
										} else if (
											item.phone_status === 'invalid'
										) {
											return 'red-dot';
										} else if (item.phone_DNC === true) {
											return 'yellow-dot';
										} else if (
											item.phone_status === 'connected' ||
											item.phone_status ===
												'connected-75' ||
											item.phone_status === 'busy'
										) {
											return 'green-dot';
										} else {
											return 'black-dot';
										}
									};
									if (data.schema.length !== index + 1) {
										if (schemaItem[1] === 'phone') {
											return (
												<div className="datapoint-display data-last zain center-items flex-row">
													<div
														className={`list-dot ${determinePhone(item)}`}
													></div>
													<span className="text-overflow">
														{item[schemaItem[1]]}
													</span>
												</div>
											);
										} else {
											return (
												<div className="datapoint-display zain center-items">
													<span className="text-overflow">
														{item[schemaItem[1]]}
													</span>
												</div>
											);
										}
									} else {
										return (
											<div className="datapoint-display data-last zain center-items">
												<span className="text-overflow">
													{item[schemaItem[1]]}
												</span>
											</div>
										);
									}
								})
							) : (
								<></>
							)}
						</div>
					);
				})
			) : (
				<></>
			)}
		</div>
	);
};
export default EntityList;
