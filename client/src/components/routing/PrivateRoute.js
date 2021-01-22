import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, Router } from 'react-router-dom';
const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated },
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to="/login"> </Redirect>
				)
			}
		/>
	);
};
PrivateRoute.propTypes = {
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
