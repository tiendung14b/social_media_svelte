<script>
	export let data;

	const { author, text, date_created, date_updated, id } = data;
</script>

<div>
	<div class="flex items-start gap-4">
		<a href="/{author.username !== null ? author.username : `profile?id=${author.id}`}"
			><img src={author.profileImageUrl} alt="" class="size-10 rounded-full object-cover" /></a
		>
		<div class="flex flex-col gap-1 bg-slate-200 rounded-lg py-2 px-2">
			<a href="/{author.username}" class="font-bold text-[14px]"
				>{author.first_name + ' ' + author.last_name}</a
			>
			<p>{text}</p>
		</div>
	</div>
</div>
