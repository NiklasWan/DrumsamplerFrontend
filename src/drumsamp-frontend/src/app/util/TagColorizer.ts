export class TagColorizer {
	tagColorMap: Map<string,string>;
	public static instance: TagColorizer = new TagColorizer();
	tagList: Array<string> = [];

	private constructor() {
		this.tagColorMap = new Map();
		this.tagList.push("kick");
		this.tagList.push("snare");
		this.tagList.push("tom");
		this.tagList.push("drumloop");
		this.tagList.push("cymbal");
		this.tagList.push("unknown");
		
		this.tagColorMap.set("kick", 'primary');
		this.tagColorMap.set("snare", 'primary');
		this.tagColorMap.set("tom", 'primary');
		this.tagColorMap.set("drumloop", 'primary');
		this.tagColorMap.set("cymbal", 'primary');
		this.tagColorMap.set("unknown", 'none');
	}

	getColor(tag: string) {
		let color = this.tagColorMap.get(tag)
		
		if (color == undefined) {
			color = 'accent'
			this.tagColorMap.set(tag, color)
		}

		return color
	}

	private random_rgba() {
		var o = Math.round, r = Math.random, s = 255;
		return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
	}
	    
}