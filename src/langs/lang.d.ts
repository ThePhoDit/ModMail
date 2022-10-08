export default interface lang {
	name: string;

	messages: {
		setupCompleted: string;
	}

	commands: {
		unsubscribe: {
			success: string;
			notSubscribed: string;
			error: string;
		},
		title: {
			success: string;
			error: string;
			noTitle: string;
		},
		subscribe: {
			success: string;
			alreadySubscribed: string;
			error: string;
		},
		snippet: {
			invalidName: string;
			invalidText: string;
			takenName: string;
			success: string;
			error: string;
			unknownSnippet: string;
			updated: string;
			deleted: string;
			cantDelete: string;
			empty: string;
			list: string;
			help: string;
		}
	},

	embeds: {
		noContent: string;
		files: string;
		containsFiles: string;
		closureCancelled: {
			title: string;
			description: string;
		};
		threadClosed: {
			title: string;
			description: string;
		};
		staffReply: string;
	}

	errors: {
		categoryCreate: string;
		configAdd: string;
		accountAge: string;
		serverAge: string;
		unknown: string;
		contactStaff: string;
		invalidPermissions: string;
		snippet: string;
		noLogsUrl: string;
		noUserIDProvided: string;
		noLogsFound: string;
	},
}