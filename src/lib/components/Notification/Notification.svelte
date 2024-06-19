<script>
	import { onMount } from 'svelte';
	import { getUserToken } from '$lib/utils/storeAccount.js';
	import { localUser } from '$lib/stores/localUser.js';

	let newNotification = 0;
	let notifications = [];
	let showNotification = false;
	let limit = 5;

	onMount(() => {
		const url = 'https://training01.appdemo.dev/websocket';
		const accessToken = getUserToken().access_token;
		const collection = 'directus_notifications';
		const connection = new WebSocket(url);

		connection.addEventListener('open', () => {
			connection.send(
				JSON.stringify({
					type: 'auth',
					access_token: accessToken
				})
			);
		});

		const receiveNotification = (message) => {
			const data = JSON.parse(message.data);
			if (data.type === 'auth' && data.status === 'ok') {
				connection.send(
					JSON.stringify({
						type: 'subscribe',
						collection,
						query: {
							fields: ['*'],
							limit: limit,
							sort: '-timestamp',
							filter: {
								recipient: $localUser?.id
							}
						}
					})
				);
			} else {
				const notis = data.data;
				if (!notis) return;
				if (notis?.length === 0) {
					return;
				}
				if (notifications.length > 0) {
					newNotification++;
				}
				notifications = [...notis, ...notifications];
			}
		};

		connection.addEventListener('message', (message) => {
			receiveNotification(message);
		});
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="relative rounded-md"
	on:click={() => {
		showNotification = !showNotification;
		newNotification = 0;
	}}
>
	<img src="/images/notification.png" alt="" class="size-6" />
	{#if newNotification > 0}
		<div
			class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]"
		>
			{newNotification}
		</div>
	{/if}
	<div
		class={`flex flex-col absolute z-10 top-10 right-0 w-[300px] bg-white shadow-lg rounded-lg ${!showNotification && 'hidden'}`}
	>
		{#each notifications as notification}
			<div class={`flex flex-col gap-1 px-4 py-2 ${!notification.isRead && 'bg-[#FF204E55]'}`}>
				<p class="font-bold">{notification.subject}</p>
				<p class="overflow-clip line-clamp-1">{notification.message}</p>
			</div>
			<hr />
		{/each}
	</div>
</div>
