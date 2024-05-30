<script>
	import '../../../app.css';
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import { getCurrentUser } from '$lib/api/user';
	import { localUser } from '$lib/stores/localUser.js';

	let user;
	user = localUser.subscribe((value) => {
		user = value;
	});
	onMount(async () => {
		localUser.set(await getCurrentUser());
	});
</script>

<div class="flex w-full">
	<div class="flex w-[1170px] mx-auto">
		<div
			class="w-[65%] h-full hidden fixed z-10 sm:h-auto sm:w-[25%] sm:static sm:block overflow-y-scroll"
		>
			<Sidebar />
		</div>
		<div class="mx-auto sm:w-[75%] px-4 pb-8 max-h-[100vh] overflow-auto scroll-smooth">
			<slot />
		</div>
	</div>
</div>
