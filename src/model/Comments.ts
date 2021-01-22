import mongoose, { Schema } from 'mongoose';
const CommentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	name: {
		type: String,
	},

	question: {
		type: Schema.Types.ObjectId,
		ref: 'question',
	},
	content: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	value: {
		type: Number,
	},
});
const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;
