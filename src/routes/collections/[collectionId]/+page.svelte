<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	export let data;
	console.log('data :>> ', JSON.parse(JSON.stringify(data)));

	let addingRec = false;
	let name = '';
	let url = '';
	let note = '';
	let rating: number | null = null;

	$: name.length > 0 ? (addingRec = true) : (addingRec = false);
</script>

<main>
	<h1>{data.collection.name}</h1>

	<div class="border rounded-md p-4">
		<h2>add a rec</h2>
		<form class="grid gap-4" method="POST" action="?/create">
			<div class="grid gap-2">
				<Input id="name" name="name" required placeholder="name of the thing" bind:value={name} />
			</div>
			<div class={`grid gap-4 animated ${addingRec ? 'avisible' : 'ahidden'}`}>
				<div class="grid gap-2">
					<Label for="rating">how awesome is this thing?</Label>
					<div class="flex items-center gap-2">
						<Input
							id="rating"
							name="rating"
							bind:value={rating}
							type="number"
							class="w-20"
							min="0"
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
					<Input
						id="url"
						name="url"
						type="url"
						placeholder="enter url (optional)"
						bind:value={url}
					/>
				</div>
				<div class="grid gap-2">
					<Label for="note">notes</Label>
					<Textarea id="note" name="note" placeholder="what's good? any tips?" bind:value={note} />
				</div>

				<Button type="submit" class="w-full">save rec</Button>
			</div>
		</form>
	</div>

	<div class="mt-2">
		{#each data.bookmarks as bookmark}
			<div class="border-b py-6">
				<h3>
					<span class="mr-2">
						{#if bookmark.rating == 1}💩
						{:else if bookmark.rating == 2}🆗
						{:else if bookmark.rating == 3}👍
						{:else if bookmark.rating == 4}🔥
						{:else}🤷‍♂️{/if}
					</span>{bookmark.name}
				</h3>
				<p class="text-sm underline text-muted-foreground mb-4">
					<a href={bookmark.url} target="_blank">{bookmark.url}</a>
				</p>
				<p>
					{bookmark.note}
				</p>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		@apply mx-auto px-4 md:px-6 max-w-2xl py-12;
	}

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
