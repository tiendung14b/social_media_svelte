<script>
	import instanceAxios from '$lib/api/instanceAxios.js';

	export let handleAfterUpload = () => {};
	export let id = '';

	let image;

	const handleChange = () => {
		const file = image.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const url = e.target.result;
			const formData = new FormData();
			console.log(file);
			formData.append('file', url);
			formData.append('api_key', '315326923829376');
			formData.append('upload_preset', 'magic_post_uet');
			instanceAxios
				.post('https://api.cloudinary.com/v1_1/magic_post_uet/image/upload', formData, {
					noRequiredAuth: true
				})
				.then((res) => {
					handleAfterUpload.apply(null, [res.url]);
				});
		};
		reader.readAsDataURL(file);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click={() => {
		document.querySelector(`#${id}`).click();
	}}
>
	<slot />
	<input {id} type="file" class="hidden" bind:this={image} on:change={handleChange} />
</div>
