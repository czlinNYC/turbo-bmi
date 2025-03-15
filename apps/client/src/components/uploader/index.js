import { useState, useEffect } from 'react';
import './uploader.css';
import * as xlsx from 'xlsx';
import { create, getAll } from '../../api-interfaces/api-interface.js';
import { schema as schema_raw } from '../../schemas/schema.js';
import { schema as schema_OG } from '../../schemas/schema.js';
import BatchList from '../batchlist/index.js';
const Uploader = ({ selectDrawer, changeData, drawer, updateBoard, page }) => {
	const [inputs, setInputs] = useState([]);
	const [schema, setSchema] = useState([]);
	const [selectedSchema, setSelectedSchema] = useState(null);
	const [selectedInput, setSelectedInput] = useState(null);
	const [finalPairing, setFinalPairing] = useState([]);
	const [pair, setPair] = useState(null);
	const [inputData, setInputData] = useState({ LOL: 0 });
	const [loading, setLoading] = useState(false);
	const [isEmailChecked, setIsEmailChecked] = useState(false);
	const [isDNCChecked, setIsDNCChecked] = useState(false);
	const [isPhoneChecked, setIsPhoneChecked] = useState(false);

	const handleChange = (event) => {
		if (event.target.id === 'verify-phone') {
			setIsPhoneChecked(event.target.checked);
		} else if (event.target.id === 'verify-DNC') {
			setIsDNCChecked(event.target.checked);
		} else {
			setIsEmailChecked(event.target.checked);
		}
	};

	useEffect(() => {
		const i = Object.assign([], schema_raw['schema_raw']);
		setSchema(i);
	}, []);
	useEffect(() => {
		if (inputData[0]) {
			let keys = inputData[0][0];
			if (inputData[1]) {
				setInputs(Object.keys(keys));
			}
		}
	}, [inputData]);
	useEffect(() => {
		if (selectedInput !== null && selectedSchema !== null) {
			setPair([selectedInput, selectedSchema]);
		}
	}, [selectedInput, selectedSchema]);

	const manageSelected = (name, source) => {
		if (source === 'schema') {
			selectedSchema === name
				? setSelectedSchema(null)
				: setSelectedSchema(name);
		} else {
			selectedInput === name
				? setSelectedInput(null)
				: setSelectedInput(name);
		}
	};
	const handleAdd = () => {
		let newFinalPairing = finalPairing;
		newFinalPairing.push(pair);
		let newSchema = schema;
		let index = newSchema.indexOf(selectedSchema);
		if (index > -1) {
			newSchema.splice(index, 1);
		}
		let newInputs = inputs;
		index = newInputs.indexOf(selectedInput);
		if (index > -1) {
			newInputs.splice(index, 1);
		}
		setSchema(newSchema);
		setInputs(newInputs);
		setSelectedInput(null);
		setSelectedSchema(null);
		setPair(null);
		setFinalPairing(newFinalPairing);
	};
	const handlePairingClick = (index, item) => {
		let newFinalPairing = finalPairing;
		let newSchema = schema;
		let newInputs = inputs;

		newFinalPairing.splice(index, 1);
		newInputs.push(item[0]);
		newSchema.push(item[1]);
		setFinalPairing([...newFinalPairing]);
		setInputs(newInputs);
		setSchema(newSchema);
	};

	const handleCSVUpload = async (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = async (readerEvent) => {
			const csvData = await readerEvent.target.result;
			const jsonData = await csvJSON(csvData);
			setInputData([jsonData, 'csv']);
		};
		reader.readAsText(file);
		event.target.value = '';
	};
	// ignores commas and still converts to json
	function csvJSON(text, quoteChar = '"', delimiter = ',') {
		var rows = text.split('\n');
		var headers = rows[0].split(',');

		const regex = new RegExp(
			`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`,
			'gs'
		);

		const match = (line) =>
			[...line.matchAll(regex)].map((m) => m[2]).slice(0, -1);

		var lines = text.split('\n');
		const heads = headers ?? match(lines.shift());
		lines = lines.slice(1);

		return lines.map((line) => {
			return match(line).reduce((acc, cur, i) => {
				// replace blank matches with `null`
				const val = cur.length <= 0 ? null : Number(cur) || cur;
				const key = heads[i] ?? `{i}`;
				return { ...acc, [key]: val };
			}, {});
		});
	}
	const handleXLSXUpload = async (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		let result = null;
		reader.onload = async (event) => {
			const workbook = await xlsx.read(event.target.result, {
				type: 'binary'
			});
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const sheetData = xlsx.utils.sheet_to_json(sheet);
			result = sheetData;
			setInputData([result, 'xlsx']);
		};

		reader.readAsArrayBuffer(file);
		e.target.value = '';
	};
	const transform = (object, pairs, batch_id) => {
		console.log(batch_id);
		let newObject = {};
		pairs.forEach((pair) => {
			// hardcoding batch id
			newObject = {
				...newObject,
				...{ [pair[1]]: object[pair[0]] },
				...{
					batch_id: batch_id,
					email_verified: false,
					phone_verified: false
				}
			};
		});
		return newObject;
	};
	const submitToDatabase = async () => {
		await setLoading(true);
		let newBatch = await create(
			{
				org_id: 1,
				assignee_id: 1,
				assignee_name: 'John Don',
				entries: inputData[0].length
			},
			'api/batches'
		);
		console.log(newBatch, '-----------------------------------');
		let transformedData = inputData[0].map((item) => {
			return transform(item, finalPairing, newBatch[0].id);
		});

		let chunked = [];
		const processData = async (data) => {
			console.log(data[0], '--------------------------------');
			if (data.length > 100) {
				chunked.push(data.splice(0, 100));
				await processData(data);
			} else {
				chunked.push(data);

				for (let i = 0; i < chunked.length; i++) {
					await create(
						chunked[i],
						`api/prospects/bulk?email=${isEmailChecked.toString()}&phone=${isPhoneChecked.toString()}&DNC=${isDNCChecked.toString()}`
					);
				}
			}
		};
		if (transformedData.length > 100) {
			await processData(transformedData);
		} else {
			await create(
				transformedData,
				`api/prospects/bulk?email=${isEmailChecked.toString()}&phone=${isPhoneChecked.toString()}&DNC=${isDNCChecked.toString()}`
			);
			updateBoard();
		}
		setLoading(false);
		const i = Object.assign([], schema_raw);
		setSchema(i);
		changeData(await getAll(schema_OG[drawer].route, 0));
		selectDrawer(null);
		selectDrawer('Prospects');
	};
	return (
		<div id="edit-form-container">
			<div id="upload-control" className="flex-row">
				<div id="upload-button-container" className="flex-row">
					<label for="csv-upload" className="upload-button zain">
						Upload CSV
					</label>
					<input
						id="csv-upload"
						type="file"
						accept=".csv"
						onChange={handleCSVUpload}
						style={{ display: 'none' }}
					/>
					<label for="xlsx-upload" className="upload-button zain">
						Upload XLSX
					</label>
					<input
						id="xlsx-upload"
						type="file"
						accept=".xlsx"
						onChange={handleXLSXUpload}
						style={{ display: 'none' }}
					/>
				</div>
				{finalPairing.length > 0 ? (
					<div className="flex-column">
						<div
							id="info-section"
							className="center-items zain flex-row"
						>
							{loading ? (
								<div>
									Submitting data and awaiting response...
								</div>
							) : (
								<div>
									You can return unwanted pairs back to the
									list by clicking on them.
								</div>
							)}
							<div
								id="database-submit"
								className="upload-button zain"
								onClick={submitToDatabase}
								disabled={loading}
							>
								Submit to Database
							</div>
						</div>
						<div className="center-items flex-row space-between zain">
							<div className="flex-row center-items toggle-box">
								<span className="switch-label">
									Verify Phone
								</span>
								<label class="switch">
									<input
										id="verify-phone"
										type="checkbox"
										checked={isPhoneChecked}
										onChange={handleChange}
									/>
									<span class="slider round"></span>
								</label>
							</div>
							<div className="flex-row center-items toggle-box">
								<span className="switch-label">Verify DNC</span>
								<label class="switch">
									<input
										id="verify-DNC"
										type="checkbox"
										checked={isDNCChecked}
										onChange={handleChange}
									/>
									<span class="slider round"></span>
								</label>
							</div>
							<div className="flex-row center-items toggle-box">
								<span className="switch-label">
									Verify Email
								</span>
								<label class="switch">
									<input
										id="verify-email"
										type="checkbox"
										checked={isEmailChecked}
										onChange={handleChange}
									/>
									<span class="slider round"></span>
								</label>
							</div>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
			<div id="upload-sort" className="flex-row zain">
				<div id="selection-section" className="upload-column">
					<div id="pairing-container" className="flex-column">
						<div className="flex-column">
							<div className="pairing-header">
								<span>Input Spreadsheet Columns</span>
							</div>
							<div
								id="input-section"
								className="pair-holders flex-row"
							>
								{inputs.map((item) => {
									return (
										<div
											className={`column-card${selectedInput === item ? ' upload-highlighted' : ''}`}
											onClick={() =>
												manageSelected(item, 'input')
											}
										>
											{item}
										</div>
									);
								})}
								<span>
									{inputs.length === 0 ? 'None.' : ''}
								</span>
							</div>
						</div>
						<div className="flex-column">
							<div className="pairing-header">
								<span>Expected Columns</span>
							</div>
							<div
								id="schema-section"
								className="pair-holders flex-row"
							>
								{schema.map((item) => {
									return (
										<div
											className={`column-card${selectedSchema === item ? ' upload-highlighted' : ''}`}
											onClick={() =>
												manageSelected(item, 'schema')
											}
										>
											{item}
										</div>
									);
								})}
								<span>
									{schema.length === 0 ? '   None.' : ''}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div
					id="pair-button-container"
					className="upload-column center-items flex-column"
				>
					{pair ? (
						<>
							<span>
								Are you sure you wish to pair these together?
							</span>
							<div id="final-pair-container" className="flex-row">
								<div id="final-input" className={`column-card`}>
									{pair[0]}
								</div>
								<div id="final-schema" className="column-card">
									{pair[1]}
								</div>
							</div>
							<button
								id="pair-button"
								className="center-items zain"
								onClick={handleAdd}
							>
								Add
							</button>
						</>
					) : (
						'Please select one of each.'
					)}
				</div>
				<div
					id="pairing-section"
					className={`upload-column ${finalPairing.length > 0 ? '' : ' center-items'}`}
				>
					<div id="pairs-container" className="flex-row">
						{finalPairing.map((item, index) => {
							return (
								<div
									className="pair-container flex-row"
									key={index}
									onClick={() =>
										handlePairingClick(index, item)
									}
								>
									<div className="flex-column">
										<span className="column-card-header">
											Upload
										</span>
										<div className="final column-card">
											{item[0]}
										</div>
									</div>
									<div className="flex-column">
										<span className="column-card-header">
											Database
										</span>
										<div className="final column-card">
											{item[1]}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<BatchList changeData={changeData} page={page} />
		</div>
	);
};
export default Uploader;
