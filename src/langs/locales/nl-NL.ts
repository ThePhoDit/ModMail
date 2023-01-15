import lang from '../lang';

export default {
	name: 'Dutch (Nederlands)',

	messages: {
		setupCompleted: 'Server volledig ingesteld. Er is een ModMail-categorie voor je aangemaakt.',
		messageSoon: 'Je krijgt binnenkort bericht.'
	},

	commands: {
		unsubscribe: {
			success: 'Je bent gedeabonneerd uit deze thread.',
			notSubscribed: 'Je bent niet geabonneerd op deze thread.',
			error: 'Er is een fout opgetreden bij het afmelden van deze thread.',
		},
		title: {
			success: 'De titel is bijgewerkt.',
			error: 'De titel kon niet worden bijgewerkt.',
			noTitle: 'Geef een titel of schrijf `removetitle` om de titel te verwijderen.'
		},
		subscribe: {
			success: 'Je ontvangt nu meldingen over nieuwe reacties.',
			alreadySubscribed: 'Je bent al geabonneerd op deze thread.',
			error: 'Er was een fout bij het inschrijven op deze thread.',
		},
		snippet: {
			invalidName: 'Je moet een snippet-naam opgeven.',
			invalidText: 'Je moet een geldige snippet-tekst opgeven.',
			takenName: 'Deze snippet-naam is al bezet.',
			success: 'Het snippet `%s` is succesvol aangemaakt.',
			error: 'Er is een fout opgetreden bij het maken van de snippet-naam.',
			unknownSnippet: 'Ik kon geen snippet vinden met die naam.',
			updated: 'Het snippet `%s` is succesvol bijgewerkt.',
			deleted: 'Het snippet `%s` is succesvol verwijderd.',
			cantDelete: 'Ik kon de snippet `%s` niet verwijderen.',
			empty: 'Er zijn geen snippets in deze server.',
			list: 'NAME | CONTENT',
			help: 'Selecteer `create`, `edit`, `delete` of `list`.'
		},
		reply: {
			noReply: 'Je moet een antwoordbericht geven.'
		},
		rename: {
			noName: 'Je moet een nieuwe naam geven aan deze thread.',
			success: 'Het snippet is hernoemd naar `%s`.',
			error: 'Er was een fout bij het hernoemen van de thread.'
		},
		ping: 'Mijn ping is `%sms`.',
		nsfw: {
			enabled: 'Deze thread is nu gemarkeerd als NSFW.',
			disabled: 'Deze thread is niet langer gemarkeerd als NSFW.',
			enableError: 'Er was een fout bij het markeren van deze thread als NSFW.',
			disableError: 'Er was een fout bij het verwijderen van de NSFW markering van deze thread.'
		},
		note: {
			noNote: 'Geef een notitie of schrijf `removenote` om de notitie te verwijderen.',
			success: 'De nota is bijgewerkt.',
			error: 'De nota kon niet worden bijgewerkt.'
		},
		move: {
			noCategory: 'Je moet een categorienaam opgeven.',
			notFound: 'Ik kon geen categorie vinden met die naam.',
			alreadyInCategory: 'Deze thread valt al in die categorie.',
			noPermission: 'Ik heb geen toestemming om deze thread naar die categorie te verplaatsen.',
			success: 'De thread is verplaatst naar `%s`.',
			error: 'Er was een fout bij het verplaatsen van de thread.'
		},
		help: {
			title: 'ModMail by ThePhoDit',
			description: 'ModMail is een Discord bot waarmee je met je gebruikers kunt communiceren via DM\'s. Als je de commando\'s van de bot wilt bekijken, lees dan onze docs op https://modmail.phodit.xyz.',
		},
		edit: {
			noMessage: 'Je moet een bericht-ID opgeven.',
			noContent: 'Je moet het bericht een nieuwe inhoud geven.',
			notFound: 'Ik kon geen bericht vinden met die ID.',
			success: 'Het bericht is succesvol bewerkt.',
			error: 'Er was een fout bij het bewerken van het bericht.'
		},
		delete: {
			noMessage: 'Je moet een bericht-ID opgeven.',
			notFound: 'Ik kon geen bericht vinden met die ID.',
			success: 'Het bericht is succesvol verwijderd.',
			error: 'Er was een fout bij het verwijderen van het bericht.'
		},
		contact: {
			noUser: 'Je moet een gebruikersnaam of ID opgeven.',
			notFound: 'Ik kon geen gebruiker vinden met dat ID.',
			isBot: 'Je kunt geen contact opnemen met een bot.',
			channelError: 'Er is een fout opgetreden bij het aanmaken van het kanaal.',
			DMError: 'Er was een fout bij het verzenden van de DM.',
			alreadyContacted: 'Je hebt al een thread met die gebruiker.',
			success: 'De thread is succesvol aangemaakt.',
			message: 'Hallo %s, dit is een ModMail thread aangemaakt door %m. Je kunt op dit bericht reageren om een bericht naar de server staff te sturen.',
			error: 'Er was een fout bij het aanmaken van de thread.'
		},
		close: {
			invalidTime: 'Je moet een geldige tijd opgeven (tussen 10 minuten en 3 dagen).',
			closerError: 'Er was een fout bij het plannen van de thread sluiter.',
			closerUpdateError: 'Er was een fout bij het updaten van de thread sluiter.',
			title: 'Sluiting gepland',
			description: 'Deze thread wordt gesloten op `%s` als er geen nieuwe antwoorden komen.'
		},
		category: {
			noCategory: 'Je U moet een categorienaam opgeven.',
			exists: 'Er bestaat al een categorie met die naam.',
			notFoundID: 'Ik kon geen categorie vinden met die ID.',
			notFoundName: 'Ik kon geen categorie vinden met die naam.',
			created: 'De categorie is succesvol aangemaakt.',
			createdError: 'Er is een fout opgetreden bij het aanmaken van de categorie.',
			deleted: 'De categorie is succesvol verwijderd.',
			deletedError: 'Er was een fout bij het verwijderen van de categorie.',
			empty: 'Ik kon geen categorieën vinden in deze server.',
			list: 'NAME | CATEGORY',
			help: 'Selecteer `create`, `delete` of `list`.'
		},
		blacklist: {
			noOption: 'Je moet een optie opgeven (`add` of `remove`).',
			noUser: 'Je moet een gebruikersnaam of ID opgeven.',
			notFound: 'Ik kon geen gebruiker vinden met dat ID.',
			alreadyBlacklisted: 'Die gebruiker staat al op de zwarte lijst.',
			notBlacklisted: 'Die gebruiker staat niet op de zwarte lijst.',
			blacklisted: 'De gebruiker is met succes op de zwarte lijst geplaatst.',
			unblacklisted: 'De gebruiker is succesvol van de zwarte lijst gehaald.',
			error: 'Er is een fout opgetreden bij het bijwerken van de zwarte lijst.'
		},
		alias: {
			noOption: 'Je moet een optie opgeven (`toevoegen` of `verwijderen`).',
			noName: 'Je moet een aliasnaam opgeven.',
			reservedAlias: 'Die aliasnaam is gereserveerd.',
			noCommand: 'Je moet een commandonaam opgeven die moet worden gealiased.',
			invalidCommand: 'Dat commando bestaat niet.',
			alreadyExists: 'Er bestaat al een alias met die naam.',
			created: 'De alias is succesvol aangemaakt.',
			createdError: 'Er is een fout opgetreden bij het aanmaken van de alias.',
			unknownAlias: 'Ik kon geen alias vinden met die naam.',
			deleted: 'De alias is succesvol verwijderd.',
			deletedError: 'Er is een fout opgetreden bij het verwijderen van de alias.',
		},
		permission: {
			noLevel: "Selecteer het level o commando naam.\nLevels: **regular**, **support** en **admin**.\nGebruik: %ppermission {levelName/commandName} {add/remove} {rol-ID/gebruikers-ID}",
			noOption: "Je moet een optie opgeven (`add` of `remove`).",
			noID: "Je moet een rol- of gebruikers-ID opgeven.",
			alreadyExists: "Die rol of gebruiker heeft dat toestemmingsniveau al.",
			notExists: "Die rol of gebruiker heeft dat toestemmingsniveau niet.",
			added: "De toestemming is succesvol toegevoegd.",
			addedError: "Er is een fout opgetreden bij het toevoegen van de permissie.",
			removed: "De permissie is succesvol verwijderd.",
			removedError: "Er is een fout opgetreden bij het verwijderen van de permissie.",
			unknownCommand: 'Ik kon geen commando met die naam vinden',
		},
		set: {
			title: 'Instellingen die je kunt veranderen van de bot.',
			description: `
			\`avatar\`: een afbeelding toevoegen om de bot avatar te veranderen.
			\`username\`: verander de gebruikersnaam van de bot, niet de bijnaam.
			\`prefix\`: verander de bot prefix (max lengte: 4).
			\`category\`: stuur de ID van de categorie waarin je nieuwe threads wilt openen.
			\`logs\`: stuur de ID van het kanaal waar je je logs heen wilt sturen.
			\`status\`: de weergegeven status van je bot veranderen.
			\`status_type\`: het weergegeven statustype van uw bot wijzigen.
			\`notification\`: stuur de rol-ID die je wilt vermelden bij het aanmaken van een thread.
			\`account_age\`: de leeftijd die een account moet hebben om een nieuwe thread te openen.
			\`guild_age\`: de tijd die een account in de server moet zijn geweest om een nieuwe thread te openen.
			\`guild_age_id\`: de server ID waar iemand de vereiste **guild_age** moet hebben.
			\`exclude_internal_logs\`: stopt het loggen van alle interne berichten. Het kan true of false zijn.
			\`embed_creation_title\`: de titel van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt geopend.
			\`embed_creation_thumbnail\`: de thumbnail van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt geopend ("none" om uit te schakelen).
			\`embed_creation_description\`: de beschrijving van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt geopend.
			\`embed_creation_color\`: de kleur (hexcode) van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt geopend.
			\`embed_creation_footer_text\`: de footer-tekst van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt geopend.
			\`embed_creation_footer_image\`: de footer-afbeelding van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt geopend.
			\`embed_contact_title\`: de titel van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt aangemaakt door een personeelslid.
			\`embed_contact_thumbnail\`: de thumbnail van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt aangemaakt door een personeelslid ("none" om uit te schakelen).
			\`embed_contact_description\`: de beschrijving van de embed die naar de gebruiker wordt gestuurd wanneer de draad wordt aangemaakt door een personeelslid.
			\`embed_contact_color\`: de kleur (hexcode) van de embed die naar de gebruiker wordt gestuurd wanneer de draad wordt aangemaakt door een personeelslid.
			\`embed_contact_footer_text\`: de footer-text van de embed die naar de gebruiker wordt gestuurd wanneer de draad wordt aangemaakt door een personeelslid.
			\`embed_contact_footer_image\`: de footer-afbeelding van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt aangemaakt door een personeelslid.
			\`embed_reply_color\`: de kleur (hexcode) van de embed die naar het personeel wordt gestuurd wanneer een personeelslid de gebruiker antwoordt.
			\`embed_userReply_color\`: de kleur (hexcode) van de embed die naar de gebruiker wordt gestuurd wanneer een personeelslid de gebruiker antwoordt.
			\`embed_userReply_footer_text\`: de footer-text van de embed die naar de gebruiker wordt gestuurd wanneer een personeelslid de gebruiker antwoordt (de rol van het personeelslid wordt vervangen door zijn hoogste rol).
			\`embed_userReply_footer_image\`: de footer-afbeelding van de embed die naar de gebruiker wordt gestuurd wanneer een personeelslid de gebruiker antwoordt.
			\`embed_closure_title\`: de titel van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt gesloten.
			\`embed_closure_thumbnail\`: de thumbnail van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt gesloten ("none" om uit te schakelen).
			\`embed_closure_description\`: de beschrijving van de insluiting die naar de gebruiker wordt gestuurd wanneer de thread wordt gesloten.
			\`embed_closure_color\`: de kleur (hexcode) van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt gesloten.
			\`embed_closure_footer_text\`: de voettekst van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt gesloten.
			\`embed_closure_footer_image\`: de voetafbeelding van de embed die naar de gebruiker wordt gestuurd wanneer de thread wordt gesloten.
			\`embed_staff_title\`: de titel van de embed die naar het personeel wordt gestuurd wanneer de thread wordt geopend.
			\`embed_staff_color\`: de kleur (hexcode) van de embed die naar het personeel wordt gestuurd wanneer de thread wordt geopend.`,
			usage: {
				title: 'Gebruik',
				description: '%pset {setting} {value}',
			},
			noValue: 'Je moet een waarde opgeven.',
			noImage: 'Je moet een afbeelding bijvoegen.',
			avatar: {
				error: 'Er was een fout bij het veranderen van de bot avatar.',
				success: 'De bot avatar is succesvol veranderd.',
			},
			unknownError: 'Er was een fout bij het veranderen van de botinstellingen.',
			usernameSuccess: 'De gebruikersnaam van de bot is succesvol gewijzigd.',
			prefix: {
				success: 'De bot prefix is succesvol gewijzigd.',
				error: 'De bot prefix moet tussen 1 en 4 tekens zijn.',
				unknownError: 'Er was een fout bij het veranderen van de bot prefix.',
			},
			category: {
				success: 'De botcategorie is succesvol gewijzigd.',
				error: 'De botcategorie moet een geldige categorie-ID zijn.',
				unknownError: 'Er was een fout bij het veranderen van de bot categorie.',
			},
			logs: {
				success: 'Het logs-kanaal van de bot is succesvol gewijzigd.',
				error: 'Het logs-kanaal moet een geldig kanaal-ID zijn.',
				unknownError: 'Er was een fout bij het veranderen van het logs-kanaal van de bot.',
			},
			status: {
				success: 'De botstatus is succesvol gewijzigd.',
				unknownError: 'Er was een fout bij het veranderen van de botstatus.',
			},
			statusType: {
				success: 'Het botstatustype is succesvol gewijzigd.',
				unknownError: 'Er is een fout opgetreden bij het veranderen van de status van de bot.',
				invalidTwitch: 'De URL moet een geldige Twitch of YouTube URL zijn.',
				help: 'Het statustype moet een van de volgende zijn: `playing`, `streaming`, `listening`, `watching`.',
			},
			accountAge: {
				invalidFormat: 'U moet een geldig formaat kiezen. Bijvoorbeeld, 1d = 1 dag / 30m = 30 minuten. Om het uit te schakelen, typ je gewoon `0`.\nValide letters: m / h / d / w / y'.,
				success: 'De leeftijdsbeperking is succesvol gewijzigd.',
				unknownError: 'Er was een fout bij het veranderen van de leeftijdsbeperking',
			},
			guildAge: {
				invalidGuild: 'Ik zit niet in die server, kies er een waar ik wel in zit.',
				success: 'De gilde leeftijd ID is succesvol gewijzigd.',
				unknownError: 'Er was een fout bij het veranderen van de gilde leeftijd ID.',
			},
			notification: {
				success: 'De meldingsrol is succesvol gewijzigd.',
				unknownError: 'Er is een fout opgetreden bij het wijzigen van de meldingsrol.',
			},
			excludeInternalLogs: {
				isExcluded: 'De interne logboeken worden nu uitgesloten',
				isIncluded: 'De interne logboeken worden nu opgenomen',
				unknownError: 'Er was een fout bij het veranderen van de interne logboek uitsluiting.',
			},
			embedCreation: {
				success: (iin) => `De embed creatie ${iin} is succesvol gewijzigd.`,
				unknownError: (iin) => `Er is een fout opgetreden bij het veranderen van de embed creatie ${iin}.`,
			},
			embedContact: {
				success: (iin) => `Het embed contact ${iin} is succesvol gewijzigd.`,
				unknownError: (iin) => `Er is een fout opgetreden bij het veranderen van het embed contact ${iin}.`,
			},
			embedReply: {
				success: (iin) => `Het embed antwoord ${iin} is succesvol gewijzigd.`,
				unknownError: (iin) => `Er is een fout opgetreden bij het wijzigen van het embed antwoord ${iin}.`,
			},
			embedUserReply: {
				success: (iin) => `Het embed user reply ${iin} is succesvol gewijzigd.`,
				unknownError: (iin) => `Er is een fout opgetreden bij het wijzigen van het embed user reply ${iin}.`,
			},
			embedClosure: {
				success: (iin) => `De embed closure ${iin} is succesvol gewijzigd.`,
				unknownError: (iin) => `Er is een fout opgetreden bij het veranderen van de embed closure ${iin}.`,
			},
			embedStaff: {
				success: (iin) => `Het embed personeel ${iin} is succesvol gewijzigd.`,
				unknownError: (iin) => `Er is een fout opgetreden bij het veranderen van het embed personeel ${iin}.`,
			},
		}
	},

	embeds: {
		noContent: 'Geen inhoud voorzien.',
		files: 'Bestanden',
		containsFiles: 'Dit bericht bevat %n bestand%s',
		closureCancelled: {
			title: 'Sluiting geannuleerd.',
			description: 'Dit ticket wordt niet langer gesloten wegens ticketactiviteit.',
		},
		threadClosed: {
			title: 'Thread gesloten.',
			description: 'De thread van `%u` is gesloten door %s',
		},
		staffReply: 'Personeel Antwoord',
		user: 'Gebruiker',
		pastThreads: 'Oude threads'
	},

	errors: {
		categoryCreate: 'Er kon geen categorie worden aangemaakt. Setup geannuleerd.',
		configAdd: 'De configuratie kon niet worden toegevoegd aan de database. Setup geannuleerd.',
		accountAge: 'Je account is niet oud genoeg om contact op te nemen met het personeel.',
		serverAge: 'Je account is nog niet lang genoeg in de server om contact op te nemen met het personeel.',
		unknown: 'Er is een onbekende fout opgetreden. Probeer het later nog eens.',
		contactStaff: 'Kon je bericht niet naar het personeel sturen.',
		invalidPermissions: 'Je hebt niet de vereiste rechten om dit commando te gebruiken.',
		snippet: 'Er is een fout opgetreden bij het ophalen van het snippet.',
		noLogsUrl: 'Je hebt geen logboek URL geconfigureerd.',
		noUserIDProvided: 'Je moet een geldig gebruikers-ID opgeven.',
		noLogsFound: 'Ik kon geen logs vinden voor deze gebruiker.',
		invalidHexColor: 'Je moet een geldige hex-kleur opgeven.',
		invalidLink: 'Je moet een geldige link opgeven.',
	}
} as lang;
