<script>
	import { page } from '$app/stores';
	import { getUserById, getUserByUsername, getCurrentUser } from '$lib/api/user.js';
	import { onDestroy, onMount } from 'svelte';
	import { localUser } from '$lib/stores/localUser.js';
	import Post from '../../lib/components/Post/Post.svelte';
	import UploadPost from '../../lib/components/UploadPost/UploadPost.svelte';

	let user = {};
	let local_user = {};
	const localUserUnsub = localUser.subscribe((value) => {
		local_user = value;
	});

	let slug = $page.params.slug;
	let user_id = $page.url.searchParams.get('id');
	$: isMyPage = local_user?.id === user_id;

	let uploadPostPopup = false;

	onMount(() => {
		getCurrentUser().then((res) => {
			localUser.set(res);
		});
		if (user_id) {
			getUserById(user_id).then((res) => {
				user = res;
			});
		} else {
			getUserByUsername(slug).then((res) => {
				user = res;
				isMyPage = user.id === local_user?.id;
			});
		}
	});

	onDestroy(() => {
		localUserUnsub();
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="pb-32">
	{#if uploadPostPopup}
		<UploadPost onClose={() => (uploadPostPopup = false)} />
	{/if}
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
				<div class="col-span-4 sticky">
					<div class="flex flex-col gap-8 w-full bg-white shadow-lg rounded-md py-4 px-4">
						{#if isMyPage}
							<div class="flex items-center justify-center gap-4 w-full">
								<img
									src={user.profileImageUrl}
									alt=""
									class="size-12 shrink-0 rounded-full object-cover"
								/>
								<input
									readonly
									on:click={() => {
										uploadPostPopup = true;
										console.log('click');
									}}
									class="bg-slate-200 p-3 rounded-full w-full outline-none"
									placeholder="What's on your mind?"
								/>
							</div>
						{/if}
						{#if user.date_created}
							<div>
								<strong class="font-bold">Joined</strong>
								<p class="mt-2">{user.date_created}</p>
							</div>
						{/if}
						{#if user.location !== null}
							<div>
								<strong class="font-bold">Location</strong>
								<p class="mt-2">{user.location}</p>
							</div>
						{/if}
						{#if user.birthday != null}
							<div>
								<strong class="font-bold">Birthday</strong>
								<p class="mt-2">{user.birthday}</p>
							</div>
						{/if}
					</div>
					<div class="flex flex-col gap-2 w-full bg-white shadow-lg rounded-md py-4 px-4 mt-4">
						{#if user.bio !== null}
							<strong class="font-bold">About</strong>
							<p class="mt-2">{user.bio}</p>
						{/if}
					</div>
				</div>
				<!-- right side -->
				<div class="col-span-6 flex flex-col gap-4 items-end">
					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
				</div>
			</div>
		</div>
	</div>
</div>
