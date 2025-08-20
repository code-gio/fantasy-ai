<script lang="ts">
	import { firekitAuth } from 'svelte-firekit';
	import { toast } from 'svelte-sonner';
	import { firekitAnalytics } from 'svelte-firekit';

	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	let { label = 'Sign in with' }: { label: string } = $props();

	async function signInWithGoogle() {
		try {
			// Track sign-in attempt
			await firekitAnalytics.trackEvent('sign_in_attempt', {
				method: 'google',
				page_location: window.location.pathname
			});

			const result = await firekitAuth.signInWithGoogle();
			if (result.user) {
				// Check if user is new by comparing creation time with current time
				const isNewUser =
					result.user.metadata.creationTime &&
					Date.now() - new Date(result.user.metadata.creationTime).getTime() < 5000;

				// Track successful sign-in
				await firekitAnalytics.trackEvent('sign_in', {
					method: 'google',
					user_id: result.user.uid,
					email_domain: result.user.email?.split('@')[1] || 'unknown',
					has_display_name: !!result.user.displayName,
					is_new_user: isNewUser,
					page_location: window.location.pathname
				});

				// Set user properties for future tracking
				await firekitAnalytics.setUserProperties({
					user_type: isNewUser ? 'new' : 'returning',
					signup_method: 'google',
					last_signin_date: new Date().toISOString(),
					display_name: result.user.displayName || '',
					email_verified: result.user.emailVerified || false
				});

				// Set user ID for cross-platform tracking
				await firekitAnalytics.setUserId(result.user.uid);

				// Track new user signup if this is a new user
				if (isNewUser) {
					await firekitAnalytics.trackEvent('sign_up', {
						method: 'google',
						user_id: result.user.uid,
						email_domain: result.user.email?.split('@')[1] || 'unknown',
						has_display_name: !!result.user.displayName,
						page_location: window.location.pathname
					});
				}
			}
			await goto('/');
		} catch (error) {
			// Track sign-in failure
			await firekitAnalytics.trackEvent('sign_in_failed', {
				method: 'google',
				error_type: error instanceof Error ? error.name : 'unknown',
				error_message: error instanceof Error ? error.message : 'Unknown error',
				page_location: window.location.pathname
			});

			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('An error occurred');
			}
		}
	}

	// Track button click for engagement
	async function trackButtonClick() {
		await firekitAnalytics.trackEvent('button_click', {
			button_name: 'google_sign_in',
			page_location: window.location.pathname
		});
	}
</script>

<Button
	onclick={() => {
		trackButtonClick();
		signInWithGoogle();
	}}
	class="w-full gap-2"
	variant="outline"
>
	<svg
		class="h-4 w-4 flex-shrink-0"
		width="33"
		height="32"
		viewBox="0 0 33 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clip-path="url(#clip0_4132_5805)">
			<path
				d="M32.2566 16.36C32.2566 15.04 32.1567 14.08 31.9171 13.08H16.9166V19.02H25.7251C25.5454 20.5 24.5866 22.72 22.4494 24.22L22.4294 24.42L27.1633 28.1L27.4828 28.14C30.5189 25.34 32.2566 21.22 32.2566 16.36Z"
				fill="#4285F4"
			/>
			<path
				d="M16.9166 32C21.231 32 24.8463 30.58 27.5028 28.12L22.4694 24.2C21.1111 25.14 19.3135 25.8 16.9366 25.8C12.7021 25.8 9.12677 23 7.84844 19.16L7.66867 19.18L2.71513 23L2.65521 23.18C5.2718 28.4 10.6648 32 16.9166 32Z"
				fill="#34A853"
			/>
			<path
				d="M7.82845 19.16C7.48889 18.16 7.28915 17.1 7.28915 16C7.28915 14.9 7.48889 13.84 7.80848 12.84V12.62L2.81499 8.73999L2.6552 8.81999C1.55663 10.98 0.937439 13.42 0.937439 16C0.937439 18.58 1.55663 21.02 2.63522 23.18L7.82845 19.16Z"
				fill="#FBBC05"
			/>
			<path
				d="M16.9166 6.18C19.9127 6.18 21.9501 7.48 23.0886 8.56L27.6027 4.16C24.8263 1.58 21.231 0 16.9166 0C10.6648 0 5.27181 3.6 2.63525 8.82L7.80851 12.84C9.10681 8.98 12.6821 6.18 16.9166 6.18Z"
				fill="#EB4335"
			/>
		</g>
		<defs>
			<clipPath id="clip0_4132_5805">
				<rect width="32" height="32" fill="white" transform="translate(0.937439)" />
			</clipPath>
		</defs>
	</svg>
	{label} Google
</Button>
