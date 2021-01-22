import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Grid,
	Divider,
} from '@material-ui/core';
import image from '../../img/user.jpg';
const Tutor = (props) => {
	const useStyles = makeStyles((theme) => ({
		root: {},
		imageContainer: {
			height: 300,
			width: '100%',
			margin: '0 auto',
			background: `url(${image})no-repeat`,
			border: `2px solid ${theme.palette.divider}`,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		image: {
			width: '80%',
		},
		statsItem: {
			display: 'flex',
			alignItems: 'center',
		},
		statsIcon: {
			color: theme.palette.icon,
			marginRight: theme.spacing(1),
		},
	}));
	const classes = useStyles();
	const { profile } = props;
	const subjects = profile.subject;
	// const profiles = [
	// 	{
	// 		name: 'bisso',
	// 		descrption:
	// 			'We have not yet understood the people and the places there may be impo',
	// 	},
	// 	{ name: 'esso', descrption: 'Made stuff are expensive' },
	// 	{ name: 'pisso', descrption: 'Made stuff are expensive' },
	// 	{ name: 'losso', descrption: 'Made stuff are expensive' },
	// 	{ name: 'david', descrption: 'Made stuff are expensive' },
	// ];

	return (
		<Link
			to={`/profile/${profile.user}`}
			style={{ textDecoration: 'none', color: 'black' }}
		>
			<Card>
				<CardContent>
					<div className={classes.imageContainer}></div>
					<Typography align="center" gutterBottom variant="h4">
						{profile.name}
					</Typography>
					<Typography align="center" variant="body1" noWrap={true}>
						{profile.bio}
					</Typography>
				</CardContent>
				<Divider />
				<CardActions>
					<Grid container>
						<Grid className={classes.statsItem} item>
							{subjects.map((subject) => (
								<Typography display="inline" variant="body2">
									{subject}
								</Typography>
							))}
						</Grid>
					</Grid>
				</CardActions>
			</Card>
		</Link>
	);
};

Tutor.propTypes = {};

export default Tutor;
