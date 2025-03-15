import * as xlsx from 'xlsx';

export const handleCSVUpload = async (event, setInputData) => {
	const file = event.target.files[0];
	const reader = new FileReader();
	let result;
	reader.onload = async (readerEvent) => {
		const csvData = await readerEvent.target.result;
		const jsonData = await convertCSVtoJSON(csvData);
		console.log(jsonData, 'csv');
		setInputData(jsonData);
	};
	reader.readAsText(file);
	console.log(result, 'sending result');
	return result;
};

const convertCSVtoJSON = (csvData) => {
	const rows = csvData.split('\n');
	const headers = rows[0].split(',');
	let result = [];
	for (let i = 1; i < rows.length; i++) {
		let data = {};
		let currentLine = rows[i].split(',');
		for (let j = 0; j < headers.length; j++) {
			data[headers[j].trim()] = currentLine[j]
				? currentLine[j].trim()
				: '';
		}
		result.push(data);
	}
	return result;
};
export const handleXLSXUpload = async (e, setInputData) => {
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
		setInputData(sheetData);
		console.log(sheetData, 'sheeet data----------------');
	};

	reader.readAsArrayBuffer(file);
	return result;
};
