import { firekitCollection, firekitDoc, firekitUser } from 'svelte-firekit';
import type { NewsItem } from '../types/news';
import { query, orderBy, limit } from 'firebase/firestore';

class NewsManager {
	private static instance: NewsManager;
	private user = $derived(firekitUser.user);
	private COLLECTION = 'news';
	private newsCollection = $derived(
		firekitCollection<NewsItem>(this.COLLECTION, [orderBy('updated', 'desc')])
	);

	public static getInstance(): NewsManager {
		if (!NewsManager.instance) {
			NewsManager.instance = new NewsManager();
		}
		return NewsManager.instance;
	}

	get news() {
		return this.newsCollection.data ?? [];
	}
}

export const newsManager = NewsManager.getInstance();
