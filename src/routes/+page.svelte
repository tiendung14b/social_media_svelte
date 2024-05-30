<script>
	import { onMount } from 'svelte';
	import { logout } from '$lib/api/auth.js';
	import { getCurrentUser } from '$lib/api/user.js';
	import '../app.css';

	let user;
	onMount(() => {
		getCurrentUser().then((res) => {
			user = res;
		});
	});
</script>

<button
	on:click={() => {
		logout();
	}}
>
	logout
</button>

<br />
<a href="/me">me</a>

{#if user}
	<p class="text-red-800">{user.email}</p>
	<p>{user.name}</p>
	<p>{user.birthday}</p>
	<img src={user.profileImageUrl} alt="" />
	<img src={user.coverImageUrl} alt="" />
{/if}
