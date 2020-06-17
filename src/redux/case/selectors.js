export const getFilter = state => state.courtCase.caseFilter || {
	client: '',
	access: '',
	tags: '',
	creationDate: ''
}

export const getCases = state => state.courtCase.cases || []
export const getMessage = state => state.courtCase.message || '';
export const getCase = state => state.courtCase.case || {
	folder: '',
	client: '',
	title: '',
	tags: '',
	description: '',
	notes: '',
	responsible: '',
	access: ''
}
