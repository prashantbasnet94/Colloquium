import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
	CircularProgress,
	CardContent,
	Card,
	TableRow,
	Table,
	TableCell,
	TableBody,
	Typography,
} from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { deleteQuestion } from '../../actions/question';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles((theme) => ({
	top: {
		paddingTop: 30,
	},
	root: {
		background: '#f0efeb',
	},
	content: {
		paddingTop: 10,
	},
	inner: {
		minWidth: 1050,
	},
	nameContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
	actions: {
		justifyContent: 'flex-end',
	},
}));
const Ques = ({ questions, state, question: { loading, deleted } }) => {
	const classes = useStyles();
	// if (deleted) {
	// 	window.location.reload();
	// }
	return !loading ? (
		// <div>
		// 	{/* <TableContainer component={Paper} xs={0}>
		// 		<Table className={classes.table} aria-label="simple table">
		// 			<TableHead>
		// 				{' '}
		// 				<TableRow>
		// 					<TableCell align="center">
		// 						<h2 className="text-primary">Your Questions</h2>
		// 					</TableCell>
		// 				</TableRow>
		// 			</TableHead>
		// 			<TableBody>
		// 				{questions != null &&
		// 					questions.length > 0 &&
		// 					questions.map((ques) => (
		// 						<TableRow>
		// 							<Link
		// 								style={{ textDecoration: 'none' }}
		// 								to={{ pathname: '/question-info', state: ques }}
		// 							>
		// 								<TableCell align="left">{ques.problem}</TableCell>
		// 							</Link>
		// 						</TableRow>
		// 					))}
		// 			</TableBody>
		// 		</Table>
		// 	</TableContainer> */}
		<div className={classes.top}>
			<Card className={classes.root}>
				<CardContent className={classes.content}>
					Top Questions
					<Table>
						<TableBody>
							{questions != null &&
								questions.length > 0 &&
								questions.map((ques) => (
									<TableRow>
										{ques.comments.length === 0 ? (
											<TableCell style={{ color: 'red' }}>
												0
												<Typography
													variant="overline"
													display="block"
													gutterBottom
												>
													Answer
												</Typography>
											</TableCell>
										) : (
											<TableCell alignCenter style={{ color: 'green' }}>
												{ques.comments.length}{' '}
												<Typography
													variant="overline"
													display="block"
													gutterBottom
												>
													Answer
												</Typography>
											</TableCell>
										)}
										<TableCell>
											<Link
												style={{ textDecoration: 'none', color: 'black' }}
												to={{ pathname: '/question-info', state: ques }}
											>
												{' '}
												{ques.problem}
											</Link>
										</TableCell>
										<Hidden xsDown>
											<TableCell xs={0}>
												<Link
													style={{
														textDecoration: 'none',
														color: 'black',
													}}
													to={`/profile/${ques.user}`}
												>
													{ques.userName}
												</Link>
											</TableCell>
										</Hidden>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	) : (
		<CircularProgress disableShrink />
	);
};

Ques.propTypes = {
	questions: PropTypes.array.isRequired,
	question: PropTypes.func.isRequired,
	deleteQuestion: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	questions: state.question.questions,
	question: state.question,
	deleted: state.question.deleted,
	state,
});

export default connect(mapStateToProps, { deleteQuestion })(Ques);
