import lang from '../lang';

export default {
	name: 'Português (Brasil)',

	messages: {
		setupCompleted: 'Servidor configurado. Uma categoria Modmail foi criada para você.',
		messageSoon: 'Você receberá uma mensagem em breve.'
	},

	commands: {
		unsubscribe: {
			success: 'Você foi desinscrito dessa thread.',
			notSubscribed: 'Você não está inscreto nesta thread.',
			error: 'Ocorreu um erro ao desinscrever você desta thread.',
		},
		title: {
			success: 'O título foi atualizado.',
			error: 'O título não pode ser atualizado.',
			noTitle: 'Forneça um título ou escreva `removetitle` para remover o título.'
		},
		subscribe: {
			success: 'Agora você receberá notificações sobre novas respostas.',
			alreadySubscribed: 'Você já está inscrito nesta thread.',
			error: 'Ocorreu um erro ao inscrevê-lo nesta thread.',
		},
		snippet: {
			invalidName: 'Você deve fornecer um nome de snippet.',
			invalidText: 'Você deve fornecer um texto de snippet válido.',
			takenName: 'Este nome de snippet já foi usado.',
			success: 'O snippet `%s` foi criado com sucesso.',
			error: 'Ocorreu um erro ao criar o snippet.',
			unknownSnippet: 'Não consegui encontrar um snipet com esse nome.',
			updated: 'O snippet `%s` foi atualizado com sucesso.',
			deleted: 'O snippet `%s` foi deletado com sucesso.',
			cantDelete: 'Não consegui deletar o snippet `%s`.',
			empty: 'Não há snippets neste servidor.',
			list: 'NOME | CONTEÚDO',
			help: 'Selecione `create`, `edit`, `delete` or `list`.'
		},
		reply: {
			noReply: 'Você deve fornecer uma mensagem de resposta.'
		},
		rename: {
			noName: 'Você deve fornecer um novo nome para a thread.',
			success: 'A thread foi renomeado para `%s`.',
			error: 'Ocorreu um erro ao renomear a thread.'
		},
		ping: 'Meu ping é `%sms`.',
		nsfw: {
			enabled: 'Esta thread agora está marcada como NSFW.',
			disabled: 'Esta thread não está mais marcado como NSFW.',
			enableError: 'Ocorreu um erro ao marcar esta thread como NSFW.',
			disableError: 'Ocorreu um erro ao desmarcar esta thread como NSFW.'
		},
		note: {
			noNote: 'Forneça uma nota ou escreva `removenote` para remover a nota.',
			success: 'A nota foi atualizada.',
			error: 'A nota não pôde ser atualizada.'
		},
		move: {
			noCategory: 'Você deve fornecer um nome de categoria.',
			notFound: 'Não consegui encontrar uma categoria com esse nome.',
			alreadyInCategory: 'Esta thread já está nessa categoria.',
			noPermission: 'Não tenho permissão para mover esta thread para essa categoria.',
			success: 'A thread foi movido para `%s`.',
			error: 'Ocorreu um erro ao mover a thread.'
		},
		help: {
			title: 'ModMail by ThePhoDit',
			description: 'ModMail é um bot no Discord que permite que você se comunique com seus usuários via DMs.\nSe você quiser conferir os comandos do bot, leia nossos documentos em https://modmail.phodit.xyz',
		},
		edit: {
			noMessage: 'Você deve fornecer um ID de mensagem.',
			noContent: 'Você deve fornecer um novo conteúdo para a mensagem.',
			notFound: 'Não consegui encontrar uma mensagem com esse ID.',
			success: 'A mensagem foi editada com sucesso.',
			error: 'Ocorreu um erro ao editar a mensagem.'
		},
		delete: {
			noMessage: 'Você deve fornecer um ID de mensagem.',
			notFound: 'Não consegui encontrar uma mensagem com esse ID.',
			success: 'A mensagem foi apagada com sucesso.',
			error: 'Ocorreu um erro ao excluir a mensagem.'
		},
		contact: {
			noUser: 'Você deve fornecer um ID ou mencionar um usuário.',
			notFound: 'Não consegui encontrar um usuário com esse ID.',
			isBot: 'Você não pode entrar em contato com um bot.',
			channelError: 'Ocorreu um erro ao criar o canal.',
			DMError: 'Ocorreu um erro ao enviar a DM.',
			alreadyContacted: 'Você já tem uma thread com esse usuário.',
			success: 'A thread foi criado com sucesso.',
			message: 'Olá %s, este é uma thread do ModMail criado por %m. Você pode responder a esta mensagem para enviar uma mensagem para a staff do servidor.',
			error: 'Ocorreu um erro ao criar o tópico.'
		},
		close: {
			invalidTime: 'Você deve fornecer um tempo válido (entre 10 minutos e 3 dias).',
			closerError: 'Ocorreu um erro ao agendar o fechamento da thread',
			closerUpdateError: 'Ocorreu um erro ao atualizar o fechamento thread.',
			title: 'Fechamento agendado',
			description: 'Esta thread será fechada em `%s` se nenhuma nova mensagem for enviada.'
		},
		category: {
			noCategory: 'Você deve fornecer um nome de categoria.',
			exists: 'Já existe uma categoria com esse nome.',
			notFoundID: 'Não consegui encontrar uma categoria com esse ID.',
			notFoundName: 'Não consegui encontrar uma categoria com esse nome.',
			created: 'A categoria foi criada com sucesso.',
			createdError: 'Ocorreu um erro ao criar a categoria.',
			deleted: 'A categoria foi excluída com sucesso.',
			deletedError: 'Ocorreu um erro ao excluir a categoria.',
			empty: 'Não consegui encontrar nenhuma categoria neste servidor.',
			list: 'NOME | CATEGORIA',
			help: 'Selecione `create`, `delete` or `list`.'
		},
		blacklist: {
			noOption: 'Você deve fornecer uma opção (`add` ou `remove`).',
			noUser: 'Você deve fornecer um ID ou mencionar um usuário.',
			notFound: 'Não consegui encontrar um usuário com esse ID.',
			alreadyBlacklisted: 'Esse usuário já está na lista de bloqueio.',
			notBlacklisted: 'Esse usuário não está na lista de bloqueio.',
			blacklisted: 'O usuário foi bloqueado com sucesso.',
			unblacklisted: 'O usuário foi desbloqueado com sucesso.',
			error: 'Ocorreu um erro ao atualizar a lista de bloqueio.'
		},
		alias: {
			noOption: 'Você deve fornecer uma opção (`add` ou `remove`).',
			noName: 'Você deve fornecer um alias.',
			reservedAlias: 'Esse nome de alias está reservado.',
			noCommand: 'Você deve fornecer um nome de comando para ser alias.',
			invalidCommand: 'Esse comando não existe.',
			alreadyExists: 'Já existe um alias com esse nome.',
			created: 'O alias foi criado com sucesso.',
			createdError: 'Ocorreu um erro ao criar o alias.',
			unknownAlias: 'Eu não consegui encontrar um alias com esse nome.',
			deleted: 'O alias foi excluído com sucesso.',
			deletedError: 'Ocorreu um erro ao excluir o alias.',
		},
		permission: {
			noLevel: 'Por favor, selecione o nível ou nome do comando.\nNíveis: **regular**, **support** and **admin**.\nUso: %ppermission {levelName/commandName} {add/remove} {role ID/user ID}',
			noOption: 'Você deve fornecer uma opção (`add` ou `remove`).',
			noID: 'Você deve fornecer um cargo ou ID de usuário.',
			alreadyExists: 'Esse cargo ou usuário já tem esse nível de permissão.',
			notExists: 'Esse cargo ou usuário não tem esse nível de permissão.',
			added: 'A permissão foi adicionada com sucesso.',
			addedError: 'Ocorreu um erro ao adicionar a permissão.',
			removed: 'A permissão foi removida com sucesso.',
			removedError: 'Ocorreu um erro ao remover a permissão.',
			unknownCommand: 'Não consegui encontrar um comando com esse nome.',
		},
		set: {
			title: 'Configurações que você pode alterar do bot.',
			description: `
			\`avatar\`: anexe uma imagem para mudar o avatar do bot.
			\`username\`: altere o nome de usuário do bot, não o apelido.
			\`prefix\`: altere o prefixo do bot (comprimento máximo: 4).
			\`category\`: envie o ID da categoria onde deseja abrir novas threads.
			\`logs\`: envie o ID do canal para onde você quer que seus logs vão.
			\`status\`: altere o status exibido do seu bot.
			\`status_type\`: altere o tipo de status exibido do seu bot.
			\`notification\`: envie o ID do cargo que deseja que seja mencionado na criação da thread.
			\`account_age\`: a idade que uma conta precisa ter para abrir uma nova thread.
			\`guild_age\`: o tempo que uma conta precisa estar dentro do servidor para abrir uma nova thread.
			\`guild_age_id\`: o ID do servidor onde alguém precisa ter a **guild_age** necessária.
			\`exclude_internal_logs\`: parar de registrar todas as mensagens internas. Pode ser verdadeiro ou falso.
			\`embed_creation_title\`: o título do embed enviado ao usuário quando a thread é aberta.
			\`embed_creation_thumbnail\`: a miniatura do embed enviada ao usuário quando a thred é aberta ("none" para desativar).
			\`embed_creation_description\`: a descrição do embed enviada ao usuário quando a thread é aberta.
			\`embed_creation_color\`: a cor (código hexadecimal) do embed enviado ao usuário quando a thread é aberta.
			\`embed_creation_footer_text\`: o rodapé do embed enviado ao usuário quando a thread é aberta.
			\`embed_creation_footer_image\`: a imagem do rodapé do embed enviado ao usuário quando a thread é aberta.
			\`embed_contact_title\`: o título do embed enviado ao usuário quando a thread é criada por um membro da staff.
			\`embed_contact_thumbnail\`: a miniatura do embed enviada ao usuário quando a thread é criada por um membro da staff ("none" para desativar).
			\`embed_contact_description\`: a descrição do embed enviado ao usuário quando a thread é criada por um membro da staff.
			\`embed_contact_color\`: a cor (código hexadecimal) do embed enviado ao usuário quando a thread é criada por um membro da staff.
			\`embed_contact_footer_text\`: o rodapé do embed enviado ao usuário quando a thread é criada por um membro da staff.
			\`embed_contact_footer_image\`: a imagem do rodapé do embed enviado ao usuário quando a thread é criada por um membro da staff.
			\`embed_reply_color\`: a cor (código hexadecimal) do embed enviado para a staff quando um membro da staff responde ao usuário.
			\`embed_userReply_color\`: a cor (código hexadecimal) do embed enviado ao usuário quando um membro da staff responde ao usuário.
			\`embed_userReply_footer_text\`: o rodapé do embed enviado ao usuário quando um membro da staff responde ao usuário (\`$role$\` será substituído pelo cargo mais alto da staff).
			\`embed_userReply_footer_image\`: a imagem do rodapé do embed enviado ao usuário quando um membro da staff responde ao usuário.
			\`embed_closure_title\`: o título do embed enviado ao usuário quando a thread é fechada.
			\`embed_closure_thumbnail\`: a miniatura do embed enviado ao usuário quando a thread é fechada ("none" para desativar).
			\`embed_closure_description\`: a descrição do embed enviado ao usuário quando a thread é fechada.
			\`embed_closure_color\`: a cor (código hexadecimal) do embed enviado ao usuário quando a thread é fechada.
			\`embed_closure_footer_text\`: o rodapé do embed enviado ao usuário quando a thread é fechada.
			\`embed_closure_footer_image\`: a imagem do rodapé do embed enviado ao usuário quando a thread é fechada.
			\`embed_staff_title\`: o título do embed enviado para a staff quando a thread é aberta.
			\`embed_staff_color\`: a cor (código hexadecimal) do embed enviado à staff quando a thread é aberta.`,
			usage: {
				title: 'Uso',
				description: '%pset {setting} {value}',
			},
			noValue: 'Você deve fornecer um valor.',
			noImage: 'Você deve anexar uma imagem.',
			avatar: {
				error: 'Ocorreu um erro ao alterar o avatar do bot.',
				success: 'O avatar do bot foi alterado com sucesso.',
			},
			unknownError: 'Ocorreu um erro ao alterar as configurações do bot.',
			usernameSuccess: 'O nome de usuário do bot foi alterado com sucesso.',
			prefix: {
				success: 'O prefixo do bot foi alterado com sucesso.',
				error: 'O prefixo do bot deve ter entre 1 e 4 caracteres.',
				unknownError: 'Ocorreu um erro ao alterar o prefixo do bot.',
			},
			category: {
				success: 'A categoria do bot foi alterada com sucesso.',
				error: 'A categoria do bot deve ser um ID de categoria válido.',
				unknownError: 'Ocorreu um erro ao alterar a categoria do bot.',
			},
			logs: {
				success: 'O canal de logs do bot foi alterado com sucesso.',
				error: 'O canal de logs de bot deve ser um ID de canal válido.',
				unknownError: 'Ocorreu um erro ao alterar o canal de logs do bot.',
			},
			status: {
				success: 'O status do bot foi alterado com sucesso.',
				unknownError: 'Ocorreu um erro ao alterar o status do bot.',
			},
			statusType: {
				success: 'O tipo de status do bot foi alterado com sucesso.',
				unknownError: 'Ocorreu um erro ao alterar o tipo de status do bot.',
				invalidTwitch: 'O URL deve ser um URL válido do Twitch ou do YouTube.',
				help: 'O tipo de status deve ser um dos seguintes: `playing`, `streaming`, `listening`, `watching`.',
			},
			accountAge: {
				invalidFormat: 'Você deve selecionar um formato válido. Por exemplo, 1d = 1 dia / 30m = 30 minutos. Para desativá-lo, basta digitar `0`.\nLetras válidas: m / h / d / w / y',
				success: 'A restrição de idade da conta foi alterada com sucesso.',
				unknownError: 'Ocorreu um erro ao alterar a restrição de idade da conta.',
			},
			guildAge: {
				invalidGuild: 'Não estou nesse servidor, selecione um em que eu esteja.',
				success: 'O ID de idade do servidor foi alterado com sucesso.',
				unknownError: 'Ocorreu um erro ao alterar o ID de idade do servidor',
			},
			notification: {
				success: 'O cargo de notificação foi alterada com sucesso.',
				unknownError: 'Ocorreu um erro ao alterar o cargo de notificação.',
			},
			excludeInternalLogs: {
				isExcluded: 'Os logs internos agora serão excluídos',
				isIncluded: 'Os logs internos agora serão incluídos',
				unknownError: 'Ocorreu um erro ao alterar a exclusão de registros internos.',
			},
			embedCreation: {
				success: (iin) => `A criação do embed ${iin} foi alterada com sucesso.`,
				unknownError: (iin) => `Ocorreu um erro ao alterar a criação do embed ${iin}.`,
			},
			embedContact: {
				success: (iin) => `O contato do embed ${iin} foi alterada com sucesso.`,
				unknownError: (iin) => `Ocorreu um erro ao alterar o contato do embed ${iin}.`,
			},
			embedReply: {
				success: (iin) => `A resposta do embed ${iin} foi alterada com sucesso.`,
				unknownError: (iin) => `Ocorreu um erro ao alterar a resposta do embed ${iin}.`,
			},
			embedUserReply: {
				success: (iin) => `O embed de reposta do usuário ${iin} foi alterada com sucesso.`,
				unknownError: (iin) => `Ocorreu um erro ao alterar o embed de resposta do usuário ${iin}.`,
			},
			embedClosure: {
				success: (iin) => `O embed fechamento ${iin} foi alterada com sucesso.`,
				unknownError: (iin) => `Ocorreu um erro ao alterar o embed de fechamento ${iin}.`,
			},
			embedStaff: {
				success: (iin) => `O embed da staff ${iin} foi alterada com sucesso.`,
				unknownError: (iin) => `Ocorreu um erro ao alterar o embed da staff ${iin}.`,
			},
		}
	},

	embeds: {
		noContent: 'Nenhum conteúdo fornecido.',
		files: 'Arquivos',
		containsFiles: 'Esta mensagem contém %n arquivo%s',
		closureCancelled: {
			title: 'Fechamento cancelado.',
			description: 'Este ticket não será mais fechado devido à atividade do ticket.',
		},
		threadClosed: {
			title: 'Thread fechada.',
			description: 'A thread de `%u` foi fechada por %s',
		},
		staffReply: 'Resposta da Staff',
		user: 'Usuário',
		pastThreads: 'Threads Antigas'
	},

	errors: {
		categoryCreate: 'Não foi possível criar uma categoria. Configuração cancelada.',
		configAdd: 'A configuração não pôde ser adicionada ao banco de dados. Configuração cancelada.',
		accountAge: 'Sua conta não tem idade suficiente para entrar em contato com a staff.',
		serverAge: 'Sua conta não está no servidor há tempo suficiente para entrar em contato com a staff.',
		unknown: 'Um erro desconhecido ocorreu. Por favor, tente novamente mais tarde.',
		contactStaff: 'Não foi possível enviar sua mensagem para a staff.',
		invalidPermissions: 'Você não tem as permissões necessárias para usar este comando.',
		snippet: 'Ocorreu um erro ao tentar obter o snippet.',
		noLogsUrl: 'Você não tem nenhuma URL de log configurada.',
		noUserIDProvided: 'Você deve fornecer um ID de usuário válido.',
		noLogsFound: 'Não consegui encontrar nenhum log para este usuário.',
		invalidHexColor: 'Você deve fornecer uma cor hexadecimal válida.',
		invalidLink: 'Você deve fornecer um link válido.',
	}
} as lang;