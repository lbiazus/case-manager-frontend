import React from 'react';

import Page from '../../common/Page';
import CaseFilter from '../../Case/CaseFilter';
import CaseList from '../../Case/CaseList';

const CaseSearch = props => {

	return (
		<Page
			content={[
				<CaseFilter key="caseFilter" />,
				<CaseList key="caseList" />
			]}
		/>
	);
};

export default CaseSearch;
