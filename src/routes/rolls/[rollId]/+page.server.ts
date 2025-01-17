import supabase from "$lib/db";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const { data: rollData, error } = await supabase
		.from("rolls")
		.select()
		.eq("id", params.rollId);

	const { data } = await supabase
		.from("recs")
		.select()
		.eq("roll_id", params.rollId)
		.order("id");
	return {
		recs: data ?? [],
		roll: rollData && rollData.length > 0 ? rollData[0] : [],
	};
};

export const actions: Actions = {
	create: async ({ request, params }) => {
		const data = await request.formData();

		const rec = {
			name: data.get("name"),
			url: data.get("url"),
			rating: data.get("rating") || 0,
			description: data.get("description"),
			roll_id: params.rollId,
		};
		const { error } = await supabase.from("recs").insert(rec);
		if (error) {
			console.log("error :>> ", error);
		} else {
			return { success: true };
		}
	},
	update: async ({ request }) => {
		const data = await request.formData();

		const recId = data.get("id");
		const recUpdatedValues = {
			name: data.get("name"),
			url: data.get("url"),
			rating: data.get("rating") || 0,
			description: data.get("description"),
		};
		const { error } = await supabase
			.from("recs")
			.update(recUpdatedValues)
			.eq("id", recId);
		if (error) {
			console.log("error :>> ", error);
		} else {
			console.log(request.url);
			return { success: true };
		}
	},
	delete: async ({ request }) => {
		const data = await request.formData();

		const recId = data.get("id");
		const { error } = await supabase.from("recs").delete().eq("id", recId);
		if (error) {
			console.log("error :>> ", error);
		} else {
			return { success: true };
		}
	},
};
