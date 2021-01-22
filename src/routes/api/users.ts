import express from 'express';
const router = express.Router();
const User = require('../../model/User');
const { check, validationResult } = require('express-validator');
const Profile = require('../../model/Profiles');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const secret = 'loveyoubabes';
// POST request for users
const saltRounds = 10;
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Enter valid email').isEmail(),
		check(
			'password',
			'password is required and must be 6 character or more'
		).isLength({ min: 6 }),
		check('major', 'major is required').not().isEmpty(),
	],
	async (req: any, res: any) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			var { name, email, password, major } = req.body;
			try {
				let user = await User.findOne({ email });
				if (user) {
					res.status(400).json({ errors: [{ msg: 'User Exist' }] });
				} else {
					bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
						bcrypt.hash(password, salt, async function (err: any, hash: any) {
							// Store hash in your password DB.
							password = hash;
							user = new User({ name, email, password, major });
							await user.save();
							let profile = new Profile({
								user: user.id,
								name,
								major,
							});
							await profile.save();
							// Returns JWT
							const payload = {
								user: {
									id: user.id,
								},
							};
							const token = JWT.sign(payload, secret, { expiresIn: 36000 });
							res.json({ token });
						});
					});
				}
			} catch (err) {
				console.error(err.message);
				res.status(500).send('server error');
			}
		} else {
			return res.status(400).json({ errors: errors.array() });
		}
	}
);

module.exports = router;
