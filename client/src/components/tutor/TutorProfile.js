import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getOneTutor } from '../../actions/tutor';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import {
	Card,
	CardContent,
	Grid,
	Typography,
	Avatar,
	Button,
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		minHeight: 'fit-content',
	},
	content: {
		alignItems: 'center',
		display: 'flex',
	},
	title: {
		fontWeight: 700,
	},
	avatar: {
		height: 150,
		align: 'center',
		width: 150,
		fontSize: 150,
		backgroundColor: deepOrange[500],
	},
	icon: {
		height: 32,
		width: 32,
	},
	menuText: {
		marginRight: 18,
	},
	bio: {
		paddingTop: 20,
	},
}));

const TutorProfile = (props) => {
	const id = props.id;
	// props.getOneTutor({ id });
	useEffect(() => {
		console.log(props);
		// console.log('this is useeffet');
		props.getOneTutor({ id });
	}, []);
	const classes = useStyles();
	const profile = props.profile;
	const getName = () => {
		const str = profile.name;

		const ch1 = str.charAt(0);

		return ch1;
	};

	return props.tutor.loading ? (
		<CircularProgress />
	) : (
		<div>
			<IconButton color="primary" size="large">
				<EditIcon fontSize="inherit" />
			</IconButton>
			<Card className={classes.root}>
				<CardContent>
					<Grid item>
						<Avatar className={classes.avatar}>{getName()}</Avatar>
					</Grid>
					<Grid container justify="space-between">
						<Grid item>
							<Typography
								color="inherit"
								align="center"
								variant="h4"
								style={{ color: '#000000' }}
							>
								{profile.name}
							</Typography>
							{profile.subject.map((subj) => (
								<Chip
									className={classes.menuText}
									label={subj}
									color="primary"
								/>
							))}
							<Typography className={classes.bio}>{profile.bio}</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</div>
	);
};

TutorProfile.propTypes = {};

const mapStateToProps = (state) => ({
	profile: state.tutor.profile,
	tutor: state.tutor,
});

export default connect(mapStateToProps, { getOneTutor })(TutorProfile);
