import type { Timestamp } from 'firebase/firestore';

export interface NewsItem {
	newsId: number;
	source: string;
	updated: Timestamp;
	timeAgo: string;
	title: string;
	content: string;
	url: string;
	termsOfUse: string;
	author: string;
	categories: string;
	playerId: number;
	teamId: number;
	team: string;
	playerId2: number | null;
	teamId2: number | null;
	team2: string | null;
	originalSource: string;
	originalSourceUrl: string;
}
