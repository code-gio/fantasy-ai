<script lang="ts">
	import type { NewsItem } from '../types/news';

	let { newsItem }: { newsItem: NewsItem } = $props();
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{newsItem.title}</Card.Title>
		<Card.Description>{newsItem.updated.toDate().toLocaleString()}</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>Card Content</p>
	</Card.Content>
	<Card.Footer>
		<p>Card Footer</p>
	</Card.Footer>
</Card.Root>
