# [ModMail](https://modmail.phodit.xyz/)

ModMail is a Discord bot which main purpose is to provide user-to-moderator private communication.
This bot needs to be hosted, as it is meant for a single Discord server.

**Documentation:** https://modmail.phodit.xyz/

## How does it work?

When a user DMs the bot, a channel that only the staff can see is created in the server. From there, mods can discuss and reply to the conversation all within the same channel, getting some fancy logs when the thread is closed.

## How do I setup the bot?

Please, read the documentaion at https://modmail.phodit.xyz/ and check the installation section.

## What are the bot commands?

You can check the commands [here](https://modmail.phodit.xyz/commands/).

# Translations

The currently available languages are:
 - English (United States) `en-US`
 - Español (España) `es-ES`
 - Dutch (Nederlands) `nl-NL`

## How to translate?

If you want to help to translate the bot, please create a file under `src/langs/locales/` with the name of the language and the `.ts` extension. For example, if you were translating into Spanish (Spain), you would name it as `es-ES.ts`.

Once you create it, please copy all contents of `src/langs/locales/es-US.ts` and make the corresponding translations. If you are going to leave any string without translation, **please leave the English version of it**, DO NOT remove its contents.

Then add the language to this list and to the scripts on the `setup/` directory files.

Finally, make a PR when you are ready. If you have any doubts about how the formatting is done or any other topic, please join our support server.
