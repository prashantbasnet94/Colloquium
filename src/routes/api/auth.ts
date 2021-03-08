import express from 'express';
const bcrypt = require('bcryptjs');
const router = express.Router();
const secret = 'loveyoubabes';
const JWT = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../model/User');
router.get('/', auth, async (req, res) => {
	try {
		let user = await User.findById(res.locals.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});

router.get('/test',async (req,res)=>{
	try{
		res.send("hello")
	}catch (err){

	}finally {
		res.json("hello")
	}
})

router.get('/:id', async (req, res) => {
	console.log(req.params.id);
	try {
		let user = await User.findById(req.params.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('server error');
	}
});
router.post(
	'/',
	[
		check('email', 'Enter valid email').isEmail(),
		check('password', 'password is required').not().isEmpty(),
	],
	async (req: any, res: any) => {
		const errors = validationResult(req);
		const { email, password } = req.body;
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		} else {
			let user = await User.findOne({ email });
			if (user) {
				bcrypt.compare(password, user.password, function (
					err: any,
					result: any
				) {
					console.log(result);
					if (result) {
						const payload = {
							user: {
								id: user.id,
							},
						};
						const token = JWT.sign(payload, secret, { expiresIn: '7d' });
						res.json({ token });
					} else {
						res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
					}
				});
			} else {
				res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
			}
		}
	}
);
module.exports = router;
