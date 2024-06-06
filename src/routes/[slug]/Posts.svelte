<script>
	export let user = {};
	export let posts = [];
	export let isMyPage = false;
	export let openUploadPostPopup = () => {};
	export let getImages = () => {};
	import Post from '../../lib/components/Post/Post.svelte';
</script>

<div class="mx-auto w-4/5 overflow-hidden">
	<div>
		<div class="grid grid-cols-10">
			<div class="col-span-4 sticky">
				<div class="flex flex-col gap-5 w-full bg-white shadow-lg rounded-md py-4 px-4">
					{#if isMyPage}
						<div class="flex items-center justify-center gap-4 w-full">
							<img
								src={user.profileImageUrl}
								alt=""
								class="size-12 shrink-0 rounded-full object-cover"
							/>
							<input
								readonly
								on:click={openUploadPostPopup}
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
					{#if user?.follower !== undefined}
						<div class="flex gap-2">
							<strong class="font-bold">Followed by </strong>
							<p class="m">{user?.follower?.length} users</p>
						</div>
					{/if}
					{#if user?.following !== undefined}
						<div class="flex gap-2">
							<strong class="font-bold">Following </strong>
							<p class="m">{user?.following?.length} users</p>
						</div>
					{/if}

					{#if user.location !== null}
						<div>
							<strong class="font-bold">Location</strong>
							<p class="mt-2">{user.location}</p>
						</div>
					{/if}
				</div>
				<div class="flex flex-col gap-2 w-full bg-white shadow-lg rounded-md py-4 px-4 mt-4">
					{#if user.bio !== null}
						<strong class="font-bold">About</strong>
						<p class="mt-2">{user.bio}</p>
					{/if}
				</div>
				<div class="flex flex-col gap-4 w-full bg-white shadow-lg rounded-md py-4 px-4 mt-4">
					<div class="flex justify-between items-baseline">
						<strong class="font-bold text-[20px]">Photos</strong>
						<span>View more</span>
					</div>
					<div class="grid grid-cols-3 grid-rows-3 w-full gap-1">
						{#each getImages(posts).slice(0, 9) as image}
							<img src={image} alt="" class="w-full aspect-square object-cover" />
						{/each}
					</div>
				</div>
			</div>
			<!-- right side -->
			<div class="col-span-6 flex flex-col gap-3 items-end">
				{#each posts as post}
					<Post {post} />
				{/each}
			</div>
		</div>
	</div>
</div>
