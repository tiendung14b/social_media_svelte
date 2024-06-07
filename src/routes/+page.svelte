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

	onMount(() => {
		if (!getUserToken()) {
			goto('/login');
		}
		getCurrentUser().then((res) => {
			localUser.set(res);
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

<Layout currPage="news">
	<div class="col-span-6 flex flex-col gap-3 items-end pt-8 pb-24">
		{#each posts as post}
			<Post {post} />
		{/each}
	</div>
</Layout>
