import mongoose, { Schema } from 'mongoose';
const QuestionSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	userName: {
		type: String,
		required: true,
	},

	subject: {
		type: String,
		required: true,
	},
	section: {
		type: String,
		required: true,
	},
	problem: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
	comments: [
		{
			comment: {
				type: Schema.Types.ObjectId,
				ref: 'comment',
			},
		},
	],
});
const Question = mongoose.model('question', QuestionSchema);
module.exports = Question;
