import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { deleteQuestion, loadQuestions } from '../../actions/question';
import { loadQuestionById } from '../../actions/question';
import TutorProfile from '../tutor/TutorProfile';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Delete from '../question/Delete';
import Sections from "../card/index"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 50,
	},
	root: {
		padding: theme.spacing(4),
	},
}));
const Ques = ({ loadQuestionById, match, userQuestions, loading, user }) => {
	const id = match.params.id;
	useEffect(() => {
		loadQuestionById({ id });
	}, [id]);
	// console.log(match);
	const classes = useStyles();

	//gets the section all in all
	let sections= new Set();
	userQuestions.forEach((item )=>{
		sections.add(item.section)

	})
	console.log(sections)
	
	// sections= Object.entries(sections.entries())
	sections=[...sections]
	 
	return !loading ? (
		<div className={classes.root}>
			{/* {user._id ? ( */}
			<Link to="/create-question" style={{ textDecoration: 'none' }}>
				<Button style={{ background: 'green', color: 'white' }}>
					Add Event
					</Button>
			</Link>
			{/* ) : (
				<p></p>
			)} */}
			<Grid container spacing={4}>
				<Grid item lg={6} md={6} xl={4} xs={12}>
					<TutorProfile id={match.params.id} />
				</Grid>

				<Grid container lg={6} md={6} xl={8} xs={12}>
					{/*<Sections/>*/}
					{/*<Sections/>*/}
					{/*<Sections/>*/}
					{/*<Sections/>*/}
					{/*<Sections/>*/}
					{/*<Sections/>*/}
					{/*<Sections/>*/}
					{/*<Sections/>*/}

		
					<Grid item lg={6} md={6} xl={6} xs={12}>
						<List component="nav" className={classes.root} aria-label="mailbox folders">
							{sections.map((item)=>{return (
								<>
									<ListItem button>
										#
										<ListItemText primary={item.toString()} />
									</ListItem>
									<Divider light/>
								</>
							)})}

						</List>
					</Grid>
				</Grid>
				
				
				<Grid item >
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								{' '}
								<TableRow>
									<TableCell align="center">
										<h2 className="text-primary">Your Projects</h2>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{userQuestions != null &&
									userQuestions.length > 0 &&
									userQuestions.map((ques) => (
										<TableRow>
											<TableCell align="left">
												<div>
													<Link
														to={{ pathname: '/question-info', state: ques }}
														style={{ textDecoration: 'none', color: 'black' }}
													>
														{ques.problem}
													</Link>
												</div>
											</TableCell>
											{user && user._id == ques.user ? (
												<Delete questionId={ques._id} />
											) : (
													<p></p>
												)}
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					
					
				</Grid>
			</Grid>
		</div>
	) : (
			<CircularProgress disableShrink />
		);
};

Ques.propTypes = {
	deleteQuestion: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	userQuestion: state.userQuestion,
	userQuestions: state.userQuestion.userQuestions,
	user: state.user.user,
	state: state,
});

export default connect(mapStateToProps, { deleteQuestion, loadQuestionById })(
	Ques
);
