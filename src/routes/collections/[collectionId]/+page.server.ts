import { type Bookmark } from './collectionsDb';
import db from '$lib/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { data: collectionData, error } = await db
		.from('collection')
		.select()
		.eq('id', params.collectionId);

	const { data } = await db.from('item').select().eq('collection_id', params.collectionId);
	console.log('bookmarks :>> ', data);
	return { bookmarks: data, collection: collectionData[0] };
};

export const actions: Actions = {
	create: async ({ request, params }) => {
		const data = await request.formData();
		console.log('data :>> ', Object.fromEntries(data));
		const bookmark = {
			name: data.get('name'),
			url: data.get('url'),
			rating: data.get('rating') || 0,
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
