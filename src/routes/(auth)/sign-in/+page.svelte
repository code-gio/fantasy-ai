<script lang="ts">
	import SignInWithGoogle from '$lib/modules/auth/components/google-sign-in.svelte';
	import SignInForm from '$lib/modules/auth/components/sign-in-form.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<Card.Root class="sm:w-[448px]">
	<Card.Header>
		<Card.Title class="text-center text-2xl">Sign in</Card.Title>
		<Card.Description class="text-center">
			<div>
				Don't have an account yet?
				<Button variant="link" href="/sign-up" class="p-0">Sign up here</Button>
			</div>
		</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-5">
		<SignInWithGoogle label="Sign in with" />

		<div
			class="before:muted-foreground after:muted-foreground flex items-center text-xs text-muted-foreground uppercase before:me-6 before:flex-1 before:border-t after:ms-6 after:flex-1 after:border-t dark:before:border-muted-foreground dark:after:border-muted-foreground"
		>
			Or
		</div>

		<SignInForm />
		<div class="flex justify-center">
			<Button variant="link" href="/" class="p-0">Back to home</Button>
		</div>
	</Card.Content>
</Card.Root>
