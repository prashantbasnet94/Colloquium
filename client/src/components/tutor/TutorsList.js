import React, { useEffect } from 'react';
import Tutor from './Tutor';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import { getTutors } from '../../actions/tutor';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
	root: {},
	content: {},
	pagination: {
		marginTop: theme.spacing(1),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
}));

const TutorsList = ({ getTutors, profiles, loading }) => {
	useEffect(() => {
		getTutors();
	}, []);
	const classes = useStyles();
	// const products = [
	// 	{
	// 		title: 'Bishwa Bista',
	// 		description:
	// 			'computer Science major senior , I can help you with data structure.',
	// 		totalDownloads: 'her',
	// 	},
	// 	{ title: 'apple', description: 'I am happy', totalDownloads: 'her' },
	// 	{ title: 'apple', description: 'I am happy', totalDownloads: 'her' },
	// 	{ title: 'apple', description: 'I am happy', totalDownloads: 'her' },
	// 	{
	// 		title: 'Bishwa Bista',
	// 		description:
	// 			'computer Science major senior , I can help you with data structure.',
	// 		totalDownloads: 'her',
	// 	},
	// 	{ title: 'apple', description: 'I am happy', totalDownloads: 'her' },
	// 	{ title: 'apple', description: 'I am happy', totalDownloads: 'her' },
	// 	{ title: 'apple', description: 'I am happy', totalDownloads: 'her' },
	// 	{
	// 		title: 'Bishwa Bista',
	// 		description:
	// 			'computer Science major senior , I can help you with data structure.',
	// 		totalDownloads: 'her',
	// 	},
	// 	{ title: 'apple', description: 'I am happy', totalDownloads: 'her' },
	// 	{ title: 'apple', description: 'I am happy', totalDownloads: 'her' },
	// 	{ title: 'apple', description: 'I am happy', totalDownloads: 'her' },
	// ];
	if (loading) {
		return <CircularProgress disableShrink />;
	} else {
		return (
			<div className={classes.content}>
				<Grid container spacing={3}>
					{profiles.map((profile) => (
						<Grid item key={profile.id} lg={4} md={6} xs={12}>
							<Tutor profile={profile} />
						</Grid>
					))}
				</Grid>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
	profiles: state.tutorList.profiles,
	loading: state.tutorList.loading,
});
export default connect(mapStateToProps, { getTutors })(TutorsList);
