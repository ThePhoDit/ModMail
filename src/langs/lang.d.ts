export default interface lang {
	name: string;

	messages: {
		setupCompleted: string;
	}

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
	},
}