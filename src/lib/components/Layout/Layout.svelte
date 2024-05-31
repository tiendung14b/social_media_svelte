<script>
	import '../../../app.css';
	import { onMount } from 'svelte';
	import { getCurrentUser } from '$lib/api/user';
	import { localUser } from '$lib/stores/localUser.js';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import Header from '../Header/Header.svelte';

	onMount(() => {
		getCurrentUser().then((res) => {
			localUser.set(res);
		});
	});
</script>

<div class="flex flex-col w-full overflow-hidden">
	<div class="flex shadow-lg">
		<Header />
	</div>
	<div class="w-full h-full overflow-auto mt-1">
		<div class="flex w-[1200px] mx-auto">
			<div class="w-[65%] sm:w-[15vw] hidden fixed z-10 sm:h-auto sm:block">
				<Sidebar />
			</div>
			<div class="flex w-full pb-8 max-h-[100vh] ml-[15vw]">
				<div class="max-w-[720px] sm:max-w-[75%] mx-auto">
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>

<!-- <div>
	<Header />
	<div class="w-[65%] sm:w-[25%] hidden fixed top-0 left-0 z-10 sm:h-auto sm:static sm:block">
		<Sidebar />
	</div>
</div> -->
