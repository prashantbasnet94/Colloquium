import express from 'express';
import { userInfo } from 'os';
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Question = require('../../model/Question');
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const Comment = require('../../model/Comments');
const Upvote = require('../../model/Upvotes');
router.post(
	'/',
	auth,
	[
		check('subject', 'Subject is required').not().isEmpty(),
		check('section', 'Section is required').not().isEmpty(),
		check('problem', 'Problem is required').not().isEmpty(),
		check('link', 'Link is required').not().isEmpty(),
	],
	async (req: any, res: any) => {
		const { subject, section, problem, link } = req.body;
		let user = await User.findById(res.locals.user.id).select('-password');
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			try {
				let question = new Question({
					user: res.locals.user.id,
					userName: user.name,
					subject,
					section,
					problem,
					link,
					comment: [],
				});
				await question.save();
				// res.send(question);
				res.send(question);
			} catch (err) {
				console.error(err.message);
				res.status(500).send('server error');
			}
		} else {
			return res.status(400).json({ errors: errors.array() });
		}
	}
);
//get api/questions/:id
router.get('/:id', async (req, res) => {
	// console.log(req.params.subject);
	// let questions = await Question.find({ subject: req.params.subject });
	// res.send(questions);
	try {
		let question = await Question.find({ user: req.params.id });
		console.log('hereinise te request');
		res.send(question);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});
//get all questions
//api/questions
router.get('/', async (req, res) => {
	// console.log(req.params.subject);
	// let questions = await Question.find({ subject: req.params.subject });
	// res.send(questions);
	try {
		let question = await Question.find();

		res.send(question);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

// router.post('/comment/:id', auth, async (req, res) => {
// 	const content = req.body.content;

// 	try {
// 		let user = await User.findById(res.locals.user.id).select('-password');
// 		let question = await Question.findById(req.params.id);
// 		let comment = {
// 			user: user.id,
// 			content,
// 		};
// 		question.comments.unshift(comment);
// 		await question.save();
// 		res.send(comment);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('server error');
// 	}
// });
//questions/comment/:id
router.post('/comment/:id', auth, async (req, res) => {
	try {
		const thiscomment = await Comment.findById(req.params.id);

		const upvt = await Upvote.findOne({ comment: thiscomment });
		if (!upvt) {
			const upvote = new Upvote({
				comment: thiscomment.id,
			});
			upvote.upvoters.unshift({ user: res.locals.user.id });

			await upvote.save();
			const newval = thiscomment.value + 1;
			thiscomment.value = newval;
			await thiscomment.save();
			res.send(thiscomment);
		} else {
			upvt.upvoters.unshift({ user: res.locals.user.id });
			await upvt.save();
			const newval = thiscomment.value + 1;
			thiscomment.value = newval;
			await thiscomment.save();
			res.send(thiscomment);
		}
	} catch (err) {
		res.status(500).send('server error');
	}
});

//get questions/comment/upvotes/id:

// router.get('/comment/upvote/:id', auth, async (req, res) => {
// 	try {
// 		let upvote = await Upvote.find({ comment: req.params.id });
// 		res.send(upvote);
// 	} catch (err) {
// 		res.status(500).send('server error');
// 	}
// });

//post api/questions/:id(comment)
router.post('/:id', auth, async (req, res) => {
	const content = req.body.content;
	console.log(content);
	try {
		let userName = await User.findById(res.locals.user.id).select('-password');
		// console.log(userName);
		let question = await Question.findById(req.params.id);
		let comment = new Comment({
			user: res.locals.user.id,
			name: userName.name,
			question: question.id,
			content,
			value: 0,
		});
		await comment.save();
		question.comments.unshift({ comment: comment.id });
		await question.save();
		let allcomment = await Comment.find({ question: question._id });
		res.send(allcomment);
	} catch (err) {
		res.status(500).send('server error');
	}
});

//get api/comment/questions/:id
router.get('/comment/:id', async (req, res) => {
	try {
		let comment = await Comment.find({ question: req.params.id });
		res.send(comment);
	} catch (err) {
		res.status(500).send('server error');
	}
});

//delete api/question/:id
router.delete('/:id', auth, async (req, res) => {
	try {
		let user = await User.findById(res.locals.user.id).select('-password');
		let question = await Question.findById(req.params.id);
		if (question.user == user.id) {
			await question.remove();
			let aferDeleted = await Question.find({ user: res.locals.user.id });
			res.send(aferDeleted);
		} else {
			res.json({ msg: 'You are not authorized to delete it' });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});
module.exports = router;
