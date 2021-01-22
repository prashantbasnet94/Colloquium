import express from 'express';
const router = express.Router();
const Message = require('../../model/Message');
const User = require('../../model/User');
const auth = require('../../middleware/auth');
router.post('/:id', auth, async (req, res) => {
	const details = req.body;
	let user = await User.findById(res.locals.user.id).select('-password');
	try {
		let message = new Message({
			sender: user.id,
			receiver: req.params.id,
			details,
		});
	} catch (err) {
		console.log(err.message);
	}
});
module.exports = router;
