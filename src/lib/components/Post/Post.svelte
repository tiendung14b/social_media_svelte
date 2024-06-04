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

	let { author, content, data_created, date_updated, id, images } = {
		author: {
			avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
			name: 'John Doe'
		},
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam',
		data_created: '2021-10-10',
		date_updated: '2021-10-10',
		id: 1,
		images: [
			'https://media.myshows.me/shows/1920/1/91/191f7ccd81934473deececa3ea60b7ef.jpg',
			'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/447216802_762015789470541_5723035503364349941_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFoWovkbd0HI9Fc6xf0PDF3JaOE7AIckqMlo4TsAhySo-oIU33Y6URl7I5PpdhC880Wew9h--UoSUtk40q3XzIf&_nc_ohc=OcvmoayejsYQ7kNvgFvLcd1&_nc_ht=scontent.fhan2-5.fna&oh=00_AYBR0UGCa86em6cROjKjjyxko8iUCR2AbUi5KvlJ8FYPXg&oe=66645BA2'
		]
	};
</script>

<div class="flex flex-col gap-4 w-[95%] bg-white py-4 px-4 shadow-lg rounded-lg">
	<div class="flex items-center gap-4">
		<img src={author.avatar} alt="" class="w-12 h-12 rounded-full" />
		<div>
			<p class="font-bold">{author.name}</p>
			<div class="flex gap-2">
				<p class="text-gray-500 text-sm">{data_created}</p>
				{#if date_updated !== null && date_updated !== undefined}
					<p class="text-gray-500 text-sm">{`(edited at: ${date_updated})`}</p>
				{/if}
			</div>
		</div>
	</div>
	<p>{content}</p>
	<swiper-container class="flex gap-4 w-full">
		{#each images as image}
			<swiper-slide
				><img src={image} alt="" class="h-72 w-full rounded-sm object-cover" /></swiper-slide
			>
		{/each}
	</swiper-container>
	<hr />
	<div class="flex gap-4 relative">
		<img src={local_user.profileImageUrl} alt="" class="size-10 rounded-full object-cover" />
		<input
			bind:value={cmtNotEmpty}
			class="flex-grow pl-4 pr-20 outline-none focus:border-none bg-slate-200 rounded-full"
			type="text"
			placeholder={`Comment as ${local_user.first_name + ' ' + local_user.last_name}`}
		/>
		{#if cmtNotEmpty !== ''}
			<p class="absolute right-7 top-1/2 -translate-y-1/2">Send</p>
		{/if}
	</div>
</div>
