import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	grid: {
		padding: "25px 50px",
    zIndex: 999,
    position: "absolute"
  },
	card: {
		overflowY: "auto",
		display: "flex",
		height: "calc(100vh - 50px)"
	}
}))

const Page = props => {
	const classes = useStyles();
	const { content } = props;

	return (
		<Grid container className={classes.grid}>
      <Grid item xs={12}>
				<Card className={classes.card} xs={12}>
					<Grid item xs={12}>
						{content}
					</Grid>
				</Card>
			</Grid>
		</Grid>
	);
};

Page.defaultProps = {};

Page.propTypes = {
	content: PropTypes.arrayOf(PropTypes.node)
};

export default Page;
