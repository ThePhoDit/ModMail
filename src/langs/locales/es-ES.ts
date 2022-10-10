import lang from '../lang';

export default {
	name: 'Español (España)',

	messages: {
		setupCompleted: 'Servidor completamente configurado. Se ha creado una categoría de ModMail para tí.',
		messageSoon: 'Recibirás un mensaje pronto.'
	},

	commands: {
		unsubscribe: {
			success: 'Ya no estás suscrito a este ticket.',
			notSubscribed: 'No estás suscrito a este ticket.',
			error: 'Ha ocurrido un error al dar de baja tu suscripción a este ticket.',
		},
		title: {
			success: 'El título ha sido actualizado.',
			error: 'No ha sido posible actualizar el título.',
			noTitle: 'Añade un título o escribe `removetitle` para eliminar el título.'
		},
		subscribe: {
			success: 'Recibirás notificaciones de las nuevas respuestas.',
			alreadySubscribed: 'Ya estás suscrito a este ticket.',
			error: 'Ha ocurrido un error al suscribirte a este ticket.',
		},
		snippet: {
			invalidName: 'Debes proporcionar un nombre para el snippet.',
			invalidText: 'Debes proporcionar un texto válido para el snippet.',
			takenName: 'Este nombre de snippet ya existe.',
			success: 'El snippet `%s` ha sido creado correctamente.',
			error: 'Ha ocurrido un error al crear el snippet.',
			unknownSnippet: 'No he podido encontrar un snippet con ese nombre.',
			updated: 'El snippet `%s` se ha actualizado correctamente.',
			deleted: 'El snippet `%s` ha sido eliminado correctamente.',
			cantDelete: 'No he podido eliminar el snippet `%s`.',
			empty: 'No hay snippets en este servidor.',
			list: 'NOMBRE | CONTENIDO',
			help: 'Selecciona `create`, `edit`, `delete` o `list`.'
		},
		reply: {
			noReply: 'Debes proporcionar un mensaje de respuesta.'
		},
		rename: {
			noName: 'Debes proporcionar un nuevo nombre para el ticket.',
			success: 'El ticket ha sido renombrado a `%s`.',
			error: 'Ha ocurrido un error al renombrar.'
		},
		ping: 'Mi latencia es de `%sms`.',
		nsfw: {
			enabled: 'Este ticket ha sido marcado como NSFW.',
			disabled: 'Este ticket ya no está marcado como NSFW.',
			enableError: 'Ha ocurrido un error al marcar este ticket como NSFW.',
			disableError: 'Ha ocurrido un error al desmarcar este ticket como NSFW.'
		},
		note: {
			noNote: 'Proporciona una nota o escribe `removenote` para eliminar la nota.',
			success: 'La nota ha sido actualizada.',
			error: 'La nota no ha podido ser actualizada.'
		},
		move: {
			noCategory: 'Debes proporcionar el nombre de una categoría.',
			notFound: 'No he podido encontrar una categoría con ese nombre.',
			alreadyInCategory: 'Este ticket ya está en esa categoría.',
			noPermission: 'No tengo permiso para mover este ticket a esa categoría.',
			success: 'El ticket ha sido movido a `%s`.',
			error: 'Ha ocurrido un error al mover este ticket.'
		},
		help: {
			title: 'ModMail desarrollado por ThePhoDit',
			description: 'ModMail es un bot de Discord te permite communicarte con tus usuarios via MDs.\nSi quieres ver los comandos del bot, lee nuestra documentación en https://modmail.phodit.xyz',
		},
		edit: {
			noMessage: 'Debes proporcionar una ID de mensaje.',
			noContent: 'Debes proporcionar un nuevo contenido para este mensaje.',
			notFound: 'No he encontrado un mensaje con esa ID.',
			success: 'El mensaje ha sido editado correctamente.',
			error: 'Ha ocurrido un error al editar el mensaje.'
		},
		delete: {
			noMessage: 'Debes proporcionar una ID de mensaje.',
			notFound: 'No he encontrado un mensaje con esa ID.',
			success: 'El mensaje ha sido eliminado correctamente.',
			error: 'Ha ocurrido un error al eliminar el mensaje.'
		},
		contact: {
			noUser: 'Debes proporcionar una mención de usuario o una ID.',
			notFound: 'No he encontrado a un usuario con esa ID.',
			isBot: 'No puedes contactar a un bot.',
			channelError: 'Ha ocurrido un error al crear el canal.',
			DMError: 'Ha ocurrido un error al enviar el MD.',
			alreadyContacted: 'Ya tienes un ticket con ese usuario.',
			success: 'El ticket se ha creado correctamente.',
			message: 'Hola %s, esto es un ticket de ModMail creado por %m. Puedes responder a este mensaje para enviar un mensaje al Staff.',
			error: 'Ha ocurrido un error al crear el ticket.'
		},
		close: {
			invalidTime: 'Debes proporcionar un tiempo válido (Entre 10 minutos y 3 días).',
			closerError: 'Ha ocurrido un error al programar el cierre del ticket.',
			closerUpdateError: 'Ha ocurrido un error al actualizar el cierre programado del ticket.',
			title: 'Cierre Programado',
			description: 'Este ticket se cerrará en `%s` si no se envían respuestas.'
		},
		category: {
			noCategory: 'Debes proporcionar el nombre de una categoría.',
			exists: 'Ya existe una categoría con ese nombre.',
			notFoundID: 'No he encontrado una categoría con esa ID.',
			notFoundName: 'No he encontrado una categoría con ese nombre.',
			created: 'La categoría ha sido creada correctamente.',
			createdError: 'Ha ocurrido un error al crear la categoría.',
			deleted: 'La categoría ha sido eliminada correctamente.',
			deletedError: 'Ha ocurrido un error al eliminar la categoría.',
			empty: 'No he encontrado categorías en este servidor.',
			list: 'NOMBRE | CATEGORÍA',
			help: 'Selecciona `create`, `delete` o `list`.'
		},
		blacklist: {
			noOption: 'Debes proporcionar una opción (`add` o `remove`).',
			noUser: 'Debes proporcionar la mención de un usuario o su ID.',
			notFound: 'No he encontrado a un usuario con esa ID.',
			alreadyBlacklisted: 'Ese usuario ya está bloqueado.',
			notBlacklisted: 'Ese usuario no está bloqueado.',
			blacklisted: 'El usuario ha sido bloqueado correctamente.',
			unblacklisted: 'El usuario ha sido desbloqueado correctamente.',
			error: 'Ha ocurrido un error al actualizar la lista de bloqueos.'
		},
		alias: {
			noOption: 'Debes proporcionar una opción (`add` o `remove`).',
			noName: 'Debes proporcionar un nombre de alias.',
			reservedAlias: 'Ese nombre de alias está reservado.',
			noCommand: 'Debes proporcionar un nombre de comando para establecer su alias.',
			invalidCommand: 'Ese comando no existe.',
			alreadyExists: 'Ya existe un alias con ese nombre.',
			created: 'El alias ha sido creado correctamente.',
			createdError: 'Ha ocurrido un error al crear el alias.',
			unknownAlias: 'No he encontrado un alias con ese nombre.',
			deleted: 'El alias ha sido eliminado correctamente.',
			deletedError: 'Ha ocurrido un error al eliminar el alias.',
		},
		permission: {
			noLevel: 'Por favor, selecciona el nivel o nombre del comando.\nNiveles: **regular**, **support** y **admin**.\nUso: %ppermission {levelName/commandName} {add/remove} {ID del rol/ID del usuario}',
			noOption: 'Debes poporcionar una opción (`add` o `remove`).',
			noID: 'Debes proporcionar una ID de rol o usuario.',
			alreadyExists: 'Ese rol o usuario ya tiene ese nivel de permisos.',
			notExists: 'Ese rol o usuario no tiene ese nivel de permisos.',
			added: 'El permiso ha sido añadido correctamente.',
			addedError: 'Ha ocurrido un error al añadir el permiso.',
			removed: 'El permiso ha sido eliminado correctamente.',
			removedError: 'Ha ocurrido un error al eliminar el permiso.',
			unknownCommand: 'No he encontrado un comando con ese nombre.',
		},
		set: {
			title: 'Configuraciones que puedes cambiar en el bot.',
			description: `
			\`avatar\`: añade una imagen para cambiar el avatar del bot.
			\`username\`: cambia el nombre del bot, no el apodo del servidor.
			\`prefix\`: cambia el prefijo del bot (máximo 4 caracteres).
			\`category\`: manda la ID de la categoría en la que quieres que los nuevos tickets se abran.
			\`logs\`: manda la ID del canal en el que quieres que se envíen los logs.
			\`status\`: cambia el estado del bot.
			\`status_type\`: cambia el tipo de estado del bot.
			\`notification\`: envía la ID del rol que quieres que mencione cuando se cree un nuevo ticket.
			\`account_age\`: el tiempo que debe llevar una cuenta registrada en Discord para poder abrir un ticket.
			\`guild_age\`: el tiempo que debe llevar un usuario en el servidor para abrir un ticket.
			\`guild_age_id\`: la ID del servidor en la que alguien debe tener el **tiempo mínimo registrado**.
			\`exclude_internal_logs\`: para de registrar todos los mensajes internos. Puede ser true o false.
			\`embed_creation_title\`: el título del embed enviado al usuario cuando un ticket es creado.
			\`embed_creation_thumbnail\`: la imagen del embed enviado al usuario cuando un ticket es creado ("none" para desactivar).
			\`embed_creation_description\`: la descripción del embed enviado al usuario cuando un ticket es creado.
			\`embed_creation_color\`: el color (en hex) del embed enviado al usuario cuando un ticket es creado.
			\`embed_creation_footer_text\`: el footer del embed enviado al usuario cuando un ticket es creado.
			\`embed_creation_footer_image\`: la imagen del footer del embed enviado al usuario cuando un ticket es creado.
			\`embed_contact_title\`: el título del embed enviado al usuario cuando el ticket es creado por un miembro del staff.
			\`embed_contact_thumbnail\`: la imagen del embed enviado al usuario cuando el ticket es creado por un miembro del staff ("none" para desactivar).
			\`embed_contact_description\`: la descripción del embed enviado al usuario cuando el ticket es creado por un miembro del staff.
			\`embed_contact_color\`: el color (en hex) del embed enviado al usuario cuando el ticket es creado por un miembro del staff.
			\`embed_contact_footer_text\`: el footer del embed enviado al usuario cuando el ticket es creado por un miembro del staff.
			\`embed_contact_footer_image\`: la imagen del footer del embed enviado al usuario cuando el tickete es creado por un miembro del staff.
			\`embed_reply_color\`: el color (en hex) del embed enviado al staff cuando un miembro delstaff responde al usuario.
			\`embed_userReply_color\`: el color (en hex) del embed enviado al usuario cuando un miembro del staff responde al usuario.
			\`embed_userReply_footer_text\`: el footer del embed enviado al usuario cuando un miembro del staff responde al usuario (\`$role$\` será reemplazado por el rol más alto del staff).
			\`embed_userReply_footer_image\`: la imagen del footer del embed enviado al usuario cuando un miembro del staff responde al usuario.
			\`embed_closure_title\`: el título del embed enviado al usuario cuando el ticket se cierre.
			\`embed_closure_thumbnail\`: la imagen del embed enviada al usuario cuando el ticket se cierre ("none" para desactivar).
			\`embed_closure_description\`: la descripción del embed enviado al usuario cuando el ticket se cierre.
			\`embed_closure_color\`: el color (en hex) del embed enviado al usuario cuando el ticket se cierre.
			\`embed_closure_footer_text\`: el footer del embed enviado al usuario cuando el ticket se cierre.
			\`embed_closure_footer_image\`: la imagen del footer del embed enviado al usuario cuando el ticket se cierre.
			\`embed_staff_title\`: el título del embed enviado al staff cuando se cree un ticket.
			\`embed_staff_color\`: el color (en hex) del embed enviado al staff cuando se cree un ticket.`,
			usage: {
				title: 'Uso',
				description: '%pset {configuración} {valor}',
			},
			noValue: 'Debes proporcionar un valor.',
			noImage: 'Debes adjuntar una imagen.',
			avatar: {
				error: 'Ha ocurrido un error al cambiar el avatar del bot.',
				success: 'El avatar del bot ha sido cambiado correctamente.',
			},
			unknownError: 'Ha ocurrido un error al cambiar la configuración del bot.',
			usernameSuccess: 'El nombre de usuario del bot ha sido actualizado correctamente.',
			prefix: {
				success: 'El prefijo del bot ha sido actualizado correctamente.',
				error: 'El prefijo del bot debe tener entre 1 y 4 caracteres.',
				unknownError: 'Ha ocurrido un error al actualizar el prefijo del bot.',
			},
			category: {
				success: 'La categoría del bot ha sido actualizada correctamente.',
				error: 'La categoría del bot debe ser una ID de categoría válida.',
				unknownError: 'Ha ocurrido un error al actualizar la categoría del bot.',
			},
			logs: {
				success: 'El canal de logs del bot ha sido actualizado correctamente.',
				error: 'El canal de logs del bot debe ser una ID de canal válida.',
				unknownError: 'Ha ocurrido un error al actualizar el canal de logs del bot.',
			},
			status: {
				success: 'El estado del bot ha sido actualizado correctamente.',
				unknownError: 'Ha ocurrido un error al actualizar el estado del bot.',
			},
			statusType: {
				success: 'El tipo de estado del bot ha sido actualizado correctamente.',
				unknownError: 'Ha ocurrido un error al cambiar el tipo de estado del bot.',
				invalidTwitch: 'La URL debe ser una URL válida de Twitch o YouTube.',
				help: 'El tipo de estado debe ser uno de los siguientes: `playing`, `streaming`, `listening`, `watching`.',  // en un futuro añadir `custom` (type: 4)
			},
			accountAge: {
				invalidFormat: 'Debes establecer un formato válido. Por ejemplo: 1d = 1 día / 30m = 30 minutos. Para desactivarlo, escribe `0`.\nLetras válidas: m / h / d / w / y',
				success: 'La restricción de tiempo mínimo registrado en Discord ha sido actualizada correctamente.',
				unknownError: 'Ha ocurrido un error al actualizar la restricción de tiempo mínimo registrado en Discord.',
			},
			guildAge: {
				invalidGuild: 'No estoy en ese servidor, por favor selecciona uno en el que yo esté.',
				success: 'La ID de servidor con restricción de tiempo mínimo registrado en Discord ha sido actualizada correctamente.',
				unknownError: 'Ha ocurrido un error al actualizar el servidor con restricción de tiempo mínimo registrado en Discord.',
			},
			notification: {
				success: 'Eñ rol de notificaciones ha sido actualizado correctamente.',
				unknownError: 'Ha ocurrido un error al actualizar el rol de notificaciones.',
			},
			excludeInternalLogs: {
				isExcluded: 'Los logs internos ahora serán excluídos',
				isIncluded: 'Los logs internos ahora serán incluídos',
				unknownError: 'Ha ocurrido un error al actualizar la exclusión de los logs internos.',
			},
			embedCreation: {
				success: (iin) => `La creación del embed ${iin} ha sido actualizada correctamente.`,
				unknownError: (iin) => `Ha ocurrido un error al actualizar la creación del embed ${iin}.`,
			},
			embedContact: {
				success: (iin) => `El embed de contacto ${iin} ha sido actualizado correctamente.`,
				unknownError: (iin) => `Ha ocurrido un error al actualizar el embed de contacto ${iin}.`,
			},
			embedReply: {
				success: (iin) => `El embed de respuesta ${iin} ha sido actualizado correctamente.`,
				unknownError: (iin) => `Ha ocurrido un error al actualizar el embed de respuesta ${iin}.`,
			},
			embedUserReply: {
				success: (iin) => `El embed de respuesta de usuario ${iin} ha sido actualizado correctamente.`,
				unknownError: (iin) => `Ha ocurrido un error al actualizar el embed de respuesta de usuario ${iin}.`,
			},
			embedClosure: {
				success: (iin) => `El embed cierre ${iin} ha sido actualizado correctamente.`,
				unknownError: (iin) => `Ha ocurrido un error al actualizar el embed de cierre ${iin}.`,
			},
			embedStaff: {
				success: (iin) => `El embed de staff ${iin} ha sido actualizado correctamente.`,
				unknownError: (iin) => `Ha ocurrido un error al actualizar el embed de staff ${iin}.`,
			},
		}
	},

	embeds: {
		noContent: 'No se ha proporcionado un contenido.',
		files: 'Archivos',
		containsFiles: 'Este mensaje contiene %n archivo%s',
		closureCancelled: {
			title: 'Cierre cancelado.',
			description: 'Este ticket will no será cerrado debido a la actividad del ticket.',
		},
		threadClosed: {
			title: 'Ticket cerrado.',
			description: 'El ticket de `%u` ha sido cerrado por %s',
		},
		staffReply: 'Respuesta del Staff',
		user: 'Usuario',
		pastThreads: 'Tickets Pasados'
	},

	errors: {
		categoryCreate: 'No se ha podido crear la categoría. Setup cancelado.',
		configAdd: 'La configuración no ha podido ser añadida al a base de datos. Setup cancelado.',
		accountAge: 'Tu cuenta no es suficientemente antigua como para contactar con el staff.',
		serverAge: 'Tu cuenta no ha estado en el servidor el tiempo suficiente como para contactar con el staff.',
		unknown: 'Ha ocurrido un error desconocido. Por favor, inténtalo de nuevo más tarde.',
		contactStaff: 'No se ha podido enviar tu mensaje al staff.',
		invalidPermissions: 'No tienes suficientes permisos para ejecutar este comando.',
		snippet: 'Ha ocurrido un error al intentar conseguir el snippet.',
		noLogsUrl: 'No tienes una URL de logs establecida.',
		noUserIDProvided: 'Debes proporcionar una ID de usuario válida.',
		noLogsFound: 'No he podido encontrar logs de este usuario.',
		invalidHexColor: 'Debes proporcionar un color válido en Hex.',
		invalidLink: 'Debes proporcionar un enlace válido.',
	}
} as lang;