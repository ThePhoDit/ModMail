@echo off

title ModMail Setup
echo Welcome to ThePhoDit's ModMail setup. You will be asked to introduce several information and then you will be asked to run some commands.

echo Please, introduce your Discord Bot Token:
set /p bot_token=""
echo BOT_TOKEN=%bot_token% >> ../.env

echo Please, indicate if you want to use MongoDB (type: MONGO) or SQLite (type: SQL) as your DB. If you are going to use a site such as Repl.it or Heroku to host your bot, you MUST select MongoDB.
set /p db=""
echo DB=%db% >> ../.env

if %db%==MONGO (
    echo Please, provide your MongoDB connection URI.
    set /p mongo_uri=""
    echo MONGO_URI=%mongo_uri% >> ../.env
)

copy config.ts.example ../src/config.ts

echo Done. Installing dependencies... Please, fill in the configuration file as specified in the documentation and run the command "npm run start" once the installation has finished.
npm install