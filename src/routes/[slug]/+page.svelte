<script>
	import { page } from '$app/stores';
	import { getUserById, getUserByUsername, getCurrentUser } from '$lib/api/user.js';
	import { onDestroy, onMount } from 'svelte';
	import { localUser } from '$lib/stores/localUser.js';
	import UploadPost from '../../lib/components/UploadPost/UploadPost.svelte';
	import { getPostsByAuthor } from '$lib/api/post.js';
	import ProfileImageSection from './ProfileImageSection.svelte';
	import Posts from './Posts.svelte';
	import Photos from './Photos.svelte';
	import About from './About.svelte';
	import Followers from './Followers.svelte';
	import Following from './Following.svelte';

	let user = {};
	let local_user = {};
	const localUserUnsub = localUser.subscribe((value) => {
		local_user = value;
	});
	let posts = [];

	let slug = $page.params.slug;
	let user_id = $page.url.searchParams.get('id');
	$: isMyPage = local_user?.id === user_id;

	let uploadPostPopup = false;

	let currPage = 1;

	const getImages = () => {
		let images = [];
		posts.forEach((post) => {
			images.push(...post.images);
		});
		return images;
	};

	onMount(() => {
		getCurrentUser().then((res) => {
			localUser.set(res);
		});
		if (user_id) {
			getUserById(user_id).then((res) => {
				user = res;
			});
			getPostsByAuthor(user_id).then((res) => {
				posts = res;
			});
		} else {
			getUserByUsername(slug).then((res) => {
				user = res;
				isMyPage = user.id === local_user?.id;
				getPostsByAuthor(user.id).then((res) => {
					posts = res;
				});
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
		<UploadPost
			onClose={async () => {
				uploadPostPopup = false;
			}}
			onSubmit={async () => {
				posts = [...(await getPostsByAuthor(user.id))];
				uploadPostPopup = false;
			}}
		/>
	{/if}

	<ProfileImageSection {user} {isMyPage} />
	<div class="mx-auto w-4/5 overflow-hidden">
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<ul class="flex *:p-5 *:font-bold *:text-gray-500">
			<li
				class={`${currPage === 1 && 'border-b-[#FF204E] border-b-[4px]'}`}
				on:click={() => {
					currPage = 1;
				}}
			>
				<a href="#!" class={`${currPage === 1 && 'text-[#FF204E]'}`}>Posts</a>
			</li>
			<li
				class={`${currPage === 2 && 'border-b-[#FF204E] border-b-[4px]'}`}
				on:click={() => {
					currPage = 2;
				}}
			>
				<a href="#!" class={`${currPage === 2 && 'text-[#FF204E]'}`}>About</a>
			</li>
			<li
				class={`${currPage === 3 && 'border-b-[#FF204E] border-b-[4px]'}`}
				on:click={() => {
					currPage = 3;
				}}
			>
				<a href="#!" class={`${currPage === 3 && 'text-[#FF204E]'}`}>Photos</a>
			</li>
			<li
				class={`${currPage === 4 && 'border-b-[#FF204E] border-b-[4px]'}`}
				on:click={() => {
					currPage = 4;
				}}
			>
				<a href="#!" class={`${currPage === 4 && 'text-[#FF204E]'}`}>Followers</a>
			</li>
			<li
				class={`${currPage === 5 && 'border-b-[#FF204E] border-b-[4px]'}`}
				on:click={() => {
					currPage = 5;
				}}
			>
				<a href="#!" class={`${currPage === 5 && 'text-[#FF204E]'}`}>Following</a>
			</li>
		</ul>
	</div>
	{#if currPage === 1}
		<Posts
			{user}
			{posts}
			{isMyPage}
			openUploadPostPopup={() => {
				uploadPostPopup = true;
			}}
			closeUploadPostPopup={() => {
				uploadPostPopup = false;
			}}
			{getImages}
		/>
	{:else if currPage === 2}
		<About {user} />
	{:else if currPage === 3}
		<Photos {user} {getImages} />
	{:else if currPage === 4}
		<Followers {user} />
	{:else if currPage === 5}
		<Following {user} />
	{/if}
</div>
