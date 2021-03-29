import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { login } from '../../actions/auth';
import {
	Button,
	FormControl,
	TextField,
	Typography,
	Avatar,
	Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {}
import { auth, googleAuthProvider } from '../../services/firebase'

const useStyles = makeStyles((theme) => ({
	root: {},
	heading: {
		color: theme.primary,
		align: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.primary,
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

const Login = ({ setAlert, login, isAuthenticated }) => {
	const classes = useStyles();
	const [formData, setFormData] = useState({
		email: 'silvinpradhan95@gmail.com',
		password: '111111',
	});
	const { email, password } = formData;
	const change = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	const onSubmit = async (e) => {
		e.preventDefault();
		// console.log({ email, password });
		login({ email, password });
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
					<i className="fas fa-user"></i> Sign into your account
				</Typography>
				<form
					action="dashboard.html"
					className={classes.form}
					onSubmit={(e) => onSubmit(e)}
				>
					<TextField
						variant="outlined"
						margin="normal"
						label="email"
						fullWidth
						autoFocus
						name="email"
						value={email}
						onChange={(e) => {
							change(e);
						}}
					></TextField>

					<TextField
						variant="outlined"
						margin="normal"
						label="password"
						fullWidth
						autoFocus
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) => {
							change(e);
						}}
					></TextField>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Log In
					</Button>
					<hr/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Login with Google
					</Button>
				</form>
				<Typography className={classes.heading}>
					Don't have an account? <Link to="/register">Register</Link>
				</Typography>
			</div>
		</Container>
	);
};
Login.propTypes = {
	setAlert: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, login })(Login);
