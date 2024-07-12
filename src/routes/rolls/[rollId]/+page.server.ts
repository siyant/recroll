import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data: rollData, error } = await supabase
		.from('collection')
		.select()
		.eq('id', params.rollId);

	const { data } = await supabase
		.from('item')
		.select()
		.eq('collection_id', params.rollId)
		.order('id');
	return { recs: data ?? [], roll: rollData && rollData.length > 0 ? rollData[0] : [] };
};

export const actions: Actions = {
	create: async ({ request, params, locals: { supabase } }) => {
		const data = await request.formData();

		const rec = {
			name: data.get('name'),
			url: data.get('url'),
			rating: data.get('rating') || 0,
			note: data.get('note'),
			collection_id: params.rollId
		};
		const { error } = await supabase.from('item').insert(rec);
		if (error) {
			console.log('error :>> ', error);
		} else {
			return { success: true };
		}
	},
	update: async ({ request, params, locals: { supabase } }) => {
		const data = await request.formData();

		const recId = data.get('id');
		const recUpdatedValues = {
			name: data.get('name'),
			url: data.get('url'),
			rating: data.get('rating') || 0,
			note: data.get('note')
		};
		const { error } = await supabase.from('item').update(recUpdatedValues).eq('id', recId);
		if (error) {
			console.log('error :>> ', error);
		} else {
			console.log(request.url);
			throw redirect(303, new URL(request.url).pathname);
		}
	}
};
