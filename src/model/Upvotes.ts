import mongoose, { Schema } from 'mongoose';

const UpvoteSchema = new Schema({
	upvoters: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
		},
	],
	comment: {
		type: Schema.Types.ObjectId,
		ref: 'comment',
	},
});
const Upvote = mongoose.model('upvote', UpvoteSchema);
module.exports = Upvote;
