import type { NavItem, SocialLink, SidebarNav } from '$lib/types/nav';
import {
	IconLifebuoy,
	IconSend,
	IconSparkles,
	IconCreditCard,
	IconLayoutGrid,
	IconDashboard,
	IconUsers,
	IconBook,
	IconBell,
	IconUser,
	IconHistory,
	IconPhoto,
	IconSettings,
	IconApps
} from '@tabler/icons-svelte';

export const siteConfig = {
	title: 'Fantasy AI',
	description: 'Fantasy AI Hub',
	logo: '/logo.svg',
	logoDark: '/logo-white.svg',
	favicon: '/favicon.png'
};

export const socialLinks: SocialLink[] = [
	{
		title: 'mindhyv',
		url: 'https://www.linkedin.com/in/',
		icon: 'linkedin'
	}
];

export const sidebarNav: SidebarNav[] = [
	{
		title: 'Platform',
		items: [
			{ title: 'Dashboard', url: '/', icon: IconDashboard },
			{ title: 'Draft Assistant', url: '/draft', icon: IconSend },
			{ title: 'Rankings', url: '/rankings', icon: IconSparkles }
		]
	},
	{
		title: 'League',
		items: [
			{
				title: 'League Setup',
				url: '/league',
				icon: IconUser,
				items: [
					{ title: 'Scoring Rules', url: '/league/scoring' },
					{ title: 'Replacement Baselines', url: '/league/baselines' },
					{ title: 'Import League', url: '/league/import' }
				]
			},
			{
				title: 'Players',
				url: '/players',
				icon: IconUsers,
				items: [
					{ title: 'All Players', url: '/players' },
					{ title: 'Injuries & Status', url: '/players/injuries' },
					{ title: 'Consistency', url: '/players/consistency' }
				]
			},
			{
				title: 'Teams',
				url: '/teams',
				icon: IconApps,
				items: [
					{ title: 'Depth Charts', url: '/teams/depth-charts' },
					{ title: 'Offensive Line', url: '/teams/ol' },
					{ title: 'Team Context', url: '/teams/context' },
					{ title: 'Defense', url: '/teams/defense' }
				]
			}
		]
	},
	{
		title: 'Market',
		items: [
			{
				title: 'ADP & Market',
				url: '/market',
				icon: IconBook,
				items: [
					{ title: 'ADP Snapshots', url: '/market/adp' },
					{ title: 'Positional Runs', url: '/market/runs' },
					{ title: 'Availability Odds', url: '/market/odds' }
				]
			},
			{ title: 'News', url: '/news', icon: IconBell },
			{ title: 'Rookies & Prospects', url: '/rookies', icon: IconPhoto },
			{ title: 'Models & Projections', url: '/projections', icon: IconHistory }
		]
	}
];

export const navSecondary: NavItem[] = [
	{
		title: 'Support',
		url: '#',
		icon: IconLifebuoy
	},
	{
		title: 'Feedback',
		url: '#',
		icon: IconSend
	}
];

export const userNav = [
	{
		title: 'Upgrade to Pro',
		icon: IconSparkles,
		url: '/upgrade'
	},
	{
		title: 'Profile',
		icon: IconUser,
		url: '/profile'
	},
	{
		title: 'Billing',
		icon: IconCreditCard,
		url: '/billing'
	}
];
