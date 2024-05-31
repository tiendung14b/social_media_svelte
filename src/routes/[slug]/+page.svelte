<script>
	import { page } from '$app/stores';

	$: username = $page.params.slug;
	$: id = $page.url.searchParams.get('id');
</script>

<div></div>
