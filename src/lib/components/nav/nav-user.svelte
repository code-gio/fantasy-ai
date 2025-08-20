<script lang="ts">
	import DotsVerticalIcon from '@tabler/icons-svelte/icons/dots-vertical';
	import LogoutIcon from '@tabler/icons-svelte/icons/logout';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { firekitUser, firekitAuth } from 'svelte-firekit';
	import { getInitials } from '$lib/utils';
	import { userNav } from '$lib/config';
	const sidebar = Sidebar.useSidebar();
	import { goto } from '$app/navigation';

	let user = $derived(firekitUser.user);

	async function handleLogout() {
		goto('/dashboard');
		await firekitAuth.signOut();
	}
</script>

{#if user}
	<Sidebar.Menu>
		<Sidebar.MenuItem>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton
							{...props}
							size="lg"
							class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar.Root class="size-8 rounded-lg ">
								<Avatar.Image src={user.photoURL} alt={user.displayName} />
								<Avatar.Fallback class="rounded-lg">
									{getInitials(user.displayName)}
								</Avatar.Fallback>
							</Avatar.Root>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-medium">{user.displayName}</span>
								<span class="truncate text-xs text-muted-foreground">
									{user.email}
								</span>
							</div>
							<DotsVerticalIcon class="ml-auto size-4" />
						</Sidebar.MenuButton>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					class="w-(--bits-dropdown-menu-anchor-width) min-w-62 rounded-lg"
					side={sidebar.isMobile ? 'bottom' : 'right'}
					align="end"
					sideOffset={4}
				>
					<DropdownMenu.Label class="p-0 font-normal">
						<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
							<Avatar.Root class="size-8 rounded-lg">
								<Avatar.Image src={user.photoURL} alt={user.displayName} />
								<Avatar.Fallback class="rounded-lg">
									{getInitials(user.displayName)}
								</Avatar.Fallback>
							</Avatar.Root>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-medium">{user.displayName}</span>
								<span class="truncate text-xs text-muted-foreground">
									{user.email}
								</span>
							</div>
						</div>
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						{#each userNav as item}
							<DropdownMenu.Item>
								<a href={item.url} class="flex items-center gap-2">
									<item.icon />
									{item.title}
								</a>
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Item onclick={handleLogout}>
						<LogoutIcon />
						Log out
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
{/if}
