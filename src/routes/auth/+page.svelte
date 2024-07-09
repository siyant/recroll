<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { PageData } from './$types';

	export let data: PageData;
	let email = '';
</script>

<main>
	<form class="grid gap-4" method="POST">
		<Input id="email" name="email" type="email" placeholder="Enter your email" bind:value={email} />
		<Button type="submit" class="w-full">Log in</Button>
	</form>
</main>

<style>
	main {
		@apply mx-auto px-4 md:px-6 max-w-xl py-12;
	}
</style>
