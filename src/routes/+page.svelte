<script>
	import { onMount } from 'svelte';
	import { logout } from '$lib/api/auth.js';
	import { localUser } from '$lib/stores/localUser.js';
	import { getUserToken } from '$lib/utils/storeAccount.js';
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import '../app.css';
	import Layout from '$lib/components/Layout/Layout.svelte';
	import Post from '$lib/components/Post/Post.svelte';
	import { getAllPosts } from '$lib/api/post.js';
	import { getCurrentUser } from '$lib/api/user.js';

	let posts = [];
	let scrollY = 0;
	let isAllPostsLoaded = false;
	let isRendered = false;

	onMount(() => {
		if (!getUserToken()) {
			return goto('/login');
		}
		getCurrentUser().then((res) => {
			localUser.set(res);
			isRendered = true;
		});
		getAllPosts()
			.then((res) => {
				posts = res;
			})
			.catch((err) => {
				console.log(err);
			});
	});
</script>

{#if isRendered}
	<Layout
		currPage="news"
		onLastPage={() => {
			if (isAllPostsLoaded) return;
			getAllPosts(10, posts.length)
				.then((res) => {
					if (res.length === 0) {
						isAllPostsLoaded = true;
						return;
					}
					posts = [...posts, ...res];
				})
				.catch((err) => {
					console.log(err);
				});
		}}
	>
		<div class="col-span-6 flex flex-col gap-3 items-end pt-8 pb-24 w-full">
			{#each posts as post}
				<Post {post} />
			{/each}
			<div class="bg-slate-300 rounded-md w-[96%] p-2 text-center">
				<p class="font-bold">
					{#if isAllPostsLoaded}
						{`Hết post òi. Đi kiếm thêm bạn đi ạ :))`}
					{:else}
						{`Đợi xíu load thêm post...`}
					{/if}
				</p>
			</div>
		</div>
	</Layout>
{/if}
