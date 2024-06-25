export interface Bookmark {
	title: string;
	url: string;
	rating: number;
	comments: string;
}

interface Collection {
	id: string;
	bookmarks: Bookmark[];
}

const collections: Collection[] = [];

export function getBookmarksByCollectionId(collectionId: string): Bookmark[] {
	const collection = collections.find((c) => c.id === collectionId);
	return collection ? collection.bookmarks : [];
}

export function addBookmarkToCollection(collectionId: string, bookmark: Bookmark): void {
	const collection = collections.find((c) => c.id === collectionId);
	if (collection) {
		collection.bookmarks.push(bookmark);
	} else {
		collections.push({
			id: collectionId,
			bookmarks: [bookmark]
		});
	}
}
