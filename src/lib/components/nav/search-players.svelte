<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import SearchIcon from '@tabler/icons-svelte/icons/search';
</script>

<div class="relative w-full">
	<SearchIcon class="absolute top-1/2 left-2 size-5 -translate-y-1/2" />
	<Input placeholder="Search Players" class="pl-8" />
</div>
