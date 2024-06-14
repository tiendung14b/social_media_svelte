<script>
	import { localUser } from '$lib/stores/localUser.js';
	import instanceAxios from '$lib/api/instanceAxios.js';
	import { createPost } from '$lib/api/post.js';

	export let onClose = () => {};
	export let onSubmit = () => {};
	let content = '';
	$: if (content.length > 356) content = content.slice(0, 356);
	let inputImages = null;
	let imageUrls = [];
	let uploading = false;

	$: textSize = content.length > 50 ? 16 : 24;
	$: data = {
		author: $localUser.id,
		text: content,
		images: ''
	};

	const handleLoadImages = () => {
		const files = inputImages.files;
		for (let i = 0; i < files.length && i < 4; i++) {
			const reader = new FileReader();
			reader.onload = (e) => {
				imageUrls = [...imageUrls, e.target.result];
			};
			reader.readAsDataURL(files[i]);
		}
	};

	const uploadImage = async (imageUrl) => {
		try {
			const formData = new FormData();
			formData.append('file', imageUrl);
			formData.append('api_key', '315326923829376');
			formData.append('upload_preset', 'magic_post_uet');
			let data = await instanceAxios.post(
				'https://api.cloudinary.com/v1_1/magic_post_uet/image/upload',
				formData,
				{
					noRequiredAuth: true
				}
			);
			return data.url;
		} catch (err) {
			console.log(err);
		}
	};

	const handleUploadPost = async () => {
		try {
			uploading = true;
			const uploads = await Promise.all(imageUrls.map((img) => uploadImage(img)));
			data.images = JSON.stringify(uploads);
			await createPost(data);
			await onSubmit();
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="absolute top-1/2 -translate-y-[45%] left-1/2 -translate-x-1/2 z-10 w-[45vw] max-w-[540px] px-4 py-6 rounded-lg bg-white shadow-lg"
>
	<div class="flex justify-between">
		<img src={$localUser.profileImageUrl} alt="" class="size-12 rounded-full object-cover" />
		<span on:click={onClose} class="cursor-pointer">cancel</span>
	</div>
	<textarea
		rows="6"
		placeholder="Yapping as u want"
		bind:value={content}
		name=""
		id=""
		class={`w-full text-justify mt-4 outline-none resize-none text-[${textSize}px]`}
	></textarea>
	<p class="text-right mt-2">{content.length}/356</p>
	<p class="mt-4">{`Add ${imageUrls.length}/4 images`}</p>
	<div class="flex gap-4 mt-4 w-full overflow-x-scroll">
		{#if imageUrls}
			{#each imageUrls as image}
				<div class="relative *:hover:block">
					<img src={image} alt="" class="h-24 w-20 rounded-md object-cover" />
					<div class="w-full h-full absolute top-0 left-0 hidden z-20 bg-[#0008] rounded-md">
						<div
							class="absolute top-[5%] right-[5%] bg-white rounded-full p-1 cursor-pointer"
							on:click={() => {
								imageUrls = imageUrls.filter((img) => img !== image);
							}}
						>
							<img src="/images/bin.png" alt="" class="size-4" />
						</div>
					</div>
				</div>
			{/each}
		{/if}
		<div
			class="p-5 bg-slate-200 rounded-md cursor-pointer h-24 flex items-center justify-center"
			on:click={() => {
				document.querySelector('#upload_post_images').click();
			}}
		>
			<img src="/images/add.png" alt="" class="size-12" />
		</div>
		<input
			bind:this={inputImages}
			id="upload_post_images"
			multiple
			type="file"
			class="hidden"
			on:change={handleLoadImages}
		/>
	</div>
	<!-- upload post button -->
	<div class="flex mt-4 w-full">
		<button
			on:click={handleUploadPost}
			disabled={content.length === 0 && imageUrls?.length === 0}
			class={`${!uploading && (content.length > 0 || imageUrls?.length) ? 'bg-[#ff204e] text-white' : 'bg-gray-200 text-black cursor-not-allowed'} w-full px-4 py-4 text-center rounded-md transition-all`}
		>
			{uploading ? 'Đợi xíu...' : 'Post'}
		</button>
	</div>
</div>
