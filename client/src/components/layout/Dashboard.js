import React, { useEffect, Fragment } from 'react';
import Spinner from 'react-bootstrap-spinner';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadQuestions } from '../../actions/question';
import { loadUser } from '../../actions/user';
import Question from '../layout/question';
import { CircularProgress, Container, Button } from '@material-ui/core';
const Dashboard = ({
	loadQuestions,
	auth: { loading, isAuthenticated },
	loadUser,
	questions,
	state,
}) => {
	useEffect(() => {
		// loadQuestions();
	}, []);
	const viewall = () => {
		loadQuestions();
	};
	useEffect(()=>viewall(),[])
	return questions ? (
		<Container component="main">
			<p>You want to get solution for any problem</p>
			<Link to="/create-question" style={{ textDecoration: 'none' }}>
				<Button style={{ background: 'green', color: 'white' }}>
					Add Event
				</Button>
			</Link>
			<Button
				onClick={viewall}
				style={{ background: '#264653', color: '#ffffff' }}
			>
				View All
			</Button>
			{questions.length !== 0 ? (
				<Question />
			) : (
				<p>
					You have not{' '}
					<Link to="/create-question" style={{ textDecoration: 'none' }}>
						asked
					</Link>{' '}
					any questions{' '}
				</p>
			)}
		</Container>
	) : (
		<CircularProgress disableShrink />
	);
};

Dashboard.propTypes = {
	loadQuestions: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	questions: state.question.questions,
	user: state.user,
	state: state,
});

export default connect(mapStateToProps, { loadQuestions, loadUser })(Dashboard);
