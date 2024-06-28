<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let data;
	let name = '';
	let addingCollection = false;

	$: addingCollection = name.length > 0;
</script>

<main>
	<h1>your collections</h1>

	<div class="border rounded-md p-4 mb-4">
		<h2>create a collection</h2>
		<form class="grid gap-4" method="POST" action="?/create">
			<div class="grid gap-2">
				<Input
					id="name"
					name="name"
					type="text"
					placeholder="eg. coffee places in sg, baking recipes, etc"
					bind:value={name}
				/>
			</div>
			<div class="animated {addingCollection ? 'avisible' : 'ahidden'}">
				<Button type="submit" class="w-full">create collection</Button>
			</div>
		</form>
	</div>

	{#each data.collections as collection (collection.id)}
		<div>
			<a href={`/collections/${collection.id}`}>
				<h2>{collection.name}</h2>
			</a>
		</div>
	{/each}
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
