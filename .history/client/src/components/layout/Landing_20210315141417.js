import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../reducers/user'

const Landing = () => {
	const { state, dispatch } = useContext(AuthContext);

	return (
		<div>
			<section className="landing">
				<div className="dark-overlay">
					<div className="landing-inner">
						{/* Test */}
						{JSON.stringify(state.user)}
						<h1 className="x-large"> Collab</h1>
						<p className="lead"> Collaboration Platform</p>
						<div className="buttons">
							<Link to="/register" className="btn btn-primary">
								Sign Up{' '}
							</Link>
							<Link to="/login" className="btn btn">
								Login
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
export default Landing;
