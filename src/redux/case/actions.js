import caseService from '../../api/case'

import * as types from './types';

export const searchCases = (
	filter,
	service = caseService
	) => async dispatch => {
		await service.searchCases(filter).then(data =>
				dispatch({type: types.SEARCH_CASES, payload: data}));
}

export const insertCase = (
	courtCase,
	service = caseService
	) => async dispatch => {
		await service.insertCase(courtCase).then(message =>
				dispatch({
					type: types.INSERT_CASE,
					payload: {
						type: "success",
						value: message
					}
				}
			));
}

export const updateCase = (
	courtCase,
	service = caseService
	) => async dispatch => {
		await service.updateCase(courtCase).then(message =>
				dispatch({
					type: types.UPDATE_CASE,
					payload: {
						type: "success",
						value: message
					}
				}
			));
}

export const findCase = (
	id,
	service = caseService
) => async dispatch => {
	await service.findCase(id).then(data =>
		dispatch({type: types.FIND_CASE, payload: data}));
}

export const deleteCase = (
	id,
	service = caseService
	) => async dispatch => {
		await service.deleteCase(id).then(message =>
				dispatch({
					type: types.DELETE_CASE,
					payload: {
						type: "success",
						value: message
					}
				}
			));
}
