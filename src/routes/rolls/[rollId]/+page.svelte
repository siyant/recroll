<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Pencil } from 'lucide-svelte';
	import RecForm from './rec-form.svelte';

	export let data;

	let editingId: number | null = null;
</script>

<main>
	<a href="/"><h3 class="absolute top-4 left-4 text-muted-foreground">{'<'} more recs</h3></a>
	<h1>{data.roll.name}</h1>

	<div class="border rounded-md p-4" data-testid="create-rec-form">
		<h2>add a rec</h2>
		<RecForm action="?/create" />
	</div>

	<div class="mt-2" data-testid="recs">
		{#each data.recs as rec (rec.id)}
			<div class="rec-card border-b py-6">
				{#if rec.id === editingId}
					<RecForm action="?/update" deleteAction="?/delete" {rec} />
				{:else}
					<h3>
						<span class="mr-2">
							{#if rec.rating == 1}💩
							{:else if rec.rating == 2}🆗
							{:else if rec.rating == 3}👍
							{:else if rec.rating == 4}🔥
							{:else}🤷‍♂️{/if}
						</span>
						{rec.name}
						<Button
							variant="link"
							class="py-0 h-[initial] float-right"
							on:click={() => {
								console.log('hi');
								editingId = rec.id;
							}}
						>
							<Pencil class="w-4 h-4 text-gray-400" />
						</Button>
					</h3>
					<p class="text-sm underline text-muted-foreground mb-4">
						<a href={rec.url} target="_blank">{rec.url}</a>
					</p>
					<p class="whitespace-pre-wrap">
						{rec.description}
					</p>
				{/if}
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		@apply mx-auto px-4 md:px-6 max-w-2xl py-12;
	}
</style>
