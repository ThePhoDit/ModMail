import { Schema, model } from 'mongoose';
import { COLORS } from '../Constants';

const user = {
	id: {
		type: String,
		required: true,
		index: true
	},
	username: {
		type: String,
		required: true
	},
	discriminator: {
		type: String,
		required: true
	},
	avatarURL: {
		type: String,
		required: true
	}
};

const message = {
	timestamp: {
		type: Date,
		required: true
	},
	id: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	author: {
		type: user,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	attachments: {
		type: [String],
		required: true,
		default: []
	}
};

const log = new Schema({
	open: {
		type: Boolean,
		required: true
	},
	botID: {
		type: String,
		required: true
	},
	guildID: {
		type: String,
		required: true
	},
	channelID: {
		type: String,
		required: true,
		index: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date()
	},
	closedAt: {
		type: Date
	},
	recipient: {
		type: user,
		required: true
	},
	creator: {
		type: user,
		required: true
	},
	closer: {
		type: user
	},
	messages: {
		type: [message],
		required: true,
		default: []
	},
	nsfw: {
		type: Boolean,
		required: true,
		default: false
	},
	title: {
		type: String
	},
	note: {
		type: String
	},
	subscriptions: {
		type: [String],
		required: true,
		default: []
	}
});

const permission = {
	REGULAR: [String],
	SUPPORT: [String],
	ADMIN: [String]
};

const embed = {
	creation: {
		title: {
			type: String,
			required: true,
			default: 'Thread Opened',
			maxlength: 256
		},
		description: {
			type: String,
			required: true,
			default: 'Thank you for contacting the support team, we will reply to you as soon as possible.',
			maxlength: 2048
		},
		footer: {
			type: String,
			required: true,
			default: 'Please be patient.',
			maxlength: 2048
		},
		footerImageURL: {
			type: String
		},
		color: {
			type: String,
			required: true,
			default: COLORS.LIGHT_BLUE
		}
	},
	closure: {
		title: {
			type: String,
			required: true,
			default: 'Thread Closed',
			maxlength: 256
		},
		description: {
			type: String,
			required: true,
			default: 'Send a message to open a new thread.',
			maxlength: 2048
		},
		footer: {
			type: String,
			required: true,
			default: 'Please do not abuse of this system.',
			maxlength: 2048
		},
		footerImageURL: {
			type: String
		},
		color: {
			type: String,
			required: true,
			default: COLORS.RED
		}
	},
	staff: {
		title: {
			type: String,
			required: true,
			default: 'New Thread',
			maxlength: 256
		},
		color: {
			type: String,
			required: true,
			default: COLORS.BLUE
		}
	}
};

const config = new Schema({
	botID: {
		type: String,
		required: true
	},
	prefix: {
		type: String,
		required: true,
		default: '/',
		maxlength: 4
	},
	mainCategoryID: {
		type: String,
		required: true
	},
	logsChannelID: {
		type: String
	},
	status: {
		type: String
	},
	blacklist: {
		type: [String],
		required: true,
		default: []
	},
	levelPermissions: {
		type: permission
	},
	commandsPermissions: {
		type: Schema.Types.Mixed
	},
	aliases: {
		type: Schema.Types.Mixed
	},
	notificationRole: {
		type: String
	},
	embeds: {
		type: embed,
		required: true,
		default: embed
	},
	snippets: {
		type: Schema.Types.Mixed
	},
	expirationDate: {
		type: Number
	}
});

const Log = model('log', log, 'logs');
const Config = model('config', config, 'configs');

export {
	Log,
	Config
};
