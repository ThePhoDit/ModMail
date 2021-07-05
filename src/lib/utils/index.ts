import Mail from '../structures/Mail';
import DiscordUtils from './Discord';

class UtilsManager {
	discord: DiscordUtils;
	constructor(caller: Mail) {
		this.discord = new DiscordUtils(caller);
	}
}

export default UtilsManager;