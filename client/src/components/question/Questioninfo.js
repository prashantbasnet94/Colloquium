import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getComment } from '../../actions/comment';
import { submitComment } from '../../actions/comment';
import { setUpvote } from '../../actions/upvote';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Container from '@material-ui/core/Container';
import Comment from './Comment';
import Iframe from 'react-iframe'

const Questioninfo = (props) => {
	// useEffect(() => {
	// 	let id = props.location.state._id;
	// 	// props.setUpvote({ id });
	// 	props.getComment({ id });
	// }, []);

	const ques = props.location.state;
	const classes = useStyles();
	const [formData, setFormData] = useState({
		content: '',
		id: `${ques._id}`,
	});
	const { content, id } = formData;
	const change = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		props.submitComment({ id, content });
		setFormData({ ...formData, content: '' });
	};

	 const getWindowHeight=()=>{
		return Math.max(
			document.documentElement.clientHeight,
			window.innerHeight || 0
		);
	}

	return (
		<Container component="main">
			<p>Please upvote the answer you think was helful.</p>
			<div className={classes.root}>
				<Link to="/create-question" style={{ textDecoration: 'none' }}>
					<Button style={{ background: '#264653', color: '#ffffff' }}>
						Ask Question
					</Button>
				</Link>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<h1 className="ques text-primary">{ques.problem}</h1>
							<p className={classes.textel}>Asked</p>
							<p className={classes.texttel2}>subject {ques.subject}</p>

						</Paper>
						<Grid item xs={12}>
							{/* sets the height of the iframe to half the size of screen height*/}
							<Iframe url={ques.link}
									width="100%"
									height={getWindowHeight()/2}
									id="myId"
									className="myClassname"
									display="initial"
									position="relative"/>

						</Grid>
					</Grid>
					<Comment id={props.location.state._id} />
					<Grid item xs={12}>
						<Paper>
							Your Answer
							<form className="form" onSubmit={(e) => onSubmit(e)}>
								<div className="form-group">
									<TextField
										variant="outlined"
										margin="normal"
										fullWidth
										autoFocus
										required
										type="text"
										name="content"
										value={content}
										onChange={(e) => {
											change(e);
										}}
									/>
								</div>
								<Button
									type="submit"
									style={{ background: '#264653', color: '#ffffff' }}
								>
									Post
								</Button>
							</form>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

// const FormRow = ({ setUpvote, id }) => {
// 	console.log({ setUpvote, id });
// 	const classes = useStyles();
// 	return (
// 		<Fragment>
// 			<div>
// 				<IconButton
// 					className={classes.grid1}
// 					onClick={() => {
// 						setUpvote({ id });
// 					}}
// 				>
// 					<ArrowDropUpIcon fontSize="large" />
// 				</IconButton>
// 				{/* <div className={classes.grid1}>{props.upvote}</div> */}
// 				<IconButton className={classes.grid1}>
// 					<ArrowDropDownIcon fontSize="large" />
// 				</IconButton>
// 			</div>
// 		</Fragment>
// 	);
// };

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
		paddingTop: theme.spacing(2),
		textAlign: 'tight',
		background: '#ebeded',
	},
	grid: {
		display: 'flex',
		alignItems: 'center',
	},
	grid1: {
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
	},
}));

Questioninfo.propTypes = {
	submitComment: PropTypes.func.isRequired,
	getComment: PropTypes.func.isRequired,
	setUpvote: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
	submitComment,
	getComment,
	setUpvote,
})(Questioninfo);
