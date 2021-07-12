export class AudioFile {
	file: File;
	isFavorite: boolean;
	tags: Array<string>;

	constructor(file: File, isFavorite: boolean, tags: Array<string>) {
		this.file = file;
		this.isFavorite = isFavorite;
		this.tags = tags;
	}
}