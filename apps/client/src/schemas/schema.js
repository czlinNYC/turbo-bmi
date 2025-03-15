export const schema = {
	Users: {
		route: 'api/users',
		schema: [
			['Username', 'username'],
			['Name', 'name'],
			['Email', 'email'],
			['Phone', 'phone'],
			['Company', 'company'],
			['Status', 'status'],
			['Password', 'password']
		]
	},
	Companies: {
		route: 'api/companies',
		schema: [
			['Contact Name', 'contact_name'],
			['Email', 'email'],
			['Website', 'website'],
			['Phone', 'phone'],
			['Company', 'company'],
			['Status', 'status']
		]
	},
	Prospects: {
		route: 'api/prospects',
		schema: [
			['Contact', 'contact_name'],
			['Job Title', 'job_title'],
			['Phone', 'phone'],
			['E-mail', 'email'],
			['Company Name', 'company_name'],
			['Address', 'address'],
			['Industry', 'industry']
		]
	},
	Organizations: {
		route: 'api/organizations',
		schema: [
			['Account Holder Name', 'account_holder_name'],
			['Orginization Name', 'org_name'],
			['Status', 'status']
		]
	},
	Organizations_full: {
		route: 'api/organizations',
		schema: [
			['Account Holder Name', 'account_holder_name'],
			['Orginization Name', 'org_name'],
			['Status', 'status']
		]
	},
	Prospects_full: {
		route: 'api/prospects',
		schema: [
			['Company Name', 'company_name'],
			['Contact', 'contact_name'],
			['Frist Name', 'first_name'],
			['Last Name', 'last_name'],
			['Job Title', 'job_title'],
			['E-mail', 'email'],
			['Website', 'website'],
			['Phone', 'phone'],
			['Address', 'address'],
			['City', 'city'],
			['State', 'state'],
			['Zip', 'zip'],
			['Company', 'company_name'],
			['Industry', 'industry'],
			['Sub Industry', 'sub_industry']
		]
	},
	navbar: [
		['public', null],
		['contacts', 'Prospects'],
		['corporate_fare', 'Companies'],
		['group', 'Users'],
		['source_environment', 'Organizations']
	],
	profilenav: [
		null,
		['help', 'Help'],
		['schedule', 'To-do'],
		['rss_feed', 'RSS Feed'],
		['notifications', 'Notifications'],
		['assignment', 'Assignments'],
		['search', 'Search']
	],
	schema_raw: [
		'company_name',
		'contact_name',
		'last_name',
		'first_name',
		'job_title',
		'email',
		'phone',
		'country',
		'website',
		'address',
		'city',
		'state',
		'zip',
		'industry',
		'sub_industry'
		// 'batch_id',
		// 'email_verified',
		// 'phone_verfied'
	]
};
