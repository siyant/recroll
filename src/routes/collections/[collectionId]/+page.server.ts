import { type Bookmark } from './collectionsDb';
import db from '$lib/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { data } = await db.from('item').select().eq('collection_id', params.collectionId);
	console.log('bookmarks :>> ', data);
	return { bookmarks: data };
};

export const actions: Actions = {
	create: async ({ request, params }) => {
		const data = await request.formData();
		const bookmark: Bookmark = {
			name: data.get('name'),
			url: data.get('url'),
			rating: data.get('rating'),
			note: data.get('note'),
			collection_id: params.collectionId
		};
		const { data: created, error } = await db.from('item').insert(bookmark);
		if (error) {
			console.log('error :>> ', error);
		} else {
			return { ok: true };
		}
	}
};
