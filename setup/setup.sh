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

echo "BOT_TOKEN=$BOT_TOKEN
DB=$DB
MONGO_URI=$MONGO_URI" > ../.env

cp config.ts.example ../src/config.ts

echo "Done. Installing dependencies... Please, fill in the configuration file as specified in the documentation and run the command \"npm run start\" once the installation has finished."
npm install