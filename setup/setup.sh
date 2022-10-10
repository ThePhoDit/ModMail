#!/bin/bash

title "ModMail Setup"
echo "Welcome to ThePhoDit's ModMail setup. You will be asked to introduce several information and then you will be asked to run some commands."

echo "Please, introduce your Discord Bot Token:"
read BOT_TOKEN

echo "Please, provide your MongoDB connection URI."
read MONGO_URI


echo "Please, indicate your main guild ID (where threads will be created)."
read MAIN_GUILD_ID

echo "Please, indicate what your base URL is including the port (for example: http://localhost:3000)"
read LOGS_URL

echo "Please, choose a language for the bot (en-US, es-ES)."
read LANG

echo "BOT_TOKEN=$BOT_TOKEN
DB=$DB
MONGO_URI=$MONGO_URI
MAIN_GUILD_ID=$MAIN_GUILD_ID
LOGS_URL=$LOGS_URL
BOT_LANG=$LANG" > ../.env

echo "Done. Installing dependencies..."
npm install