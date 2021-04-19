import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../'
import { connect } from 'react-redux';
import { loadUser } from '../../actions/user';
import { CircularProgress, Container, Button } from '@material-ui/core';
const Profile = ({ user, loadUser }) => {
	useEffect(() => {
		if (!user) {
			loadUser();
		}
	}, []);
	return user ? (
		<Link
			to={`/profile/${user._id}`}
			style={{ textDecoration: 'none', color: 'white' }}
		>
			<i className="fas fa-user"> </i>
			<span>{user.name} </span>{' '}
		</Link>
	) : (
		<CircularProgress></CircularProgress>
	);
};

const mapStateToProps = (state) => ({
	user: state.user.user,
});

export default connect(mapStateToProps, { loadUser })(Profile);
