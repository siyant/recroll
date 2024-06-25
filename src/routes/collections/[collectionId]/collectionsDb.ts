export interface Bookmark {
	name: string;
	url: string;
	rating: number;
	note: string;
}

interface Collection {
	id: string;
	bookmarks: Bookmark[];
}
