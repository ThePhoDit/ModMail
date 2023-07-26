import lang from '../lang';

export default {
	name: 'Ukrainian (Ukraine)',

	messages: {
		setupCompleted: 'Сервер налаштовано. Категорія ModMail була створена.',
		messageSoon: 'Незабаром Ви отримаєте повідомлення.'
	},

	commands: {
		unsubscribe: {
			success: 'Ви успішно відписались від цієї теми.',
			notSubscribed: 'Ви не підписані на цю тему.',
			error: 'Сталась помилка при спробі відписати вас від цієї теми.',
		},
		title: {
			success: 'Заголовок було успішно оновлено.',
			error: 'Заголовок не може бути оновлено.',
			noTitle: 'Надайте заголовок або напишіть `removetitle` щоб вилучити.'
		},
		subscribe: {
			success: 'Ви будете отримувати сповіщення про оновлення в цій темі.',
			alreadySubscribed: 'Ви вже отримуєте сповіщення по цій темі.',
			error: 'Сталась помилка при спробі відписати вас від цієї теми.',
		},
		snippet: {
			invalidName: 'Ви повинні вказати назву сніпету',
			invalidText: 'Ви повинні вказати текст сніпету.',
			takenName: 'Сніпет з такою назву вже існує.',
			success: 'Сніпет `%s` був успішно створений.',
			error: 'Сталась помилка при спробі створити сніпет.',
			unknownSnippet: 'Не вдалось знайти сніпет з такою назвою.',
			updated: 'Сніпет `%s` був успішно оновлений.',
			deleted: 'Сніпет `%s` був успішно видалений.',
			cantDelete: 'Не вдалось видалити сніпет `%s`.',
			empty: 'На цьому сервері немає сніпетів.',
			list: 'НАЗВА | ВМІСТ',
			help: 'Виберіть `create`, `edit`, `delete` або `list`.'
		},
		reply: {
			noReply: 'Ви повинні надати повідомлення для відповіді.'
		},
		rename: {
			noName: 'Ви повинні надати нову назву для цієї теми.',
			success: 'Нова назва цієї теми: `%s`.',
			error: 'Сталась помилка при спробі змінити назву теми.'
		},
		ping: 'Мій пінг: `%sms`.',
		nsfw: {
			enabled: 'Цю тему помічено як NSFW.',
			disabled: 'Цю тему більше не помічено як NSFW.',
			enableError: 'Сталась помилка при спробі помітити цю тему як NSFW.',
			disableError: 'Сталась помилка при спробі зняти мітку NSFW з цієї теми.'
		},
		note: {
			noNote: 'Надайте примітку або напишіть `removenote` щоб її вилучити.',
			success: 'Примітка була вилучена.',
			error: 'Примітка не може бути змінена.'
		},
		move: {
			noCategory: 'Ви повинні надати назву для цієї категорії.',
			notFound: 'Не вдалось знайти категорію з цієї назвою.',
			alreadyInCategory: 'Ця тема вже знаходиться в цій категорії.',
			noPermission: 'У мене відсутні права щоб перемістити цю тему в категорію.',
			success: 'Цю тему переміщено до `%s`.',
			error: 'Сталась помилка при спробі перемістити цю тему.'
		},
		help: {
			title: 'ModMail створено ThePhoDit',
			description: 'ModMail це Discord бот який дозволяє Вам комінувати з Вашими учасниками через Особисті повідомлення.\nЯкщо Ви бажаєте перевірити команди бота, прочитайте нашу документацію за посиланням https://modmail.phodit.xyz',
		},
		edit: {
			noMessage: 'Ви повинні надати ID повідомлення.',
			noContent: 'Ви повинні надати новий текст повідомлення.',
			notFound: 'Не вдалось знайти повідомлення з вказаним ID.',
			success: 'Повідомлення було упішно відредаговано.',
			error: 'Сталась помилка при спробі відредагувати повідомлення.'
		},
		delete: {
            noMessage: 'Ви повинні надати ID повідомлення.',
			notFound: 'Не вдалось знайти повідомлення з вказаним ID.',
			success: 'Повідомлення було успішно видалено.',
			error: 'Сталась помилка при спробі видалити повідомлення.'
		},
		contact: {
			noUser: 'Ви повинні @згадати учасника або надати його ID',
			notFound: 'Не вдалось знайти учасника з таким ID.',
			isBot: 'Заборонено писати ботам.',
			channelError: 'Сталась помилка при спробі створити канал.',
			DMError: 'Сталась помилка при спробі відправити повідомлення',
			alreadyContacted: 'У вас вже є відкрита тема з цим учасником.',
			success: 'Тема була успішно створена.',
			message: 'Привіт %s, це тема ModMail створена %m. Ви можете відповісти на це повідомлення, щоб надіслати повідомлення для адміністарції серверу.',
			error: 'Сталась помилка при спробі створити тему.'
		},
		close: {
			invalidTime: 'Ви повинні вказати дійсне значення часу (Між 10 хвилинами та 3 днями).',
			closerError: 'Сталася помилка під час планування закриття теми.',
			closerUpdateError: 'Сталася помилка під час оновлення планування закриття теми.',
			title: 'Закриття заплановано',
			description: 'Цю тему буде закрито `%s` якщо не буде нових повідомлень.'
		},
		category: {
			noCategory: 'Ви повинні надати назву категорії.',
			exists: 'Категорія з такою назвою вже існує.',
			notFoundID: 'Не вдалось знайти категорію з таким ID.',
			notFoundName: 'Не вдалось знайти категорію з такою назвою.',
			created: 'Категорію було успішно створено.',
			createdError: 'Сталась помилка при спробі створити категорію',
			deleted: 'Категорію було успішно видалено.',
			deletedError: 'Сталась помилка при спробі видалити категорію.',
			empty: 'Не вдалось знайти категорій на цьому сервері.',
			list: 'НАЗВА | КАТЕГОРІЯ',
			help: 'Виберіть `create`, `delete` або `list`.'
		},
		blacklist: {
			noOption: 'Ви повинні надати опцію (`add` або `remove`)',
			noUser: 'Ви повинні @згадати учасника або надати його ID',
            notFound: 'Не вдалось знайти учасника з таким ID.',
			alreadyBlacklisted: 'Цей учасник вже заблокований.',
			notBlacklisted: 'Цей учасник не заблокований.',
			blacklisted: 'Цього учасника було успішно заблоковано.',
			unblacklisted: 'Цього учасника було успішно розблоковано.',
			error: 'Сталась помилка при спробі оновити список заблокованих.'
		},
		alias: {
			noOption: 'Ви повинні надати опцію (`add` або `remove`)',
			noName: 'Ви повинні надати назву скорочення.',
			reservedAlias: 'Це скорочення вже використовується.',
			noCommand: 'Ви повинні надати назву команди щоб створити її скорочення.',
			invalidCommand: 'Такої команди не існує.',
			alreadyExists: 'Скорочення з такою назвою вже існує.',
			created: 'Скорочення було успішно створено.',
			createdError: 'Сталась помилка при спробі створити скорочення.',
			unknownAlias: 'Не вдалось знайти скорочення з такою назвою.',
			deleted: 'Скорочення було успішно вилучено.',
			deletedError: 'Сталась помилка при спробі вилучити скорочення.',
		},
		permission: {
			noLevel: 'Будь ласка, виберіть рівень або назву команди:\nРівні **regular**, **support** та **admin**.\nВикористання: %ppermission {levelName/commandName} {add/remove} {ID участника або ID ролі}',
            noOption: 'Ви повинні надати опцію (`add` або `remove`)',
			noID: 'Ви повинні надати ID ролі або учасника.',
			alreadyExists: 'Ця роль або користувач вже має цей права.',
			notExists: 'Ця роль або учасник не має цих прав.',
			added: 'Право було успішно оновлено.',
			addedError: 'Сталась помилка при спробі оновити права.',
			removed: 'Право було успішно вилучено.',
			removedError: 'Сталась помилка при спробі вилучити права.',
			unknownCommand: 'Не вдалось знайти команду з такою назвою.',
		},
		set: {
			title: 'Налаштування які можна змінити.',
			description: `
			\`avatar\`: надайте зображення щоб змінити аватар бота.
			\`username\`: змінити користувацьке ім'я бота (не серверний нікнейм).
			\`prefix\`: змінити префікс команд (макс. довжина: 4).
			\`category\`: send the ID of the category where you want new threads to open.
			\`logs\`: надайте ID каналу де Ви бажаєте щоб відправлялись повідомлення логів.
			\`status\`: смінити статус бота.
			\`status_type\`: змінити тип статусу бота.
			\`notification\`: надайте ID ролі яка буде згадуватись при створенні нової теми.
			\`account_age\`: час від моменту створення акаунту, необхідний для створення нової теми.
			\`guild_age\`: час від моменту приєднання до серверу, необхідний для створення нової теми.
			\`guild_age_id\`: ID серверу на якому потрібно мати вказаний **guild_age**.
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
			description: 'The thread from `%u` has been closed by %s',
		},
		staffReply: 'Staff Reply',
		user: 'User',
		pastThreads: 'Past Threads'
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