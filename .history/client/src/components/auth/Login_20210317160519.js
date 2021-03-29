import React, { Fragment, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { login, oAuth } from '../../actions/auth';
import {
	Button,
	FormControl,
	TextField,
	Typography,
	Avatar,
	Container,
	capitalize,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FcGoogle } from 'react-icons/fc'
import { auth, googleAuthProvider } from '../../services/firebase'
import { AuthContext } from '../../reducers/user'
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
	root: {},
	heading: {
		color: theme.primary,
		align: 'center',
		marginTop: '10px'
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
	icon: {
		width: '18px',
		height: '18px',
		display: 'inline-block',
		verticalAlign: 'middle',
		boxSizing: 'border-box'
	},
	Gsubmit: {
		height: '40px',
		borderWidth: 0,
		backgroundColor: 'whitesmoke',
		color: '#737373',
		whiteSpace: 'nowrap',
		borderRadius: '5px',
		boxShadow: '1px 1px 0px 1px rgba(0,0,0,0.05)',
		padding: 0,
		justifyContent: 'center',
		letterSpacing: '1.2px',
		"&:hover": {
			boxShadow: '1px 4px 5px 1px rgba(0,0,0,0.1)',
			color: 'black'
		}
	},
}));



const Login = ({ setAlert, login, isAuthenticated, googleLogin }) => {
	const dispatch = useDispatch();

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
	const history = useHistory()
	const loginWithGoogle = async(e) => {
		// auth.signInWithPopup(googleAuthProvider).then(async result => {
		// 	const { user } = result;
		// 	console.log(user);
		// 	const idTokenResult = await user.getIdTokenResult();
		dispatch(oAuth())
		history.push('/');
	}
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
					<Button
						onClick={loginWithGoogle}
						fullWidth
						variant="contained"
						className={classes.Gsubmit}
					>
						<FcGoogle className={classes.icon} />
						&nbsp;
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
