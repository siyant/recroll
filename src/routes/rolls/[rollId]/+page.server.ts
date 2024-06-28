import db from '$lib/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { data: rollData, error } = await db.from('collection').select().eq('id', params.rollId);

	const { data } = await db.from('item').select().eq('collection_id', params.rollId);
	console.log('recs :>> ', data);
	return { recs: data, roll: rollData[0] };
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
			collection_id: params.rollId
		};
		const { data: created, error } = await db.from('item').insert(bookmark);
		if (error) {
			console.log('error :>> ', error);
		} else {
			return { ok: true };
		}
	}
};
