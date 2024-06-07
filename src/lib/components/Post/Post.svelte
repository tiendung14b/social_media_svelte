<script>
	import { register } from 'swiper/element/bundle';
	import { localUser } from '$lib/stores/localUser.js';

	let local_user = {};
	const localUserUnsub = localUser.subscribe((value) => {
		local_user = value;
	});
	let cmtNotEmpty = '';
	register();
	export let post;

	let { author, text, date_created, date_updated, id, images } = post;
</script>

<div class="flex flex-col relative gap-4 w-[96%] bg-white py-4 px-4 shadow-lg rounded-lg">
	<div class="flex items-center gap-4">
		<a href="/{author.username !== null ? author.username : `profile?id=${author.id}`}"
			><img src={author.profileImageUrl} alt="" class="w-12 h-12 rounded-full object-cover" /></a
		>
		<div>
			<a href="/{author.username}" class="font-bold">{author.first_name + ' ' + author.last_name}</a
			>
			<div class="flex gap-2">
				<p class="text-gray-500 text-sm">{date_created}</p>
				{#if date_updated !== null && date_updated !== undefined}
					<p class="text-gray-500 text-sm">{`(edited at: ${date_updated})`}</p>
				{/if}
			</div>
		</div>
	</div>
	{#if text !== ''}
		<p class="">{text}</p>
	{/if}
	<swiper-container class="flex gap-4 w-full">
		{#each images as image}
			<swiper-slide
				><img src={image} alt="" class="h-72 w-full rounded-sm object-cover" /></swiper-slide
			>
		{/each}
	</swiper-container>
	<hr />
	<div class="flex gap-4 relative">
		<img src={local_user?.profileImageUrl} alt="" class="size-10 rounded-full object-cover" />
		<input
			bind:value={cmtNotEmpty}
			class="flex-grow pl-4 pr-20 outline-none focus:border-none bg-slate-200 rounded-full"
			type="text"
			placeholder={`Comment as ${local_user?.first_name + ' ' + local_user?.last_name}`}
		/>
		{#if cmtNotEmpty !== ''}
			<p class="absolute right-7 top-1/2 -translate-y-1/2">Send</p>
		{/if}
	</div>
</div>
