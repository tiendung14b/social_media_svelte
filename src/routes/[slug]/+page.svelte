<script>
	import { onMount } from 'svelte';
	import { logout } from '$lib/api/auth.js';
	import { localUser } from '$lib/stores/localUser.js';
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import '../../app.css';
	import Layout from '$lib/components/Layout/Layout.svelte';

	let user;
	const unsub = localUser.subscribe((value) => {
		user = value;
	});

	onMount(() => {
		if (!user) {
			goto('/login');
		}
	});
</script>

<Layout></Layout>
