const embedLimits = {
	title: 256,
	description: 4096,
	fieldName: 256,
	fieldValue: 1024,
	footerText: 2048,
	authorName: 256,
	fields: 25,
	total: 6000
};

export default class MessageEmbed {
	currentTotal = 0
	enforceLimits = true
	file: EmbedFile | undefined
	code: EmbedCode = {
		color: 0x7289da,
		fields: [],
	}

	constructor(enforceLimits = true) {
		if (!enforceLimits) this.enforceLimits = false;

		return this;
	}

	fitData(data: string, max: number): string {
		if (data.length > max) data = data.substring(0, max);
		const availableCharacters = embedLimits.total - this.currentTotal;
		if (!availableCharacters) return '';
		if (this.currentTotal + data.length > embedLimits.total) return data.substring(0, availableCharacters);
		return data;
	}

	setAuthor(name: string, icon?: string, url?: string): this {
		const finalName = this.enforceLimits ? this.fitData(name, embedLimits.authorName) : name;
		this.code.author = { name: finalName, icon_url: icon, url };

		return this;
	}

	setColor(color: string): this {
		this.code.color =
			color.toLowerCase() === 'random'
				?
				Math.floor(Math.random() * (0xffffff + 1))
				:
				parseInt(color.replace('#', ''), 16);

		return this;
	}

	setDescription(description: string): this {
		this.code.description = this.fitData(description, embedLimits.description);

		return this;
	}

	addField(name: string, value: string, inline = false): this {
		if (this.code.fields.length >= 25) return this;

		this.code.fields.push({
			name: this.fitData(name, embedLimits.fieldName),
			value: this.fitData(value, embedLimits.fieldValue),
			inline
		});

		return this;
	}

	addBlankField(inline = false): this {
		return this.addField('\u200B', '\u200B', inline);
	}

	attachFile(file: Buffer, name: string): this {

		this.file = {
			file,
			name
		};

		this.setImage(`attachment://${name}`);

		return this;
	}

	setFooter(text: string, icon?: string): this {
		this.code.footer = { text: this.fitData(text, embedLimits.footerText), icon_url: icon };

		return this;
	}

	setImage(url: string): this {
		this.code.image = { url };

		return this;
	}

	setTimestamp(time = Date.now()): this {
		this.code.timestamp = new Date(time).toISOString();

		return this;
	}

	setTitle(title: string, url?: string): this {
		this.code.title = this.fitData(title, embedLimits.title);
		if (url) this.code.url = url;

		return this;
	}

	setThumbnail(url: string): this {
		this.code.thumbnail = { url };

		return this;
	}
}

export interface EmbedAuthor {
	name: string;
	icon_url?: string;
	url?: string;
}

export interface EmbedField {
	name: string;
	value: string;
	inline: boolean;
}

export interface EmbedFile {
	name: string;
	file: Buffer;
}

export interface EmbedFooter {
	text: string;
	icon_url?: string;
}

export interface EmbedImage {
	url: string;
}

export interface EmbedCode {
	author?: EmbedAuthor;
	color: number;
	description?: string;
	fields: EmbedField[];
	footer?: EmbedFooter;
	image?: EmbedImage;
	timestamp?: string;
	title?: string;
	thumbnail?: EmbedImage;
	url?: string;
}