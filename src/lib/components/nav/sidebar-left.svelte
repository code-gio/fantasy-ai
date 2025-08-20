<script lang="ts">
	import NavMain from './nav-main.svelte';
	import NavSecondary from './nav-secondary.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import UserNav from './nav-user.svelte';
	import InnerShadowTopIcon from '@tabler/icons-svelte/icons/inner-shadow-top';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root class="border-r-0" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<InnerShadowTopIcon class="!size-5" />
							<span class="text-base font-semibold">Fantasy AI Hub</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain />

		<NavSecondary class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<UserNav />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
