const states = [
	{ name: 'Alabama', abbreviation: 'AL', timezone: 'Central Time Zone' },
	{ name: 'Alaska', abbreviation: 'AK', timezone: 'Alaska Time Zone' },
	{ name: 'Arizona', abbreviation: 'AZ', timezone: 'Mountain Time Zone' },
	{ name: 'Arkansas', abbreviation: 'AR', timezone: 'Central Time Zone' },
	{ name: 'California', abbreviation: 'CA', timezone: 'Pacific Time Zone' },
	{ name: 'Colorado', abbreviation: 'CO', timezone: 'Mountain Time Zone' },
	{ name: 'Connecticut', abbreviation: 'CT', timezone: 'Eastern Time Zone' },
	{ name: 'Delaware', abbreviation: 'DE', timezone: 'Eastern Time Zone' },
	{ name: 'Florida', abbreviation: 'FL', timezone: 'Eastern Time Zone' },
	{ name: 'Georgia', abbreviation: 'GA', timezone: 'Eastern Time Zone' },
	{
		name: 'Hawaii',
		abbreviation: 'HI',
		timezone: 'Hawaii-Aleutian Time Zone'
	},
	{ name: 'Idaho', abbreviation: 'ID', timezone: 'Mountain Time Zone' },
	{ name: 'Illinois', abbreviation: 'IL', timezone: 'Central Time Zone' },
	{ name: 'Indiana', abbreviation: 'IN', timezone: 'Eastern Time Zone' },
	{ name: 'Iowa', abbreviation: 'IA', timezone: 'Central Time Zone' },
	{ name: 'Kansas', abbreviation: 'KS', timezone: 'Central Time Zone' },
	{ name: 'Kentucky', abbreviation: 'KY', timezone: 'Eastern Time Zone' },
	{ name: 'Louisiana', abbreviation: 'LA', timezone: 'Central Time Zone' },
	{ name: 'Maine', abbreviation: 'ME', timezone: 'Eastern Time Zone' },
	{ name: 'Maryland', abbreviation: 'MD', timezone: 'Eastern Time Zone' },
	{
		name: 'Massachusetts',
		abbreviation: 'MA',
		timezone: 'Eastern Time Zone'
	},
	{ name: 'Michigan', abbreviation: 'MI', timezone: 'Eastern Time Zone' },
	{ name: 'Minnesota', abbreviation: 'MN', timezone: 'Central Time Zone' },
	{ name: 'Mississippi', abbreviation: 'MS', timezone: 'Central Time Zone' },
	{ name: 'Missouri', abbreviation: 'MO', timezone: 'Central Time Zone' },
	{ name: 'Montana', abbreviation: 'MT', timezone: 'Mountain Time Zone' },
	{ name: 'Nebraska', abbreviation: 'NE', timezone: 'Central Time Zone' },
	{ name: 'Nevada', abbreviation: 'NV', timezone: 'Pacific Time Zone' },
	{
		name: 'New Hampshire',
		abbreviation: 'NH',
		timezone: 'Eastern Time Zone'
	},
	{ name: 'New Jersey', abbreviation: 'NJ', timezone: 'Eastern Time Zone' },
	{ name: 'New Mexico', abbreviation: 'NM', timezone: 'Mountain Time Zone' },
	{ name: 'New York', abbreviation: 'NY', timezone: 'Eastern Time Zone' },
	{
		name: 'North Carolina',
		abbreviation: 'NC',
		timezone: 'Eastern Time Zone'
	},
	{ name: 'North Dakota', abbreviation: 'ND', timezone: 'Central Time Zone' },
	{ name: 'Ohio', abbreviation: 'OH', timezone: 'Eastern Time Zone' },
	{ name: 'Oklahoma', abbreviation: 'OK', timezone: 'Central Time Zone' },
	{ name: 'Oregon', abbreviation: 'OR', timezone: 'Pacific Time Zone' },
	{ name: 'Pennsylvania', abbreviation: 'PA', timezone: 'Eastern Time Zone' },
	{ name: 'Rhode Island', abbreviation: 'RI', timezone: 'Eastern Time Zone' },
	{
		name: 'South Carolina',
		abbreviation: 'SC',
		timezone: 'Eastern Time Zone'
	},
	{ name: 'South Dakota', abbreviation: 'SD', timezone: 'Central Time Zone' },
	{ name: 'Tennessee', abbreviation: 'TN', timezone: 'Central Time Zone' },
	{ name: 'Texas', abbreviation: 'TX', timezone: 'Central Time Zone' },
	{ name: 'Utah', abbreviation: 'UT', timezone: 'Mountain Time Zone' },
	{ name: 'Vermont', abbreviation: 'VT', timezone: 'Eastern Time Zone' },
	{ name: 'Virginia', abbreviation: 'VA', timezone: 'Eastern Time Zone' },
	{ name: 'Washington', abbreviation: 'WA', timezone: 'Pacific Time Zone' },
	{
		name: 'West Virginia',
		abbreviation: 'WV',
		timezone: 'Eastern Time Zone'
	},
	{ name: 'Wisconsin', abbreviation: 'WI', timezone: 'Central Time Zone' },
	{ name: 'Wyoming', abbreviation: 'WY', timezone: 'Mountain Time Zone' }
];

const getTimezoneAndLocalTime = (stateOrAbbreviation) => {
	if (stateOrAbbreviation) {
		stateOrAbbreviation = stateOrAbbreviation.trim();
		const state = states.find(
			(s) =>
				s.name.toLowerCase() === stateOrAbbreviation.toLowerCase() ||
				s.abbreviation.toLowerCase() ===
					stateOrAbbreviation.toLowerCase()
		);
		if (!state) {
			return 'State not found';
		}

		const timezone = state.timezone;
		const now = new Date();
		const options = {
			timeZone: getTimeZoneIdentifier(timezone),
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true
		};
		const localTime = now.toLocaleTimeString('en-US', options);

		return { timezone, localTime };
	} else {
		return 'None given';
	}
};

const getTimeZoneIdentifier = (timezone) => {
	switch (timezone) {
		case 'Eastern Time Zone':
			return 'America/New_York';
		case 'Central Time Zone':
			return 'America/Chicago';
		case 'Mountain Time Zone':
			return 'America/Denver';
		case 'Pacific Time Zone':
			return 'America/Los_Angeles';
		case 'Alaska Time Zone':
			return 'America/Anchorage';
		case 'Hawaii-Aleutian Time Zone':
			return 'Pacific/Honolulu';
		default:
			return 'UTC';
	}
};
export default getTimezoneAndLocalTime;
