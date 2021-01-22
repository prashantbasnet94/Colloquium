import express from 'express';
import Fuse from 'fuse.js';
const router = express.Router();
const Question = require('../../model/Question');
router.post('/question', async (req: any, res: any) => {
	const { searchValue } = req.body;
	// console.log(searchValue);
	try {
		let questions = await Question.find();
		// console.log(questions);
		const options = {
			includeScore: true,
			keys: ['subject', 'problem', 'userName'],
		};
		const fuse = new Fuse(questions, options);
		const result = fuse.search(searchValue);
		// console.log(result);
		var obj = [];
		// console.log(result);
		for (var i = 0; i < result.length; i++) {
			//@ts-ignore
			obj.push(result[i].item);
		}
		//@ts-ignore
		res.send(obj);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
