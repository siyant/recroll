import supabase from "$lib/db";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const { data: rolls, error } = await supabase.from("rolls").select();
	console.log("rolls :>>", rolls);
	return { rolls: rolls ?? [] };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const newRoll = {
			name: formData.get("name"),
		};

		const { data: created, error } = await supabase
			.from("rolls")
			.insert(newRoll)
			.select();

		if (error) {
			console.log("error :>> ", error);
		} else {
			redirect(303, `/rolls/${created[0].id}`);
		}
	},
};
