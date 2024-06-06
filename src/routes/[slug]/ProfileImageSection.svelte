<script>
	export let user = {};
	export let isMyPage = false;

	import { localUser } from '$lib/stores/localUser.js';
	import { follow, unfollow } from '$lib/api/follow.js';
	let local_user = {};
	const localUserUnsub = localUser.subscribe((value) => {
		local_user = value;
	});

	$: isFollowed = (() => {
		if (!user || !user.follower) return undefined;
		let res = undefined;
		user.follower.forEach((value) => {
			if (value.follower === local_user.id) {
				res = value.id;
			}
		});
		return res;
	})();

	let onSetFollow = async () => {
		await follow({
			follower: local_user.id,
			followee: user.id
		});
		window.location.reload();
	};

	let onSetUnFollow = async (id) => {
		await unfollow(id);
		isFollowed = undefined;
		window.location.reload();
	};
</script>

<div class="">
	<div class="mx-auto w-4/5 overflow-hidden">
		<div class="">
			<div class="rounded-b-md overflow-hidden h-[280px] w-full">
				{#if user.coverImageUrl}
					<img src={user.coverImageUrl} alt="" class="object-cover h-[280px] w-full" />
				{/if}
			</div>
		</div>
		<div>
			<div class="flex items-center -mt-5">
				<div class="flex gap-4 items-center translate-x-10">
					<img
						src={user.profileImageUrl}
						alt=""
						class="size-[120px] rounded-full object-cover border-[3px] border-[#f5eded] box-content"
					/>
					<div class="flex flex-col gap-1">
						<strong class="text-[32px] font-bold">{user.first_name + ' ' + user.last_name}</strong>
						<span class="text-gray-600">{'@' + user.username}</span>
					</div>
				</div>
				{#if isMyPage}
					<a class="px-4 py-2 bg-slate-300 rounded-full ml-auto" href="/me">
						<img src="/images/settings.svg" alt="" class="size-4" />
					</a>
				{:else}
					<!-- button follow -->
					<button
						class={`px-5 py-3 rounded-md ml-auto ${
							isFollowed ? 'bg-gray-300 text-black' : 'bg-[#ff204e] text-white'
						}`}
						on:click={isFollowed ? onSetUnFollow.bind(null, isFollowed) : onSetFollow}
						>{isFollowed ? 'Followed' : 'Follow'}</button
					>
				{/if}
			</div>
		</div>
		<div class="w-full h-[1px] bg-slate-300 mt-4"></div>
	</div>
</div>
