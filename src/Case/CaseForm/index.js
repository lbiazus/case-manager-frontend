import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Grid, makeStyles, Button, MenuItem } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import * as yup from 'yup';

import { getCase, getMessage } from '../../redux/case/selectors';
import { findCase, insertCase, updateCase } from '../../redux/case/actions';
import ToastManager from '../../common/ToastManager';

const validationSchema = yup.object().shape({
	folder: yup.string().max(40),
	client: yup.string().required(),
	title: yup.string().required(),
	tags: yup.string(),
	description: yup.string(),
	notes: yup.string(),
	responsible: yup.string().required(),
	access: yup.string().required()
});

const useStyles = makeStyles(theme => ({
	field: {
		padding: "25px"
	},
	button: {
		margin: "25px"
	}
}))

const types = [
	{
		value: "PUBLIC",
		label: "Public"
	},
	{
		value: "PRIVATE",
		label: "Private"
	}
]

const CaseForm = props => {
	const classes = useStyles();
	const { courtCase, message, findCase, insertCase, updateCase } = props;
	const path = window.location.pathname;
	 const caseId = path.substring(path.lastIndexOf("/")+1);
	 const baseName = process.env.PUBLIC_URL || '/case-manager-web';


	useEffect(() => {
		if (!message || !message.value) {
			return;
		}

		ToastManager.showMessage(message.type, message.value);
	}, [message])

	useEffect(() => {
		if (!caseId) {
			return;
		}

		findCase(caseId);
	}, [findCase, caseId])

	const backToList = () => {
		window.location.top = `${baseName}/case`;
	}

	const saveCase = (values, actions) => {
		values.tags = values.tags.split(",");
		if (!values.id) {
			values.creationDate = new Date();
			insertCase(values).then(() => {
				actions.setSubmitting(false);
				backToList();
			}).catch(error => {
				actions.setSubmitting(false);
				ToastManager.showErrorMessage(error.message);
			});
			return;
		}

		updateCase(values).then(() => {
			actions.setSubmitting(false);
			backToList();
		}).catch(error => {
			actions.setSubmitting(false);
			ToastManager.showErrorMessage(error.message);
		});
	}

	return (
		<Grid container xs={12}>
			<Grid item xs={12}>
				<Formik
					enableReinitialize
					validateOnMount={true}
					validationSchema={validationSchema}
					initialValues={courtCase}
					onSubmit={(values, actions) => {
						saveCase(values, actions)}}
						render={({ submitForm, isSubmitting, touched, errors }) => (
							<Form>
							<>
								<Grid container xs={12}>
									<Grid item className={classes.field} xs={6}>
										<Field
											name="folder"
											component={TextField}
											label="Folder"
											variant="outlined"
											fullWidth
											/>
									</Grid>
									<Grid item className={classes.field} xs={6}>
										<Field
											name="client"
											component={TextField}
											label="Client"
											variant="outlined"
											fullWidth
											/>
									</Grid>
									<Grid item className={classes.field} xs={6}>
										<Field
											name="title"
											component={TextField}
											label="Title"
											variant="outlined"
											fullWidth
											/>
									</Grid>
									<Grid item className={classes.field} xs={4}>
										<Field
												name="access"
												component={TextField}
												label="Access"
												variant="outlined"
												select
												fullWidth
												>
												{types.map(type => <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>)}
										</Field>
									</Grid>
									<Grid item className={classes.field} xs={12}>
										<Field
											name="description"
											component={TextField}
											label="Description"
											variant="outlined"
											fullWidth
											/>
									</Grid>
									<Grid item className={classes.field} xs={12}>
										<Field
											name="tags"
											component={TextField}
											label="Tags"
											variant="outlined"
											fullWidth
											/>
									</Grid>
									<Grid item className={classes.field} xs={12}>
										<Field
											name="notes"
											component={TextField}
											label="Notes"
											variant="outlined"
											fullWidth
											/>
									</Grid>
									<Grid item className={classes.field} xs={12}>
										<Field
											name="responsible"
											component={TextField}
											label="Responsible"
											variant="outlined"
											fullWidth
											/>
									</Grid>
								</Grid>
								<Grid container xs={12}>
									<Grid item xs={8} lg={10}/>
									<Grid item xs={2} lg={1}>
										<Button variant="contained" color="default" className={classes.button}
											onClick={() => backToList()}>
												Back
										</Button>
									</Grid>
									<Grid item xs={2} lg={1}>
										<Button variant="contained" color="primary" className={classes.button}
											disabled={Object.keys(errors).length > 0 || isSubmitting}
											onClick={() => submitForm()}>
												Save
										</Button>
									</Grid>
								</Grid>
							</>
						</Form>
					)}
				/>
			</Grid>
		</Grid>
	)
};

CaseForm.defaultProps = {}

CaseForm.propTypes = {
	caseId: PropTypes.string
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			findCase,
			insertCase,
			updateCase
		},
		dispatch
	);

const mapStateToProps = state => ({
	courtCase: getCase(state),
	message: getMessage(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CaseForm);
