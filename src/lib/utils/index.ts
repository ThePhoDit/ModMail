import Mail from '../structures/Mail';
import DiscordUtils from './Discord';
import MiscUtils from './Misc';

class UtilsManager {
	discord: DiscordUtils;
	misc: MiscUtils;
	constructor(caller: Mail) {
		this.discord = new DiscordUtils(caller);
		this.misc = new MiscUtils(caller);
	}
}

export default UtilsManager;