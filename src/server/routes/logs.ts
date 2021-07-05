import { Router } from 'express';
import Axios from 'axios';
import Mongo from '../../database/Mongo';
import SQL from '../../database/sql/sql';

const routes = Router();

let DB: Mongo | SQL;
if (process.env.DB && process.env.DB === 'MONGO')
	DB = Mongo.getDatabase();
else
	DB = SQL.getDatabase();

routes.get('/:id', async (req, res) => {
	const data = await DB.getLogs(req.params.id);
	if (!data) return res.send('Invalid ID');

	const me = await (await Axios.get('https://discord.com/api/users/@me', {
		headers: {
			Authorization: `Bot ${process.env.BOT_TOKEN}`
		}
	})).data;

	const avatar = me.avatar ?
		`https://cdn.discordapp.com/avatars/${me.id}/${me.avatar}.png` :
		`https://cdn.discordapp.com/embed/avatars/${parseInt(me.discriminator) % 5}.png`;

	const messages: string[] = [];
	const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	for (const msg of data.messages) {
		// Message author
		const author = (await Axios.get(`https://discord.com/api/users/${msg.userID}`, {
			headers: {
				Authorization: `Bot ${process.env.BOT_TOKEN}`
			}
		})).data;

		const date = new Date(msg.date);

		messages.push(`
<tr>
	<td class="time">
		<p>${date.getUTCHours()}:${date.getUTCMinutes()}</p>
		<p>${date.getUTCDate()} ${shortMonths[date.getUTCMonth()]} ${date.getUTCFullYear()}</p>
	</td>
	<td>
		<h3 class="${msg.location}">${author ? `${author.username}#${author.discriminator}` : msg.userID} - ${msg.location === 'OOT' ? 'SERVER - Out Of Thread' : msg.location}</h3>
		<p class="content-text">${msg.content}</p>
		${msg.images && msg.images.length > 0 ? `
		<div class="files">
				${msg.images.map((f, v) => `<a href="${f}">Image ${v}</a>`).join(' ')}
		</div>` : ''}
	</td>
</tr>
`);
	}

	res.send(`
<html lang="en">
<head>
  	<title>ModMail Logs</title>
  	<meta charset="UTF-8">
  	<meta name="description" content="Log from .">
  	<link rel="icon" href="${avatar}" type="image/icon type">
  	<style>
        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #2C2F33
        }

        .topnav {
            overflow: hidden;
            background-color: #23272A;
            position: fixed;
            z-index: 1;
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
            padding: 70px 20px;
            position: relative;
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
        
        table {
        	border-collapse: collapse;
        	width: 100%;
        }
        
        td, tr {
					padding: 15px;
				}
				
				tr {
					border-bottom: 2px solid white;
				}
				
				.time {
					width: 7%;
					text-align: center;
					color: #99AAB5;
					font-size: 13px;
				}
    </style>
</head>

<body>

		<div class="topnav">

        <div class="topnav-title">
            <img src="${avatar}" style="float: left; width: 63px; height: 63px">
            <p>Thread Logs</p>
        </div>

        <div class="topnav-links">
            <a href="https://mail.phodit.xyz">ModMail Project</a>
            <a href="https://discord.gg/aUNhdFD">Support Server</a>
        </div>

    </div>
    
    <div class="main">
    		<div>
            <h2>Log from your guild</h2>
            <hr>
        </div>
        
        <table>
        	${messages.join('')}
				</table>
		</div>
</body>
</html>
`);

});

export default routes;