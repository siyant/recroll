import { request } from '@playwright/test';
import {
	addBookmarkToCollection,
	getBookmarksByCollectionId,
	type Bookmark
} from './collectionsDb';

export const load = ({ params }) => {
	const bookmarks = getBookmarksByCollectionId(params.collectionId);
	return { bookmarks };
};

export const actions = {
	addbookmark: async ({ request, params }) => {
		const data = await request.formData();
		const bookmark: Bookmark = {
			title: data.get('title'),
			url: data.get('url'),
			rating: data.get('rating'),
			comments: data.get('comments')
		};
		addBookmarkToCollection(params.collectionId, bookmark);
	}
};
