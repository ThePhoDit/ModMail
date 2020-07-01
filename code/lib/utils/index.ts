import Caller from '../structures/Caller';
import DiscordUtils from './Discord';

class UtilsManager {
	discord: DiscordUtils;
	constructor(caller: Caller) {
		this.discord = new DiscordUtils(caller);
	}
}

export default UtilsManager;