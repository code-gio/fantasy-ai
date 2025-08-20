<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import { FirebaseApp } from 'svelte-firekit';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="h-dvh">
	<Toaster />
	<ModeWatcher />
	<FirebaseApp>
		{@render children?.()}
	</FirebaseApp>
</div>
