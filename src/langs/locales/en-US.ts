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