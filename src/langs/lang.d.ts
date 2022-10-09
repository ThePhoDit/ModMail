export default interface lang {
	name: string;

	messages: {
		setupCompleted: string;
		messageSoon: string;
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
		},
		reply: {
			noReply: string;
		},
		rename: {
			noName: string;
			success: string;
			error: string;
		},
		ping: string;
		nsfw: {
			enabled: string;
			disabled: string;
			enableError: string;
			disableError: string;
		},
		note: {
			noNote: string;
			success: string;
			error: string;
		}
		move: {
			noCategory: string;
			notFound: string;
			alreadyInCategory: string;
			noPermission: string;
			success: string;
			error: string;
		},
		help: {
			title: string;
			description: string;
		},
		edit: {
			noMessage: string;
			noContent: string;
			notFound: string;
			success: string;
			error: string;
		},
		delete: {
			noMessage: string;
			notFound: string;
			success: string;
			error: string;
		},
		contact: {
			noUser: string;
			notFound: string;
			isBot: string;
			channeLError: string;
			DMError: string;
			alreadyContacted: string;
			success: string;
			message: string;
			error: string;
		},
		close: {
			invalidTime: string;
			closerError: string;
			closerUpdateError: string;
			title: string;
			description: string;
		},
		category: {
			noCategory: string;
			exists: string;
			notFoundID: string;
			notFoundName: string
			created: string
			createdError: string
			deleted: string
			deletedError: string
			empty: string
			list: string
			help: string
		},
		blacklist: {
			noOption: string;
			noUser: string;
			notFound: string;
			alreadyBlacklisted: string;
			notBlacklisted: string;
			blacklisted: string;
			unblacklisted: string;
			error: string;
		},
		alias: {
			noOption: string
			noName: string
			reservedAlias: string
			noCommand: string
			invalidCommand: string
			alreadyExists: string
			created: string
			createdError: string
			unknownAlias: string
			deleted: string
			deletedError: string
		},
		permission: {
			noLevel: string
			noOption: string
			noID: string
			alreadyExists: string
			notExists: string
			added: string
			addedError: string
			removed: string
			removedError: string
			unknownCommand: string
		},
		set: {
			title: string;
			description: string;
			usage: {
				title: string;
				description: string;
			},
			noValue: string;
			noImage: string;
			avatar: {
				error: string;
				success: string;
			}
			unknownError: string;
			usernameSuccess: string;
			prefix: {
				success: string;
				error: string;
				unknownError: string;
			}
			category: {
				success: string;
				error: string;
				unknownError: string;
			}
			logs: {
				success: string;
				error: string;
				unknownError: string;
			}
			status: {
				success: string;
				unknownError: string;
			}
			statusType: {
				success: string;
				unknownError: string;
				invalidTwitch: string;
				help: string;
			}
			accountAge: {
				invalidFormat: string;
				success: string;
				unknownError: string;
			}
			guildAge: {
				invalidGuild: string;
				success: string;
				unknownError: string;
			}
			notification: {
				success: string;
				unknownError: string;
			}
			excludeInternalLogs: {
				isExcluded: string;
				isIncluded: string;
				unknownError: string;
			}
			embedCreation: {
				success: (iin: string) => string;
				unknownError: (iin: string) => string;
			}
			embedContact: {
				success: (iin: string) => string;
				unknownError: (iin: string) => string;
			}
			embedReply: {
				success: (iin: string) => string;
				unknownError: (iin: string) => string;
			}
			embedUserReply: {
				success: (iin: string) => string;
				unknownError: (iin: string) => string;
			}
			embedClosure: {
				success: (iin: string) => string;
				unknownError: (iin: string) => string;
			}
			embedStaff: {
				success: (iin: string) => string;
				unknownError: (iin: string) => string;
			}
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
		invalidHexColor: string;
		invalidLink: string;
	},
}
