import Caller from '../lib/structures/Caller';
import { TextChannel } from 'eris';
import { UserDB } from '../lib/types/Database';
export default async (caller: Caller, channel: TextChannel): Promise<unknown> => {
	const category = caller.bot.getChannel(caller.category);
	if (!category || category.type !== 4) return;

	// If not text or not in ModMail category.
	if (channel.type !== 0) return;

	const userDB = await caller.db.getUser(channel.id, true) as UserDB;
	if (!userDB) return;
	if (userDB.channel === '0') return;

	const messages: string[] = [];
	const messagesArray = await caller.db.closeChannel(channel.id);
	for (const msg of messagesArray) {
		// Message author
		const author = caller.bot.users.get(msg.userID) || await caller.utils.discord.fetchUser(msg.userID);

		messages.push(`
<div>
		<h3 class="${msg.location}">${author ? `${author.username}#${author.discriminator}` : msg.userID} - ${msg.location === 'OOT' ? 'SERVER - Out Of Thread' : msg.location}</h3>
		<p class="content-text">${msg.content}</p>
		${msg.images ? `
		<div class="files">
				${msg.images.map((f, v) => `<a href="${f}">Image ${v}</a>`).join(' ')}
		</div>` : ''}
		<hr>
</div>
`);
	}

	if (!caller.logsChannel) return;
	await caller.utils.discord.createMessage(caller.logsChannel, `A thread from ${(channel as TextChannel).name} has been closed.`, false,
		{ name: `${(channel as TextChannel).name}-${Date.now()}.html`, file: Buffer.from(`
<html lang="en">
<head>
  	<title>ModMail Logs</title>
  	<meta charset="UTF-8">
  	<meta name="description" content="Log of a closed thread.">
  	<link rel="icon" href=${caller.bot.user.dynamicAvatarURL()} type="image/icon type">
  	<style>
        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #2C2F33
        }

        .topnav {
            overflow: hidden;
            background-color: #23272A;
        }

        .topnav-title {
            background-color: #99AAB5;
            overflow: hidden;
            width: 213px;
            float: left;
        }

        .topnav-title p {
            float: left;
            font-size: 20px;
            color: #000000;
            padding-left: 16px;
            position: center;
        }

        .topnav-links {
            overflow: hidden;
            float: left;
        }

        .topnav-links a {
            float: left;
            text-align: center;
            padding: 20px 16px;
            text-decoration: none;
            font-size: 20px;
            color: #7289DA;
        }

        .topnav-links a:hover {
            color: white;
        }

        .main {
            padding: 20px 20px;
        }

        h2 {
            color: #99AAB5;
        }

        h3 {
            color: #7289DA;
        }

        .files {
            color: #fdc75b;
        }

        .files a {
            color: white;
            text-decoration: none;
        }

        .files a:hover {
            text-decoration: white;
        }

        .content-text {
            color: white;
            padding-left: 20px;
        }
        
        .ADMIN {
        	color: forestgreen;
        }
        
        .USER {
        	color: orangered;
        }
    </style>
</head>

<body>

		<div class="topnav">

        <div class="topnav-title">
            <img src="${caller.bot.user.dynamicAvatarURL()}" style="float: left; width: 63px; height: 63px">
            <p>Thread Logs</p>
        </div>

        <div class="topnav-links">
            <a href="https://mail.phodit.xyz">ModMail Project</a>
            <a href="https://discord.gg/aUNhdFD">Support Server</a>
        </div>

    </div>
    
    <div class="main">
    		<div>
            <h2>Log from ${channel.guild.name}</h2>
            <hr>
        </div>
        ${messages.join('')}
		</div>
</body>
</html>
`)});
};