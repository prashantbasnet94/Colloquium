import mongoose, { Schema } from 'mongoose';
const ConversationSchema = new Schema({
	message: {
		type: Schema.Types.ObjectId,
		ref: 'message',
	},
	participant1: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	participant2: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
});
const Conversation = mongoose.model('conversation', ConversationSchema);
module.exports = Conversation;
