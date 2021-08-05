@echo off

title ModMail Setup
echo Welcome to ThePhoDit's ModMail setup. You will be asked to introduce several information and then you will be asked to run some commands.

echo Please, introduce your Discord Bot Token:
set /p bot_token=""
echo BOT_TOKEN=%bot_token% >> ../.env

echo Please, provide your MongoDB connection URI.
set /p mongo_uri=""
echo MONGO_URI=%mongo_uri% >> ../.env


echo Please, indicate your main guild ID (where threads will be created).
set /p main_guild_id=""
echo MAIN_GUILD_ID=%main_guild_id% >> ../.env

echo Please, indicate your ModMail logger URL if there's any (if not, just press enter).
set /p logs_url=""
echo LOGS_URL=%logs_url% >> ../.env

echo Done. Installing dependencies...
npm install