<script lang="ts">
	import { firekitAuth } from 'svelte-firekit';
	import { firekitAnalytics } from 'svelte-firekit';

	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { signUpSchema } from '$lib/modules/auth/schemas/sign-up.js';
	import { toast } from 'svelte-sonner';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import Button from '$lib/components/ui/button/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { goto } from '$app/navigation';

	const data = defaults(valibot(signUpSchema));

	const form = superForm(data, {
		validators: valibot(signUpSchema),
		dataType: 'json',
		SPA: true,
		resetForm: false,
		clearOnSubmit: 'errors-and-message',
		async onUpdate({ form }) {
			if (!form.valid) return;
			try {
				const { data } = form;
				const { email, password, firstName, lastName } = data;
				const displayName = `${firstName} ${lastName}`;
				const result = await firekitAuth.registerWithEmail(email, password, displayName);
				if (result.user) {
					// Track sign-up conversion
					await firekitAnalytics.trackEvent('sign_up', {
						method: 'email',
						user_id: result.user.uid,
						email_domain: email.split('@')[1],
						has_display_name: !!displayName.trim(),
						page_location: '/sign-up'
					});

					// Set user properties for future tracking
					await firekitAnalytics.setUserProperties({
						user_type: 'new',
						signup_method: 'email',
						account_created_date: new Date().toISOString(),
						display_name: displayName
					});

					// Set user ID for cross-platform tracking
					await firekitAnalytics.setUserId(result.user.uid);
				}
				toast.success('Account created successfully');
				goto('/');
			} catch (error) {
				// Track sign-up failure
				await firekitAnalytics.trackEvent('sign_up_failed', {
					method: 'email',
					error_type: error instanceof Error ? error.name : 'unknown',
					page_location: '/sign-up'
				});

				if (error instanceof Error) {
					toast.error(error.message);
				} else {
					toast.error('An error occurred');
				}
			}
		}
	});

	const { form: formData, enhance } = form;

	// Track form interaction events
	async function trackFormInteraction(interactionType: string, fieldName?: string) {
		await firekitAnalytics.trackEvent('form_interaction', {
			form_name: 'sign_up_form',
			interaction_type: interactionType,
			field_name: fieldName,
			page_location: '/sign-up'
		});
	}
</script>

<form method="POST" use:enhance class="space-y-2">
	<div class="grid grid-cols-2 gap-4">
		<Form.Field {form} name="firstName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>First Name</Form.Label>
					<Input
						{...props}
						bind:value={$formData.firstName}
						placeholder="John"
						onfocus={() => trackFormInteraction('focus', 'firstName')}
						onblur={() => trackFormInteraction('blur', 'firstName')}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="lastName">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Last Name</Form.Label>
					<Input
						{...props}
						bind:value={$formData.lastName}
						placeholder="Smith"
						onfocus={() => trackFormInteraction('focus', 'lastName')}
						onblur={() => trackFormInteraction('blur', 'lastName')}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input
					{...props}
					bind:value={$formData.email}
					placeholder="you@email.com"
					onfocus={() => trackFormInteraction('focus', 'email')}
					onblur={() => trackFormInteraction('blur', 'email')}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input
					{...props}
					bind:value={$formData.password}
					placeholder="*********"
					type="password"
					onfocus={() => trackFormInteraction('focus', 'password')}
					onblur={() => trackFormInteraction('blur', 'password')}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="agreeToTerms">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>
					<Checkbox
						{...props}
						bind:checked={$formData.agreeToTerms}
						onCheckedChange={() => trackFormInteraction('checkbox_change', 'agreeToTerms')}
					/>

					By signing up, you agree to our
					<Button
						variant="link"
						href="https://app.termly.io/policy-viewer/policy.html?policyUUID=0e8bd91c-0128-4955-8f7e-e17b7f697a2a"
						class="p-0"
						target="_blank"
					>
						Terms and Conditions
					</Button>
				</Form.Label>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-4 w-full">Sign Up</Form.Button>
</form>
