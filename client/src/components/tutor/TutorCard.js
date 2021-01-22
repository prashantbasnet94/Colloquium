import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { loadUserbyId } from '../../actions/user';

const useStyles = makeStyles({
	root: {
		minWidth: 100,
	},
});
const TutorCard = (props) => {
	useEffect(() => {
		// console.log(props);
		// const id = props.user;
		// props.loadUserbyId({ id });
	}, []);
	console.log(props);
	const classes = useStyles();
	return (
		<div>
			<p className="text-primary">Answered by</p>
			<Card className={classes.root} variant="outlined">
				<CardContent></CardContent>
				<CardActions>
					<Button size="small">{props.user}</Button>
				</CardActions>
			</Card>
		</div>
	);
};
const mapStateToProps = (state) => ({
	comments: state.comment.comments,
});
export default TutorCard;
