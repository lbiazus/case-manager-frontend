import * as types from './types';

const INITIAL_STATE = {
	cases: [],
	message: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.SEARCH_CASES:
			return {
				...state,
				cases: action.payload,
			};
		case types.FIND_CASE:
				return normalizeCase(state, action);
		case types.INSERT_CASE:
			return {
				...state,
				message: action.payload
			}
		case types.UPDATE_CASE:
				return {
					...state,
					message: action.payload
				}
		case types.DELETE_CASE:
			return {
				...state,
				message: action.payload
			}
		default:
			return state;
	}
};

const normalizeCase = (state, action) => {
	let courtCase = action.payload
	courtCase.tags = courtCase.tags ? courtCase.tags.join() : '';

	return {
		...state,
		case: courtCase,
	}
}
