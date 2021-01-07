import { Schema, model } from 'mongoose';

const user = new Schema({
	user: {
		type: String,
		required: true,
		index: true
	},
	channel: {
		type: String,
		required: true,
		default: '0',
		index: true
	},
	threads: {
		type: Number,
		required: true,
		default: 0
	},
	blacklisted: {
		type: Number,
		required: true,
		default: 0
	},
	logs: {
		type: [{
			userID: String,
			location: String,
			content: String,
			images: [String]
		}],
		default: []
	}
});

const snippet = new Schema({
	name: {
		type: String,
		required: true,
		index: true
	},
	creator: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	}
});

const User = model('user', user, 'users');
const Snippet = model('Snippet', snippet, 'snippets');

export {
	User,
	Snippet
};
