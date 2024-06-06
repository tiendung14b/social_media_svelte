<script>
	export let user = {};
	import { getUserById } from '$lib/api/user.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let followers = [];
	const getFollowers = () => {
		Promise.all(user.follower.map((follower) => getUserById(follower.follower))).then((res) => {
			followers = res;
			console.log(followers);
		});
	};

	onMount(() => {
		getFollowers();
	});
</script>

<ul
	role="list"
	class="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-md w-4/5 mx-auto"
>
	{#each followers as follower}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<li
			class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
			on:click={() => {
				goto(`/profile?id=${follower.id}`);
				window.location.reload();
			}}
		>
			<div class="flex min-w-0 gap-x-4">
				<img
					class="h-12 w-12 flex-none rounded-full bg-gray-50 object-cover"
					src={follower.profileImageUrl}
					alt=""
				/>
				<div class="min-w-0 flex flex-col justify-center">
					<!-- svelte-ignore a11y-invalid-attribute -->
					<p class="text-sm font-semibold leading-6 text-gray-900">
						<a href="#">
							<span class="absolute inset-x-0 -top-px bottom-0"></span>
							{follower.first_name}
							{follower.last_name}
						</a>
					</p>
					{#if follower.username}
						<p class="mt-1 flex text-xs leading-5 text-gray-500">
							<a href="#!" class="relative truncate hover:underline">
								@{follower.username}
							</a>
						</p>
					{/if}
				</div>
			</div>
			<div class="flex shrink-0 items-center gap-x-4">
				<div class="hidden sm:flex sm:flex-col sm:items-end">
					<p class="text-xs leading-5 text-gray-500">
						Last seen <time datetime="2023-01-23T13:23Z"
							>{(Date.now() - new Date(follower.last_access).getTime()) / 1000}</time
						>
					</p>
				</div>
				<svg
					class="h-5 w-5 flex-none text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		</li>
	{/each}
</ul>
