<script>
	import { onMount } from 'svelte';

	let collections = [];
	let newCollectionTitle = '';

	onMount(() => {
		const storedCollections = localStorage.getItem('collections');
		if (storedCollections) {
			collections = JSON.parse(storedCollections);
		}
	});

	function createCollection() {
		if (newCollectionTitle.trim()) {
			collections = [...collections, { id: Date.now(), title: newCollectionTitle.trim() }];
			localStorage.setItem('collections', JSON.stringify(collections));
			newCollectionTitle = '';
		}
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">Collection Manager</h1>

	<div class="mb-4">
		<input
			type="text"
			bind:value={newCollectionTitle}
			placeholder="Enter collection title"
			class="border p-2 mr-2"
		/>
		<button on:click={createCollection} class="bg-blue-500 text-white px-4 py-2 rounded">
			Create Collection
		</button>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each collections as collection (collection.id)}
			<a href={`/collections/${collection.id}`}>
				<div class="bg-white shadow rounded p-4">
					<h2 class="text-xl font-semibold">{collection.title}</h2>
				</div>
			</a>
		{/each}
	</div>
</div>
