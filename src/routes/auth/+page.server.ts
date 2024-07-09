import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		if (!email) return { status: 400, body: { error: 'email is required' } };

		const { error } = await supabase.auth.signInWithOtp({
			email: email as string,
			options: {
				// set this to false if you do not want the user to be automatically signed up
				shouldCreateUser: true,
				emailRedirectTo: 'http://localhost:5173'
			}
		});

		if (error) {
			console.log('error :>> ', error);
		} else {
			return { status: 200, body: { message: 'Magic link sent' } };
		}
	}
};
