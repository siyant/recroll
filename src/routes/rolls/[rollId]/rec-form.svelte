<!-- Form for creating or updating a rec -->

<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { Rec } from '$lib/types';

	export let rec: Rec = {
		id: null,
		name: '',
		url: '',
		rating: 0,
		note: ''
	};
	export let action;

	let id = rec.id;
	let name = rec.name;
	let url = rec.url;
	let note = rec.note;
	let rating = rec.rating;

	let showShortenedForm = rec.id == null; // for new recs, show the shortened form
	$: showShortenedForm = name.length === 0 && url.length === 0 && note.length === 0 && rating === 0;
</script>

<form class="grid gap-4" method="POST" {action} use:enhance>
	<div class="grid gap-2">
		<Input id="name" name="name" required placeholder="name of the thing" bind:value={name} />
	</div>
	<div class={`grid gap-4 animated ${showShortenedForm ? 'ahidden' : 'avisible'}`}>
		<div class="grid gap-2">
			<Label for="rating">how awesome is this thing?</Label>
			<div class="flex items-center gap-2">
				<Input
					id="rating"
					name="rating"
					bind:value={rating}
					type="number"
					class="w-20"
					min="1"
					max="4"
					placeholder="1-4"
				/>
				{#if rating == 1}💩
				{:else if rating == 2}🆗
				{:else if rating == 3}👍
				{:else if rating == 4}🔥
				{:else}🤷‍♂️{/if}
			</div>
		</div>
		<div class="grid gap-2">
			<Label for="url">url</Label>
			<Input id="url" name="url" type="url" placeholder="enter url (optional)" bind:value={url} />
		</div>
		<div class="grid gap-2">
			<Label for="note">notes</Label>
			<Textarea id="note" name="note" placeholder="what's good? any tips?" bind:value={note} />
		</div>

		<input type="hidden" name="id" value={id} />
		<Button type="submit" class="w-full">save rec</Button>
	</div>
</form>

<style>
	.animated {
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.5s ease-in-out,
			visibility 0.5s ease-in-out;
	}

	.avisible {
		opacity: 1;
		visibility: visible;
	}

	.ahidden {
		opacity: 0;
		visibility: hidden;
		max-height: 0;
		transition: max-height 0.5s ease-in-out;
	}
</style>
