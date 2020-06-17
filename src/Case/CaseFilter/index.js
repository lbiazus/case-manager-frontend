import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Formik, Form, Field } from 'formik';
import { Grid, Button, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui'

import { getFilter } from '../../redux/case/selectors';
import { searchCases } from '../../redux/case/actions';

const useStyles = makeStyles(theme => ({
	field: {
		padding: "25px"
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

const CaseFilter = props => {
	const classes = useStyles();
	const { filter, searchCases } = props;

	const baseName = process.env.PUBLIC_URL || '/case-manager-web';

	const getCases = (values, actions) => {
		values.tags = values.tags ? values.tags.split(',') : [];
		searchCases(values).then(() => {
			actions.setSubmitting(false);
		})
	}

	const createCase = id => {
		window.location.top = `${baseName}/case-form`;
	}

	return (
		<Grid container xs={12}>
			<Grid item xs={12}>
				<Formik
					enableReinitialize
					validateOnMount={true}
					initialValues={filter}
					onSubmit={(values, actions) => {
						getCases(values, actions)}}
						render={({ submitForm, resetForm }) => (
							<Form>
							<>
								<Grid container xs={12}>
									<Grid item className={classes.field} xs={8}>
										<Field
											name="client"
											component={TextField}
											label="Client"
											variant="outlined"
											fullWidth
											/>
									</Grid>
									<Grid item className={classes.field} xs={4}>
										<Field
												name="creationDate"
												component={TextField}
												label="Creation Date"
												variant="outlined"
												type="date"
												fullWidth
												InputLabelProps={{
													shrink: true,
												}}
												/>
									</Grid>
								</Grid>
								<Grid container xs={12}>
									<Grid item className={classes.field} xs={8}>
										<Field
											name="tags"
											component={TextField}
											label="Tags"
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
								</Grid>
								<Grid container xs={12}>
									<Grid item xs={6} lg={9}/>
									<Grid item xs={2} lg={1}>
										<Button variant="contained" color="default" onClick={() => resetForm()}>
												Clear
										</Button>
									</Grid>
									<Grid item xs={2} lg={1}>
										<Button variant="contained" color="primary" onClick={() => submitForm()}>
												Search
										</Button>
									</Grid>
									<Grid item xs={2} lg={1}>
										<Button variant="contained" color="primary" onClick={() => createCase()}>
												Add
										</Button>
									</Grid>
								</Grid>
							</>
						</Form>
					)}
				/>
			</Grid>
		</Grid>
	);
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			searchCases
		},
		dispatch
	);

const mapStateToProps = state => ({
	filter: getFilter(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CaseFilter);
