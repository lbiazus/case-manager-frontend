import CaseData from "../pages/CaseData";
import CaseSearch from "../pages/CaseSearch";

const routes = [
	{
		path: '/case',
		component: CaseSearch
	},
	{
		path: '/case-form',
		component: CaseData
	},
	{
		path: '/case-form/:caseId',
		component: CaseData
	}
];

export default routes;
