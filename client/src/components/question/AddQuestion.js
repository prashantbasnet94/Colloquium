import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { submitQuestion, submitComment } from '../../actions/question';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Help from '@material-ui/icons/Help';
import {
	Avatar,
	TextField,
	Container,
	Typography,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: '#264653',
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: '#264653',
		align: 'center',
	},
}));

const AddQuestion = ({ oneq, submitQuestion }) => {
	const classes = useStyles();
	const [formData, setFormData] = useState({
		subject: '',
		section: '',
		problem: '',
		link: '',
	});
	const { subject, section, problem, link } = formData;
	const change = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		submitQuestion({ subject, section, problem, link });
	};

	if (!oneq) {
		return <Redirect to="/"></Redirect>;
	}

	return (
		<Container>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<Help />
				</Avatar>
				<Typography>Add Event Details</Typography>
				<form className={classes.form} onSubmit={(e) => onSubmit(e)}>
					<TextField
						variant="outlined"
						margin="normal"
						label="subject"
						name="subject"
						autoFocus
						fullWidth
						value={subject}
						onChange={(e) => {
							change(e);
						}}
					/>

					<TextField
						variant="outlined"
						margin="normal"
						label="section"
						name="section"
						autoFocus
						fullWidth
						value={section}
						onChange={(e) => {
							change(e);
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						name="problem"
						label="title"
						autoFocus
						fullWidth
						value={problem}
						onChange={(e) => {
							change(e);
						}}
					/>

					<TextField
						variant="outlined"
						margin="link"
						name="link"
						label="external resources link"
						autoFocus
						fullWidth
						value={link}
						onChange={(e) => {
							change(e);
						}}
					/>

					<Button type="submit" variant="contained" className={classes.submit}>
						Ask
					</Button>
				</form>
			</div>
		</Container>
	);
};
AddQuestion.propTypes = {
	submitQuestion: PropTypes.func.isRequired,
};
const mapStatetoProps = (state) => ({
	oneq: state.question.oneq,
});
export default connect(mapStatetoProps, { submitQuestion })(AddQuestion);
