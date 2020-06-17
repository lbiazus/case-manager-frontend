import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_CASE_MANAGER_BACKEND}/api/v1/case`;

class CaseService {
	searchCases(filter) {
		return axios
			.post(`${BASE_URL}/search`, filter)
			.then(resp => resp.data)
			.catch(error => {
				throw error;
			});
	}

	findCase(id) {
		return axios
			.get(`${BASE_URL}/${id}`)
			.then(resp => resp.data)
			.catch(error => {
				throw error;
			});
	}

	insertCase(courtCase) {
		return axios
			.post(`${BASE_URL}`, courtCase)
			.then(resp => resp.data)
			.catch(error => {
				throw error;
			});
	}

	updateCase(courtCase) {
		return axios
			.put(`${BASE_URL}`, courtCase)
			.then(resp => resp.data)
			.catch(error => {
				throw error;
			});
	}

	deleteCase(id) {
		return axios
			.delete(`${BASE_URL}/${id}`)
			.then(resp => resp.data)
			.catch(error => {
				throw error;
			});
	}
}

export default new CaseService();
