<script lang="ts">
	import { newsManager } from '../stores/news-manager.svelte';
	import NewsItem from './news-item.svelte';

	const news = $derived(newsManager.news);
</script>

<div class="flex flex-col gap-4">
	{#each news as newsItem}
		<NewsItem {newsItem} />
	{/each}
</div>
