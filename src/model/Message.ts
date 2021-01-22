import mongoose, { Schema } from 'mongoose';
const MessageSchema = new Schema({
	sender: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	receiver: {
		type: String,
		required: true,
	},
	time: {
		type: Date,
		default: Date.now,
	},
	detail: {
		type: String,
		required: true,
	},
});
const Message = mongoose.model('message', MessageSchema);
module.exports = Message;
