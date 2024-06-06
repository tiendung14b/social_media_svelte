<script>
	export let user = {};
	export let getImages = () => {};
</script>

<div class="mx-auto w-4/5 overflow-hidden">
	<div class="w-full bg-white shadow-lg rounded-md p-4">
		<strong class="font-bold text-[20px] text-[#FF204E]">{user.last_name}'s photos</strong>
		<div class="grid grid-cols-5 gap-3 mt-4">
			{#each getImages() as image}
				<img src={image} alt="" class="object-cover aspect-square w-full rounded-md" />
			{/each}
		</div>
	</div>
</div>
