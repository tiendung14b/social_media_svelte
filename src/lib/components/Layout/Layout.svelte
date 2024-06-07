<script>
	import '../../../app.css';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import Header from '../Header/Header.svelte';

	export let noSidebar = false;
	export let currPage = '';
</script>

<div class="flex flex-col w-full overflow-hidden">
	<div class="flex shadow-lg">
		<Header />
	</div>
	<div class="w-full bg-[#f5eded] overflow-y-scroll overflow-x-hidden px-4">
		<div class="flex max-w-[1200px] mx-auto">
			{#if !noSidebar}
				<div class="w-[65%] sm:w-[16vw] hidden fixed z-10 sm:h-auto sm:block">
					<Sidebar {currPage} />
				</div>
			{/if}
			<div class={`flex w-full pb-8 max-h-[100vh] ${!noSidebar && 'ml-[15vw]'}`}>
				<div class={`${!noSidebar ? 'max-w-[720px] sm:max-w-[75%]' : 'w-full'} mx-auto`}>
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
