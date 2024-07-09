import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data: rollData, error } = await supabase
		.from('collection')
		.select()
		.eq('id', params.rollId);

	const { data } = await supabase.from('item').select().eq('collection_id', params.rollId);
	return { recs: data, roll: rollData && rollData.length > 0 ? rollData[0] : [] };
};

export const actions: Actions = {
	create: async ({ request, params, locals: { supabase } }) => {
		const data = await request.formData();
		console.log('data :>> ', Object.fromEntries(data));
		const bookmark = {
			name: data.get('name'),
			url: data.get('url'),
			rating: data.get('rating') || 0,
			note: data.get('note'),
			collection_id: params.rollId
		};
		const { data: created, error } = await supabase.from('item').insert(bookmark);
		if (error) {
			console.log('error :>> ', error);
		} else {
			return { ok: true };
		}
	}
};
