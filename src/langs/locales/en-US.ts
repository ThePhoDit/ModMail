import lang from '../lang';

export default {
	name: 'English (United States)',

	messages: {
		setupCompleted: 'Server completely setup. A ModMail category has been created for you.',
		messageSoon: 'You will receive a message soon.'
	},

	commands: {
		unsubscribe: {
			success: 'You have been unsubscribed from this thread.',
			notSubscribed: 'You are not subscribed to this thread.',
			error: 'There was an error unsubscribing you to this thread.',
		},
		title: {
			success: 'The title has been updated.',
			error: 'The title could not be updated.',
			noTitle: 'Provide a title or write `removetitle` to remove the title.'
		},
		subscribe: {
			success: 'You will now receive notifications on new responses.',
			alreadySubscribed: 'You are already subscribed to this thread.',
			error: 'There was an error subscribing you to this thread.',
		},
		snippet: {
			invalidName: 'You must provide a snippet name.',
			invalidText: 'You must provide a valid snippet text.',
			takenName: 'This snippet name is already taken.',
			success: 'The snippet `%s` has been created successfully.',
			error: 'There was an error creating the snippet.',
			unknownSnippet: 'I couldn\'t find a snippet with that name.',
			updated: 'The snippet `%s` has been updated successfully.',
			deleted: 'The snippet `%s` has been deleted successfully.',
			cantDelete: 'I couldn\'t delete the snippet `%s`.',
			empty: 'There are no snippets in this server.',
			list: 'NAME | CONTENT',
			help: 'Select `create`, `edit`, `delete` or `list`.'
		},
		reply: {
			noReply: 'You must provide a reply message.'
		},
		rename: {
			noName: 'You must provide a new name for the thread.',
			success: 'The thread has been renamed to `%s`.',
			error: 'There was an error renaming the thread.'
		},
		ping: 'My ping is `%sms`.',
		nsfw: {
			enabled: 'This thread is now marked as NSFW.',
			disabled: 'This thread is no longer marked as NSFW.',
			enableError: 'There was an error marking this thread as NSFW.',
			disableError: 'There was an error removing the NSFW mark from this thread.'
		},
		note: {
			noNote: 'Provide a note or write `removenote` to remove the note.',
			success: 'The note has been updated.',
			error: 'The note could not be updated.'
		},
		move: {
			noCategory: 'You must provide a category name.',
			notFound: 'I couldn\'t find a category with that name.',
			alreadyInCategory: 'This thread is already in that category.',
			noPermission: 'I don\'t have permission to move this thread to that category.',
			success: 'The thread has been moved to `%s`.',
			error: 'There was an error moving the thread.'
		},
		help: {
			title: 'ModMail by ThePhoDit',
			description: 'ModMail is a Discord bot that allows you to communicate with your users via DMs.\nIf you want to check out the commands of the bot, read our docs at https://modmail.phodit.xyz',
		},
		edit: {
			noMessage: 'You must provide a message ID.',
			noContent: 'You must provide a new content for the message.',
			notFound: 'I couldn\'t find a message with that ID.',
			success: 'The message has been edited successfully.',
			error: 'There was an error editing the message.'
		},
		delete: {
			noMessage: 'You must provide a message ID.',
			notFound: 'I couldn\'t find a message with that ID.',
			success: 'The message has been deleted successfully.',
			error: 'There was an error deleting the message.'
		},
		contact: {
			noUser: 'You must provide a user mention or ID.',
			notFound: 'I couldn\'t find a user with that ID.',
			isBot: 'You can\'t contact a bot.',
			channeLError: 'There was an error creating the channel.',
			DMError: 'There was an error sending the DM.',
			alreadyContacted: 'You already have a thread with that user.',
			success: 'The thread has been created successfully.',
			message: 'Hello %s, this is a ModMail thread created by %m. You can reply to this message to send a message to the server staff.',
			error: 'There was an error creating the thread.'
		},
		close: {
			invalidTime: 'You must provide a valid time (Between 10 minutes and 3 days).',
			closerError: 'There was an error scheduling the thread closer.',
			closerUpdateError: 'There was an error updating the thread\'s closer.',
			title: 'Closure Scheduled',
			description: 'This thread will be closed on `%s` if no new replies are sent.'
		},
		category: {
			noCategory: 'You must provide a category name.',
			exists: 'A category with that name already exists.',
			notFoundID: 'I couldn\'t find a category with that ID.',
			notFoundName: 'I couldn\'t find a category with that name.',
			created: 'The category has been created successfully.',
			createdError: 'There was an error creating the category.',
			deleted: 'The category has been deleted successfully.',
			deletedError: 'There was an error deleting the category.',
			empty: 'I couldn\'t find any categories in this server.',
			list: 'NAME | CATEGORY',
			help: 'Select `create`, `delete` or `list`.'
		},
		blacklist: {
			noOption: 'You must provide an option (`add` or `remove`).',
			noUser: 'You must provide a user mention or ID.',
			notFound: 'I couldn\'t find a user with that ID.',
			alreadyBlacklisted: 'That user is already blacklisted.',
			notBlacklisted: 'That user is not blacklisted.',
			blacklisted: 'The user has been blacklisted successfully.',
			unblacklisted: 'The user has been unblacklisted successfully.',
			error: 'There was an error updating the blacklist.'
		},
		alias: {
			noOption: 'You must provide an option (`add` or `remove`).',
			noName: 'You must provide an alias name.',
			reservedAlias: 'That alias name is reserved.',
			noCommand: 'You must provide a command name to be aliased.',
			invalidCommand: 'That command doesn\'t exist.',
			alreadyExists: 'An alias with that name already exists.',
			created: 'The alias has been created successfully.',
			createdError: 'There was an error creating the alias.',
			unknownAlias: 'I couldn\'t find an alias with that name.',
			deleted: 'The alias has been deleted successfully.',
			deletedError: 'There was an error deleting the alias.',
		},
		permission: {
			noLevel: 'Please, select the level o command name.\nLevels: **regular**, **support** and **admin**.\nUsage: %ppermission {levelName/commandName} {add/remove} {role ID/user ID}',
			noOption: 'You must provide an option (`add` or `remove`).',
			noID: 'You must provide a role or user ID.',
			alreadyExists: 'That role or user already has that permission level.',
			notExists: 'That role or user doesn\'t have that permission level.',
			added: 'The permission has been added successfully.',
			addedError: 'There was an error adding the permission.',
			removed: 'The permission has been removed successfully.',
			removedError: 'There was an error removing the permission.',
			unknownCommand: 'I couldn\'t find a command with that name.',
		},
		set: {
			title: 'Settings you can change of the bot.',
			description: `
			\`avatar\`: attach an image to change the bot avatar.
			\`username\`: change the bot username, not the nickname.
			\`prefix\`: change the bot prefix (max length: 4).
			\`category\`: send the ID of the category where you want new threads to open.
			\`logs\`: send the ID of the channel where you want your logs to go to.
			\`status\`: change the displayed status of your bot.
			\`status_type\`: change the displayed status type of your bot.
			\`notification\`: send the role ID you want to be mentioned on thread creation.
			\`account_age\`: the age an account needs to have in order to open a new thread.
			\`guild_age\`: the time an account needs to have been inside the server in order to open a new thread.
			\`guild_age_id\`: the server ID where someone needs to have the required **guild_age**.
			\`exclude_internal_logs\`: stops logging all internal messages. It can either be true or false.
			\`embed_creation_title\`: the title of the embed sent to the user when the thread is opened.
			\`embed_creation_thumbnail\`: the thumbnail of the embed sent to the user when the thread is opened ("none" to disable).
			\`embed_creation_description\`: the description of the embed sent to the user when the thread is opened.
			\`embed_creation_color\`: the color (hex code) of the embed sent to the user when the thread is opened.
			\`embed_creation_footer_text\`: the footer of the embed sent to the user when the thread is opened.
			\`embed_creation_footer_image\`: the footer image of the embed sent to the user when the thread is opened.
			\`embed_contact_title\`: the title of the embed sent to the user when the thread is created by a staff member.
			\`embed_contact_thumbnail\`: the thumbnail of the embed sent to the user when the thread is created by a staff member ("none" to disable).
			\`embed_contact_description\`: the description of the embed sent to the user when the thread is created by a staff member.
			\`embed_contact_color\`: the color (hex code) of the embed sent to the user when the thread is created by a staff member.
			\`embed_contact_footer_text\`: the footer of the embed sent to the user when the thread is created by a staff member.
			\`embed_contact_footer_image\`: the footer image of the embed sent to the user when the thread is created by a staff member.
			\`embed_reply_color\`: the color (hex code) of the embed sent to the staff when a staff member replies to the user.
			\`embed_userReply_color\`: the color (hex code) of the embed sent to the user when a staff member replies to the user.
			\`embed_userReply_footer_text\`: the footer of the embed sent to the user when a staff member replies to the user (\`$role$\` will be replaced by the staff's highest role).
			\`embed_userReply_footer_image\`: the footer image of the embed sent to the user when when a staff member replies to the user.
			\`embed_closure_title\`: the title of the embed sent to the user when the thread is closed.
			\`embed_closure_thumbnail\`: the thumbnail of the embed sent to the user when the thread is closed ("none" to disable).
			\`embed_closure_description\`: the description of the embed sent to the user when the thread is closed.
			\`embed_closure_color\`: the color (hex code) of the embed sent to the user when the thread is closed.
			\`embed_closure_footer_text\`: the footer of the embed sent to the user when the thread is closed.
			\`embed_closure_footer_image\`: the footer image of the embed sent to the user when the thread is closed.
			\`embed_staff_title\`: the title of the embed sent to the staff when the thread is opened.
			\`embed_staff_color\`: the color (hex code) of the embed sent to the staff when the thread is opened.`,
			usage: {
				title: 'Usage',
				description: '%pset {setting} {value}',
			},
			noValue: 'You must provide a value.',
			noImage: 'You must attach an image.',
			avatar: {
				error: 'There was an error changing the bot avatar.',
				success: 'The bot avatar has been changed successfully.',
			},
			unknownError: 'There was an error changing the bot settings.',
			usernameSuccess: 'The bot username has been changed successfully.',
			prefix: {
				success: 'The bot prefix has been changed successfully.',
				error: 'The bot prefix must be between 1 and 4 characters.',
				unknownError: 'There was an error changing the bot prefix.',
			},
			category: {
				success: 'The bot category has been changed successfully.',
				error: 'The bot category must be a valid category ID.',
				unknownError: 'There was an error changing the bot category.',
			},
			logs: {
				success: 'The bot logs channel has been changed successfully.',
				error: 'The bot logs channel must be a valid channel ID.',
				unknownError: 'There was an error changing the bot logs channel.',
			},
			status: {
				success: 'The bot status has been changed successfully.',
				unknownError: 'There was an error changing the bot status.',
			},
			statusType: {
				success: 'The bot status type has been changed successfully.',
				unknownError: 'There was an error changing the bot status type.',
				invalidTwitch: 'The URL must be a valid Twitch or YouTube URL.',
				help: 'The status type must be one of the following: `playing`, `streaming`, `listening`, `watching`.',
			},
			accountAge: {
				invalidFormat: 'You have to select a valid format. For example, 1d = 1 day / 30m = 30 minutes. To disable it, just type `0`.\nValid letters: m / h / d / w / y',
				success: 'The account age restriction has been changed successfully.',
				unknownError: 'There was an error changing the account age restriction.',
			},
			guildAge: {
				invalidGuild: 'I am not in that server, please select one in which i am in.',
				success: 'The guild age ID has been changed successfully.',
				unknownError: 'There was an error changing the guild age ID.',
			},
			notification: {
				success: 'The notification role has been changed successfully.',
				unknownError: 'There was an error changing the notification role.',
			},
			excludeInternalLogs: {
				isExcluded: 'The internal logs will now be excluded',
				isIncluded: 'The internal logs will now be included',
				unknownError: 'There was an error changing the internal logs exclusion.',
			},
			embedCreation: {
				success: (iin) => `The embed creation ${iin} has been changed successfully.`,
				unknownError: (iin) => `There was an error changing the embed creation ${iin}.`,
			},
			embedContact: {
				success: (iin) => `The embed contact ${iin} has been changed successfully.`,
				unknownError: (iin) => `There was an error changing the embed contact ${iin}.`,
			},
			embedReply: {
				success: (iin) => `The embed reply ${iin} has been changed successfully.`,
				unknownError: (iin) => `There was an error changing the embed reply ${iin}.`,
			},
			embedUserReply: {
				success: (iin) => `The embed user reply ${iin} has been changed successfully.`,
				unknownError: (iin) => `There was an error changing the embed user reply ${iin}.`,
			},
			embedClosure: {
				success: (iin) => `The embed closure ${iin} has been changed successfully.`,
				unknownError: (iin) => `There was an error changing the embed closure ${iin}.`,
			},
			embedStaff: {
				success: (iin) => `The embed staff ${iin} has been changed successfully.`,
				unknownError: (iin) => `There was an error changing the embed staff ${iin}.`,
			},
		}
	},

	embeds: {
		noContent: 'No content provided.',
		files: 'Files',
		containsFiles: 'This message contains %n file%s',
		closureCancelled: {
			title: 'Closure cancelled.',
			description: 'This ticket will no longer be closed due to ticket activity.',
		},
		threadClosed: {
			title: 'Thread closed.',
			description: 'The thread from `% u` has been closed by %s',
		},
		staffReply: 'Staff Reply',
	},

	errors: {
		categoryCreate: 'A category could not be created. Setup cancelled.',
		configAdd: 'The config could not be added to the database. Setup cancelled.',
		accountAge: 'Your account is not old enough to contact the staff.',
		serverAge: 'Your account has not been in the server long enough to contact the staff.',
		unknown: 'An unknown error has occurred. Please try again later.',
		contactStaff: 'Could not send your message to the staff.',
		invalidPermissions: 'You do not have the required permissions to use this command.',
		snippet: 'An error has occurred while trying to get the snippet.',
		noLogsUrl: 'You have no logs URL configured.',
		noUserIDProvided: 'You must provide a valid user ID.',
		noLogsFound: 'I could not find any logs for this user.',
		invalidHexColor: 'You must provide a valid hex color.',
		invalidLink: 'You must provide a valid link.',
	}
} as lang;