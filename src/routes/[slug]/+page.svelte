<script>
	import { page } from '$app/stores';
	import { getUserById, getUserByUsername } from '$lib/api/user.js';
	import { onDestroy, onMount } from 'svelte';
	import { localUser } from '$lib/stores/localUser.js';

	let user = {};
	let local_user = {};
	const localUserUnsub = localUser.subscribe((value) => {
		local_user = value;
	});

	let slug = $page.params.slug;
	let user_id = $page.url.searchParams.get('id');
	$: isMyPage = local_user?.id === user_id;

	onMount(() => {
		if (user_id) {
			getUserById(user_id).then((res) => {
				user = res;
			});
		} else {
			getUserByUsername(slug).then((res) => {
				user = res;
			});
		}
	});

	onDestroy(() => {
		localUserUnsub();
	});
</script>

<div>
	<div class="">
		<div class="mx-auto w-4/5 overflow-hidden">
			<div>
				<div class="rounded-b-md overflow-hidden">
					<img src={user.coverImageUrl} alt="" class="object-cover h-[280px] w-full" />
				</div>
			</div>
			<div>
				<div class="flex items-center -mt-5">
					<div class="flex gap-4 items-center translate-x-10">
						<img
							src={user.profileImageUrl}
							alt=""
							class="size-[120px] rounded-full object-cover border-[3px] border-white box-content"
						/>
						<div class="flex flex-col gap-1">
							<strong class="text-[32px] font-bold">{user.first_name + ' ' + user.last_name}</strong
							>
							<span class="text-gray-600">{'@' + user.username}</span>
						</div>
					</div>
					{#if isMyPage}
						<a class="px-4 py-2 bg-slate-300 rounded-full ml-auto" href="/me">
							<img src="/images/settings.svg" alt="" class="size-4" />
						</a>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="mx-auto w-4/5 overflow-hidden mt-8">
		<div>
			<div class="grid grid-cols-10">
				<div class="col-span-4">
					<div class="flex flex-col gap-8 w-full bg-white shadow-lg rounded-md py-4 px-4">
						{#if isMyPage}
							<div class="flex items-center gap-4 w-full">
								<img src={user.profileImageUrl} alt="" class="size-12 rounded-full object-cover" />
								<input
									disabled
									class="bg-slate-200 p-3 rounded-full w-full"
									placeholder="What's on your mind?"
								/>
							</div>
						{/if}
						<div>
							<strong class="font-bold">About</strong>
							<p class="mt-2">{user.bio}</p>
						</div>
						{#if user.location !== null}
							<div>
								<strong class="font-bold">Location</strong>
								<p class="mt-2">{user.location}</p>
							</div>
						{/if}
					</div>
				</div>
				<div class="col-span-6"></div>
			</div>
			<!-- right side -->
		</div>
	</div>
</div>
