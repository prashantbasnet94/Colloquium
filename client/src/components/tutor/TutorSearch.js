import React, { useState, useEffect } from 'react';
import SearchBar from 'material-ui-search-bar';
import image from '../../img/collab.jpg';
import { TextField, Button, Typography } from '@material-ui/core';
import { getTutors } from '../../actions/tutor';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import { getQuestionSearch } from '../../actions/search';
import TutorList from './TutorsList';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { relative } from 'path';
const useStyles = makeStyles((theme) => ({
	img: {
		flexGrow: 1,
		opacity: 0.8,
		backgroundColor: theme.palette.secondary['A100'],
		background: `url(${image})no-repeat`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		marginTop: 5,
		padding: 100,
		paddingBottom: 300,
		height: 100,
	},
	text: {
		position: 'relative',
		bottom: 200,
	},
	form: {
		opacity: 1,
	},
}));
const TutorSearch = ({
	history,
	profiles,
	getTutors,
	getQuestionSearch,
	searched,
}) => {
	const classes = useStyles();
	useEffect(() => {
		getTutors();
	}, []);

	const [data, setData] = useState({
		searchValue: '',
	});
	const { searchValue } = data;
	const change = (e) => {
		setData({ ...data, searchValue: e });
	};
	const onSubmit = (e) => {
		// const options = {
		// 	includeScore: true,
		// 	keys: ['subject', 'user', 'name'],
		// };
		// // const data = [];
		// // profiles.map((profile) => {
		// // 	data.push([profile.name, profile._id]);
		// // });
		// const fuse = new Fuse(profiles, options);
		// const result = fuse.search(search);
		// console.log(result);
		// setData({ ...data, search: '' });
		getQuestionSearch({ searchValue });
		const change = false;
		history.push('/questions');
	};
	const redirect = () => {
		return <Redirect to="/questions"></Redirect>;
	};
	return (
		<div>
			<div className={classes.img}></div>
			<div className={classes.text}>
				<form className={classes.text} onSubmit={(e) => onSubmit(e)}>
					<Typography align="center" color="secondary" variant="h1">
						Collab
					</Typography>
					<Typography align="center" color="secondary" variant="h4">
						 Collaboration Platform{' '}
					</Typography>
					<SearchBar
						name="searchValue"
						placeholder="Search for project or project owner"
						value={searchValue}
						onChange={(e) => change(e)}
						onRequestSearch={(e) => onSubmit(e)}
						style={{
							margin: '0 auto',
							maxWidth: 800,
						}}
					/>
				</form>
				<TutorList />
			</div>
		</div>
	);
};

TutorSearch.propTypes = {
	searched: PropTypes.bool.isRequired,
};
const mapStatetoProps = (state) => ({
	profiles: state.tutorList.profiles,
	searched: state.search.searched,
});
export default connect(mapStatetoProps, { getTutors, getQuestionSearch })(
	TutorSearch
);
