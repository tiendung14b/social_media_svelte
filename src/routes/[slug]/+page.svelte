<script>
	import { localUser } from '$lib/stores/localUser.js';
	import { onDestroy } from 'svelte';

	let user;
	const unsub = localUser.subscribe((value) => {
		user = value;
	});

	onDestroy(() => {
		unsub();
	});
</script>

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
					class="size-[120px] rounded-full border-[3px] border-white box-content"
				/>
				<div class="flex flex-col gap-1">
					<strong class="text-[32px] font-bold">{user.first_name + ' ' + user.last_name}</strong>
					<span class="text-gray-600">{'@' + user.username}</span>
				</div>
			</div>
			<a class="px-4 py-2 bg-slate-300 rounded-full ml-auto" href="/me">
				<img src="/images/settings.svg" alt="" class="size-4" />
			</a>
		</div>
	</div>
</div>
