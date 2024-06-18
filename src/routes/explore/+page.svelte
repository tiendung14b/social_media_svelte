<script>
	import { getAllUsers } from '$lib/api/user.js';
	import { goto } from '$app/navigation';
</script>

<h1 class="font-bold mt-10">Explore</h1>

<div class="pb-28">
	{#await getAllUsers()}
		<p>Loading...</p>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	{:then users}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore missing-declaration -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<ul
			class="mt-4 divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-md w-full mx-auto"
		>
			{#each users as user}
				<li
					class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
					on:click={() => {
						goto(`/profile?id=${user.id}`);
					}}
				>
					<div class="flex min-w-0 gap-x-4">
						<img
							class="h-12 w-12 flex-none rounded-full bg-gray-50 object-cover"
							src={user.profileImageUrl}
							alt=""
						/>
						<div class="min-w-0 flex flex-col justify-center">
							<!-- svelte-ignore a11y-invalid-attribute -->
							<p class="text-sm font-semibold leading-6 text-gray-900">
								<a href="#">
									<span class="absolute inset-x-0 -top-px bottom-0"></span>
									{user.first_name}
									{user.last_name}
								</a>
							</p>
							{#if user.username}
								<p class="mt-1 flex text-xs leading-5 text-gray-500">
									<a href="#!" class="relative truncate hover:underline">
										@{user.username}
									</a>
								</p>
							{/if}
						</div>
					</div>
					<div class="flex shrink-0 items-center gap-x-4">
						<div class="hidden sm:flex sm:flex-col sm:items-end">
							<p class="text-xs leading-5 text-gray-500">
								Last seen <time datetime="2023-01-23T13:23Z"
									>{(Date.now() - new Date(user.last_access).getTime()) / 1000}</time
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
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>
