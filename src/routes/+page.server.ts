import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: rolls, error } = await supabase.from('collection').select();
	return { rolls: rolls ?? [] };
};

export const actions: Actions = {
	create: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const collection = {
			name: formData.get('name')
		};

		const { data: created, error } = await supabase.from('collection').insert(collection).select();

		if (error) {
			console.log('error :>> ', error);
		} else {
			redirect(303, `/rolls/${created[0].id}`);
		}
	}
};
