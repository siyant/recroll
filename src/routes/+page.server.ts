import db from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { data, error } = await db.from('collection').select();
	console.log('load collections data :>> ', data);
	return { collections: data };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const collection = {
			name: formData.get('name')
		};
		const { data: created, error } = await db.from('collection').insert(collection).select();

		if (error) {
			console.log('error :>> ', error);
		} else {
			redirect(303, `/collections/${created[0].id}`);
		}
	}
};
