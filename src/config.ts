export default {
	bot_prefix: '', // The prefix you will use to interact with the bot.
	bot_status: '', // The status to display (optional).
	bot_category: '', // The category ID where new threads will be created.
	bot_managers: [], // List of roles IDs that will be able to use commands with manager permission requirement (optional).
	bot_helpers: [], // List of roles IDs that will be able to use commands with helper permission requirement (optional).
	logs_channel: '', // Channel where logs will be sent (optional).
	role_ping: '', // ID of the role to ping on new threads (optional).
	messages: { // Messages text segments (optional).
		thread_open_title: '',
		thread_open_main: '',
		thread_open_footer: '',
		thread_close_title: '',
		thread_close_main: '',
		thread_close_footer: '',
		open_notification: ''
	}
};