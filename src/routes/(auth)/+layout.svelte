<script>
	import { AuthGuard } from 'svelte-firekit';
	let { children } = $props();
</script>

<main
	class="flex h-[100dvh] flex-col items-center justify-center"
	style="background-image: url('/auth-bg.svg'); background-size: cover; background-position: center;"
>
	<AuthGuard redirectTo="/" requireAuth={false}>
		<div class="flex h-full w-full items-center justify-center">
			{@render children()}
		</div>
	</AuthGuard>
</main>
