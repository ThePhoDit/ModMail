/**
 * Un sistema de gestión de idiomas para el bot.
 * holasoyender - 2022 - MIT
 * Este código es de código abierto y puede ser modificado y redistribuido.
 *
 * @author holasoyender
 * @license MIT
 * @version 0.0.17-pre2
 */

import { debug } from 'console';
import fs from 'fs';
import lang from './lang';
import { join } from 'path';

const langs: { [key: string]: lang } = {};

/**
 * Load the manager worker.
 * @param {boolean} __debug - Weather to print debug messages or not.
 * @returns {Promise<void>} - return void or throws an error.
 * @throws {Error} - If the language file is invalid.
 */

export const loadLangs = async /*char*/(__debug?: boolean): Promise<void> => {

	__debug ? debug('[lang-worker] trying to load languages for job with id %d', process.pid) : null;

	const lang_files = await fs.promises.readdir(join(__dirname, '.', 'locales'));
	__debug ? debug('[lang-worker] found %d language files', lang_files.length) : null;
	for (let file of lang_files)
		if (file.endsWith('.js') || file.endsWith('.ts')) {
			file = file.split('.')[0];
			const lang_func = (await import(`./locales/${file}`)).default;
			const lang_name = file.split('.')[0];
			langs[lang_name] = lang_func;
			__debug ? debug('[lang-worker] loaded language %s', lang_name) : null;
		}
};

/**
 * Fetch a language from the in-memory cache.
 * @param {string} lang_name - The name of the language to fetch.
 * @param {boolean} __debug - Weather to print debug messages or not.
 * @param {boolean} __throw - Weather to throw an error if the language is not found or not.
 * @param {boolean} __return - Weather to return the default language or not.
 * @returns {lang} - return void or throws an error.
 * @throws {Error} - If the language file is invalid.
 */

export const getLang = (lang_name: string, __debug?: boolean, __throw?: boolean, __return?: boolean): lang | false => {
	__debug ? debug('[lang-worker] trying to get language %s', lang_name) : null;
	if (langs[lang_name]) {
		__debug ? debug('[lang-worker] found language %s', lang_name) : null;
		return langs[lang_name];
	} else {
		__debug ? debug('[lang-worker] could not find language %s', lang_name) : null;
		if (__throw) throw new Error(`[ lang-worker] could not find language ${lang_name}`);
		if (__return) return false;
		return langs['en-US'];
	}
};

export const currentLang = (): lang => {
	try {
		const /*val*/ lang = getLang(process.env.BOT_LANG ?? '', false, true, false);
		return lang ? lang : langs['en-US'];
	} catch (e) {
		return langs['en-US'];
	}
};

/**
 * Initialize the languaje manager worker.
 * @param {boolean} __debug - Weather to print debug messages or not.
 * @param {boolean} __throw - Weather to throw an error if the manager fails to load or not.
 * @returns {boolean} - returns true if the manager was loaded successfully.
 */

export const initialize = async (__debug?: boolean, __throw?: boolean): Promise<boolean> => {

	__debug ? debug('[lang-worker] trying to initialize language manager') : null;
	try {
		await loadLangs(__debug);
		__debug ? debug('[lang-worker] language manager initialized') : null;
		return true;
	} catch (error) {
		__debug ? debug('[lang-worker] could not initialize language manager') : null;
		if (__throw) throw error;
		return false;
	}
};

//                                         ___
//                                     ,-""   `.
//                                   ,'  _   e )`-._
//                                  /  ,' `-._<.===-' quack!
//                                 /  /
//                                /  ;
//                    _          /   ;
//      (`._    _.-"" ""--..__,'    |
//       <_  `-""                     \
//        <`-                          :
//         (__   <__.                  ;
//           `-.   '-.__.      _.'    /
//              \      `-.__,-'    _,'
//               `._    ,    /__,-'
//                  ""._\__,'< <____
//                       | |  `----.`.
//                       | |        \ `.
//                       ; |___      \-``
//                       \   --<
//                        `.`.<
//