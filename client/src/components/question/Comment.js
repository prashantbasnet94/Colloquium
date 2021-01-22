import React, { useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { getComment } from '../../actions/comment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { setUpvote } from '../../actions/upvote';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { CircularProgress } from '@material-ui/core';
import Tutor from '../tutor/TutorCard';
const Comment = (props) => {
	useEffect(() => {
		const id = props.id;
		props.getComment({ id });
	}, []);
	const vote = (id) => {
		props.setUpvote({ id });
	};

	const classes = useStyles();
	if (props.loading === true) {
		return <CircularProgress disableShrink />;
	} else {
		return (
			<div className={classes.root}>
				<h1>{props.comments === null ? 0 : props.comments.length} Answers</h1>
				{props.comments != null &&
					props.comments.length > 0 &&
					props.comments.map((comm) => (
						<Grid container>
							<Grid item xs={1}>
								<div>
									<IconButton className={classes.grid1}>
										<ArrowDropUpIcon
											fontSize="large"
											onClick={() => vote(comm._id)}
										/>
									</IconButton>
									<div className={classes.grid1}>{comm.value}</div>
									<IconButton className={classes.grid1}>
										<ArrowDropDownIcon fontSize="large" />
									</IconButton>
								</div>
							</Grid>
							<Grid className={classes.grid} xs={11}>
								<Paper className={classes.paper2}>{comm.content}</Paper>
							</Grid>
							<Grid className={classes.grid} xs={11}>
								<Tutor user={comm.name} id={comm._id} />
							</Grid>
						</Grid>
					))}
			</div>
		);
	}
};
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'tight',
	},
	textel: {
		textAlign: 'left',
	},
	texttel2: {
		textAlign: 'right',
	},
	margin: {
		margin: theme.spacing(),
	},
	paper2: {
		padding: theme.spacing(2),
		textAlign: 'left',
		background: '#ebeded',
	},
	grid: {
		display: 'flex',
		alignItems: 'center',
		display: 'flex',
	},
	grid1: {
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
	},
}));
Comment.propTypes = {
	getComment: PropTypes.func.isRequired,
	setUpvote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	loading: state.question.loading,
	comments: state.comment.comments,
});

export default connect(mapStateToProps, { getComment, setUpvote })(Comment);
