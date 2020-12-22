# [ModMail](https://mail.phodit.xyz/)

ModMail is a Discord bot which main purpose is to provide users-to-moderators private communication.
This bot needs to be hosted, as it is meant for a single Discord server.

**Documentation:** https://mail.phodit.xyz/

## Setup

Setting up this bot is pretty easy, just follow the steps below.
1. Fork and clone this repo.
2. Create a [Discord application](https://discord.com/developers/applications) and get the bot token.
3. Create a file called `.env` in the main directory. Add the following:
    ````dotenv
    BOT_TOKEN=YOU_TOKEN_GOES_HERE
    HOST=YOUR_HOST(READ_BELOW)
    URL=YOUR_REPLIT_URL
    ````
    > The host option is only required if [Repl.it](https://repl.it/) is going to be used. If so, the value must be `REPLIT`, if not, feel free to remove that line. If you are using Repl.it, provide the URL too (should look something like this: `https://ProjectName--YourUsername.repl.co`). Paste that same URL [here](http://ping.mat1.repl.co/) and click "ADD".
    
    The bot uses SQLite by default. If you are going to host it on a site like Repl.it or Heroku, you should add the following to the `.env` file:
    ````dotenv
    DB=MONGO
    MONGO_URI=YOUR_MONGO_URI_GOES_HERE
    ````
4. Run `npm run setup`.
5. Fill the `src/config.ts` file.
6. Run `npm run start` to start your bot. If you want to use any node runtime such as PM2, run `npm run build` and then start the process as you would normally do (file `prod/index.js`).

## How does it work?

- Someone DMs your bot and a thread will be opened inside the specified category.
- Moderators get notified and start chatting with them via the bot.

## Commands

````text
reply {content} - Thread Only
close - Thread Only
rename {new name} - Thread Only
set {option} {values}
snippet {add/rmv} {name} [content] / snippet list
````
