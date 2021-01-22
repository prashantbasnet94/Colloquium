import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
	Button,
	TextField,
	Typography,
	Avatar,
	Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {},
	heading: {
		color: '#264653',
		align: 'center',
	},
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
	},
}));

const Register = ({ setAlert, register, isAuthenticated }) => {
	const classes = useStyles();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		major: '',
	});
	const { name, email, password, confirmPassword, major } = formData;
	const change = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	const onSubmit = async (e) => {
		window.scrollTo(0, 0);
		e.preventDefault();
		if (password !== confirmPassword) {
			setAlert(
				'password does	return <Redirect to="/questions"></Redirect>;ot match',
				'error'
			);
		} else {
			console.log({ name, email, password, major });
			register({ name, email, password, major });
		}
	};
	//redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/"></Redirect>;
	}

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography className={classes.heading}>
					<i className="fas fa-user"></i> Create Your Account
				</Typography>

				<form
					className={classes.form}
					action="dashboard.html"
					onSubmit={(e) => onSubmit(e)}
				>
					<TextField
						variant="outlined"
						margin="normal"
						label="name"
						name="name"
						fullWidth
						autoFocus
						value={name}
						onChange={(e) => {
							change(e);
						}}
					></TextField>
					<TextField
						variant="outlined"
						fullWidth
						autoFocus
						name="email"
						margin="normal"
						label="email"
						value={email}
						onChange={(e) => {
							change(e);
						}}
					></TextField>

					<TextField
						variant="outlined"
						fullWidth
						autoFocus
						name="major"
						margin="normal"
						label="major"
						value={major}
						onChange={(e) => {
							change(e);
						}}
					/>

					<TextField
						variant="outlined"
						fullWidth
						autoFocus
						name="password"
						margin="normal"
						label="password"
						value={password}
						onChange={(e) => {
							change(e);
						}}
					/>

					<TextField
						variant="outlined"
						fullWidth
						autoFocus
						name="confirmPassword"
						margin="normal"
						label="confirm password"
						value={confirmPassword}
						onChange={(e) => {
							change(e);
						}}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						className={classes.submit}
					>
						Register
					</Button>
				</form>
				<p className="my-1">
					Already have an account? <Link to="/login">Sign In</Link>
				</p>
			</div>
		</Container>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
