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
	scheduledClosure: {
		type: Date
	},
	closureMessage: {
		type: String
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

const config = new Schema({
	botID: {
		type: String,
		required: true
	},
	prefix: {
		type: String,
		required: true,
		default: '+',
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
		type: String,
		default: 'DM me for help.'
	},
	accountAge: {
		type: Number
	},
	guildAge: {
		type: Number
	},
	blacklist: {
		type: [String],
		required: true,
		default: []
	},
	levelPermissions: {
		REGULAR: {
			type: [String],
			default: [],
			required: true
		},
		SUPPORT: {
			type: [String],
			default: [],
			required: true
		},
		ADMIN: {
			type: [String],
			default: [],
			required: true
		}
	},
	commandsPermissions: {
		type: Schema.Types.Mixed,
		required: true,
		default: {}
	},
	aliases: {
		type: Schema.Types.Mixed,
		required: true,
		default: {}
	},
	notificationRole: {
		type: String
	},
	embeds: {
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
		contact: {
			title: {
				type: String,
				required: true,
				default: 'Thread Opened',
				maxlength: 256
			},
			description: {
				type: String,
				required: true,
				default: 'A member from the staff team of the server has contacted you.',
				maxlength: 2048
			},
			footer: {
				type: String,
				required: true,
				default: 'You will receive a message soon.',
				maxlength: 2048
			},
			footerImageURL: {
				type: String
			},
			color: {
				type: String,
				required: true,
				default: COLORS.YELLOW
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
	},
	snippets: {
		type: Schema.Types.Mixed,
		required: true,
		default: {}
	}
});

const Log = model('log', log, 'logs');
const Config = model('config', config, 'configs');

export {
	Log,
	Config
};
