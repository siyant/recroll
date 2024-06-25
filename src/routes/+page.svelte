<script>
	export let data;
</script>

<div class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">Collection Manager</h1>

	<div class="mb-4">
		<form method="POST" action="?/create">
		<input
			type="text"
			name="name"
			placeholder="Enter collection name"
			class="border p-2 mr-2"
		/>
		<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
			Create Collection
		</button>
	</form>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each data.collections as collection (collection.id)}
			<a href={`/collections/${collection.id}`}>
				<div class="bg-white shadow rounded p-4">
					<h2 class="text-xl font-semibold">{collection.name}</h2>
				</div>
			</a>
		{/each}
	</div>
</div>
