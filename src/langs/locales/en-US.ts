import lang from '../lang';

export default {
	name: 'English (United States)',

	messages: {
		setupCompleted: 'Server completely setup. A ModMail category has been created for you.',
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
			description: 'The thread from `%u` has been closed by %s',
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
	}
} as lang;