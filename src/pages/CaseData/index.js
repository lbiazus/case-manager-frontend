import React from 'react';
import queryString from 'query-string';

import Page from '../../common/Page';
import CaseForm from '../../Case/CaseForm';

const CaseData = props => {
	const { caseId } = queryString.parse(props.location.search);

	return (
		<Page
			content={[
				<CaseForm key="caseForm" caseId={caseId} />
			]}
		/>
	);
};

export default CaseData;
