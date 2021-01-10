#!/bin/bash
title "ModMail Setup"
echo "Welcome to ThePhoDit's ModMail setup. You will be asked to introduce several information and then you will be asked to run some commands."

echo "Please, introduce your Discord Bot Token:"
read BOT_TOKEN

echo "Please, indicate if you want to use MongoDB (type: MONGO) or SQLite (type: SQL) as your DB. If you are going to use a site such as Repl.it or Heroku to host your bot, you MUST select MongoDB."
read DB

if [ "$DB" == "MONGO" ]; then
  echo "Please, provide your MongoDB connection URI."
  read MONGO_URI
fi

echo "Please, indicate what port do you want your logs to run (for example: 3000)."
read PORT

echo "Please, indicate what your base URL is including the port (for example: http://localhost:3000)"
read LOGS_URL

echo "BOT_TOKEN=$BOT_TOKEN
DB=$DB
MONGO_URI=$MONGO_URI
PORT=$PORT
LOGS_URL=$LOGS_URL" > ../.env

cp config.ts.example ../src/config.ts

echo "Done. Installing dependencies... Please, fill in the configuration file as specified in the documentation and run the command \"npm run start\" once the installation has finished."
npm install