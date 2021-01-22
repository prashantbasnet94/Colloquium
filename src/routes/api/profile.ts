import express from 'express';
const auth = require('../../middleware/auth');
const router = express.Router();
const Profile = require('../../model/Profiles');
const User = require('../../model/User');
router.post('/', auth, async (req, res) => {
	const { subject, bio, isAvailable, major } = req.body;
	let findUser = await User.findById(res.locals.user.id).select('-password');

	try {
		let profile = new Profile({
			user: res.locals.user.id,
			name: findUser.name,
			subject,
			bio,
			major,
			isAvailable,
		});
		console.log(profile);
		await profile.save();
		res.send(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('server error');
	}
});

router.get('/', async (req, res) => {
	try {
		let profile = await Profile.find();
		res.send(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});

router.get('/:id', async (req, res) => {
	console.log(req.params.id);
	// console.log(req.params.id);
	try {
		let profile = await Profile.findOne({ user: req.params.id });
		res.json(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error');
	}
});
module.exports = router;
