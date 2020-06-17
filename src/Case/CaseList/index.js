import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { getCases, getMessage } from '../../redux/case/selectors';
import { deleteCase, searchCases } from '../../redux/case/actions';
import ToastManager from '../../common/ToastManager';

const useStyles = makeStyles(theme => ({
	table: {
		minWidth: 650,
  },
	paper: {
		maxWidth: "95%",
		margin: "25px",
		paddingBottom: "25px"
	}
}))

const CaseList = props => {
	const classes = useStyles();
	const { cases, message, deleteCase, searchCases } = props;

	const baseName = process.env.PUBLIC_URL || '/case-manager-web';

	useEffect(() => {
		searchCases({tags: []});
	}, [searchCases, cases])

	useEffect(() => {
		if (!message || !message.value) {
			return;
		}

		ToastManager.showMessage(message.type, message.value);
	}, [message])

	const editCase = id => {
		window.location.top = `${baseName}/case-form/${id}`;
	}

	const removeCase = id => {
		deleteCase(id).then(() => {
			searchCases();
		})
	}

	return (
    <TableContainer component={Paper} elevation={3} className={classes.paper}>
      <Table size="small" >
        <TableHead>
          <TableRow>
            <TableCell>Folder</TableCell>
            <TableCell>Client</TableCell>
						<TableCell>Title</TableCell>
						<TableCell>Descrition</TableCell>
            <TableCell>Access</TableCell>
            <TableCell>Creation Date</TableCell>
						<TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cases && cases.map((courtCase) => (
            <TableRow key={courtCase.id}>
              <TableCell>{courtCase.folder}</TableCell>
              <TableCell>{courtCase.client}</TableCell>
							<TableCell>{courtCase.title}</TableCell>
							<TableCell>{courtCase.description}</TableCell>
              <TableCell>{courtCase.access}</TableCell>
              <TableCell>{courtCase.creationDate}</TableCell>
							<TableCell>
								<IconButton color="primary"
									onClick={() => editCase(courtCase.id)}>
										<EditIcon />
								</IconButton>
								<IconButton color="secondary"
									onClick={() => removeCase(courtCase.id)}>
										<DeleteIcon />
								</IconButton>
							</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	);
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			deleteCase,
			searchCases
		},
		dispatch
	);

const mapStateToProps = state => ({
	cases: getCases(state),
	message: getMessage(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CaseList);
