<script lang="ts">
	import { onMount } from 'svelte';
	import { Send, CircleCheck, CircleAlert, LoaderCircle, Shield } from '@lucide/svelte';

	// Props for pre-filling subject
	interface Props {
		prefillSubject?: string;
	}
	let { prefillSubject = undefined }: Props = $props();

	// Form state
	let form: HTMLFormElement;
	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	// Check for success parameter in URL (Formspree redirect) - client-side only
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get('success') === 'true') {
			submitStatus = 'success';
			// Clean URL
			window.history.replaceState({}, '', window.location.pathname);
		}
	});

	// Form fields state
	let name = $state('');
	let email = $state('');
	let subject = $state(prefillSubject || '');
	let message = $state('');

	// React to prefillSubject changes
	$effect(() => {
		if (prefillSubject) {
			subject = prefillSubject;
		}
	});

	// Honeypot fields (hidden from users, visible to bots)
	// Using obscure names to prevent auto-fill
	let _hp_url = $state(''); // Hidden honeypot field (url)
	let _hp_tel = $state(''); // Hidden honeypot field (tel)

	// Field errors
	let nameError = $state('');
	let emailError = $state('');
	let subjectError = $state('');
	let messageError = $state('');

	// Character counter
	const MAX_MESSAGE_LENGTH = 2000;
	let messageLength = $derived(message.length);

	// Subject options
	const subjectOptions = [
		{ value: '', label: 'Select a topic...', disabled: true },
		{ value: 'full-time', label: 'Full-Time Opportunity' },
		{ value: 'freelance', label: 'Freelance Project' },
		{ value: 'collaboration', label: 'Collaboration' },
		{ value: 'general', label: 'General Inquiry' }
	];

	// Custom dropdown state
	let isDropdownOpen = $state(false);
	let dropdownButton: HTMLButtonElement;
	let dropdownWrapper: HTMLDivElement;
	let selectedLabel = $derived(
		subjectOptions.find((opt) => opt.value === subject)?.label || 'Select a topic...'
	);

	// Handle keyboard navigation for dropdown
	function handleDropdownKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			isDropdownOpen = false;
			dropdownButton?.focus();
		} else if (e.key === 'Enter' || e.key === ' ') {
			if (!isDropdownOpen) {
				e.preventDefault();
				isDropdownOpen = true;
			}
		}
	}

	// Close dropdown when clicking outside
	$effect(() => {
		if (isDropdownOpen && dropdownWrapper) {
			function handleClickOutside(event: MouseEvent) {
				if (dropdownWrapper && !dropdownWrapper.contains(event.target as Node)) {
					isDropdownOpen = false;
				}
			}
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	});

	// Validation functions
	function validateName(name: string): string {
		if (!name.trim()) {
			return 'Name is required';
		}
		if (name.trim().length < 2) {
			return 'Name must be at least 2 characters';
		}
		if (name.trim().length > 100) {
			return 'Name must be less than 100 characters';
		}
		return '';
	}

	function validateEmail(email: string): string {
		if (!email.trim()) {
			return 'Email is required';
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return 'Please enter a valid email address';
		}
		return '';
	}

	function validateSubject(subject: string): string {
		if (!subject) {
			return 'Please select a topic';
		}
		return '';
	}

	function validateMessage(message: string): string {
		if (!message.trim()) {
			return 'Message is required';
		}
		if (message.trim().length < 20) {
			return 'Message must be at least 20 characters';
		}
		if (message.length > MAX_MESSAGE_LENGTH) {
			return `Message must be less than ${MAX_MESSAGE_LENGTH} characters`;
		}
		return '';
	}

	// Validate all fields
	function validateForm(): boolean {
		let isValid = true;

		nameError = validateName(name);
		emailError = validateEmail(email);
		subjectError = validateSubject(subject);
		messageError = validateMessage(message);

		if (nameError || emailError || subjectError || messageError) {
			isValid = false;
		}

		return isValid;
	}

	// Handle real-time validation on blur
	function handleNameBlur() {
		nameError = validateName(name);
	}

	function handleEmailBlur() {
		emailError = validateEmail(email);
	}

	function handleSubjectBlur() {
		subjectError = validateSubject(subject);
	}

	function handleMessageBlur() {
		messageError = validateMessage(message);
	}

	// Reset form
	function resetForm() {
		name = '';
		email = '';
		subject = prefillSubject || '';
		message = '';
		_hp_url = '';
		_hp_tel = '';
		nameError = '';
		emailError = '';
		subjectError = '';
		messageError = '';
		submitStatus = 'idle';
		errorMessage = '';
	}

	// Formspree endpoint - must be set via environment variable
	// For dev: set PUBLIC_FORMSPREE_ENDPOINT in .env.local
	// For production: set PUBLIC_FORMSPREE_ENDPOINT in Vercel environment variables
	const FORMSPREE_ENDPOINT = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT;

	// Handle form submission
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		// Prevent submission if already in success state
		if (submitStatus === 'success') {
			return;
		}

		// Reset previous errors
		errorMessage = '';
		submitStatus = 'idle';

		// Check if Formspree endpoint is configured
		if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.trim() === '') {
			submitStatus = 'error';
			errorMessage =
				'Form is not configured. Please set PUBLIC_FORMSPREE_ENDPOINT in .env.local for development or in Vercel environment variables for production.';

			return;
		}

		// Honeypot check - if filled, likely a bot (obscure field names prevent auto-fill)
		if (_hp_url || _hp_tel) {
			// Silently reject bot submissions
			return;
		}

		// Validate form before submission
		if (!validateForm()) {
			// Focus first error field
			const firstErrorElement =
				form.querySelector('.error') ||
				form.querySelector('input.error, select.error, textarea.error');
			if (firstErrorElement instanceof HTMLElement) {
				firstErrorElement.focus();
			}
			return;
		}

		// Submit to Formspree via fetch API
		isSubmitting = true;

		try {
			// Create FormData from form fields
			const formData = new FormData();
			formData.append('name', name.trim());
			formData.append('email', email.trim());
			formData.append('subject', subject.trim());
			formData.append('message', message.trim());
			formData.append('_next', `${window.location.origin}/contact?success=true`);

			// Submit to Formspree
			const response = await fetch(FORMSPREE_ENDPOINT, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json'
				}
			});

			// Parse response body (can only be read once)
			let data: any = {};
			try {
				const text = await response.text();
				if (text) {
					try {
						data = JSON.parse(text);
					} catch {
						// Not JSON, treat as success
						data = { success: true };
					}
				} else {
					data = { success: true };
				}
			} catch {
				// If we can't read response but status is OK, assume success
				if (response.ok) {
					data = { success: true };
				}
			}

			if (response.ok) {
				// Check if there's an error in the response body
				if (data.error || data.errors || (data.raw && data.raw.includes('error'))) {
					submitStatus = 'error';
					errorMessage =
						data.error ||
						data.errors?.map((e: any) => e.message || e).join(', ') ||
						'Failed to send message. Please try again.';
				} else {
					// Success - show success message and disable form
					submitStatus = 'success';
					// Don't reset form, just clear fields but keep form disabled

					// Update URL without reloading
					window.history.pushState({}, '', '/contact?success=true');
				}
			} else {
				// Handle HTTP errors (4xx, 5xx)
				submitStatus = 'error';
				errorMessage =
					data.error ||
					data.message ||
					data.errors?.map((e: any) => e.message || e).join(', ') ||
					`Failed to send message (Status: ${response.status}). Please try again later.`;
			}
		} catch (error: any) {
			// Network or other errors
			submitStatus = 'error';
			errorMessage = error.message || 'Network error. Please check your connection and try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form
	bind:this={form}
	onsubmit={handleSubmit}
	action={FORMSPREE_ENDPOINT}
	method="POST"
	enctype="application/x-www-form-urlencoded"
	class="contact-form"
	novalidate
	data-sveltekit-preload-data="off"
	aria-label="Contact form"
>
	<!-- Error Message -->
	{#if submitStatus === 'error' && errorMessage}
		<div
			role="alert"
			aria-live="assertive"
			class="error-message mb-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300"
		>
			<CircleAlert size={24} class="mt-0.5 flex-shrink-0" aria-hidden="true" />
			<div>
				<h3 class="mb-1 font-bold text-red-400">Error sending message</h3>
				<p class="text-sm">{errorMessage}</p>
			</div>
		</div>
	{/if}

	<div class="form-content-wrapper">
		<!-- Success Overlay -->
		{#if submitStatus === 'success'}
			<div role="alert" aria-live="polite" class="success-overlay">
				<div class="success-overlay-content">
					<CircleCheck size={48} class="mb-4 text-primary-400" aria-hidden="true" />
					<h3 class="mb-2 text-2xl font-bold text-primary-400">Message Received!</h3>
					<p class="text-lg text-surface-200">
						Thank you for reaching out. I'll reach out to you soon.
					</p>
				</div>
			</div>
		{/if}

		<div class="space-y-6" class:form-disabled={submitStatus === 'success'}>
			<!-- Formspree redirect URL (hidden field) -->
			<input type="hidden" name="_next" value="/contact?success=true" />

			<!-- Honeypot fields (hidden from users, visible to bots) -->
			<div class="sr-only" aria-hidden="true">
				<label for="_hp_url">URL (leave blank)</label>
				<input
					id="_hp_url"
					type="url"
					name="_hp_url"
					bind:value={_hp_url}
					tabindex="-1"
					autocomplete="off"
					data-form-type="other"
					aria-hidden="true"
					style="position:absolute;left:-9999px;width:1px;height:1px;"
				/>
				<label for="_hp_tel">Tel (leave blank)</label>
				<input
					id="_hp_tel"
					type="tel"
					name="_hp_tel"
					bind:value={_hp_tel}
					tabindex="-1"
					autocomplete="off"
					data-form-type="other"
					aria-hidden="true"
					style="position:absolute;left:-9999px;width:1px;height:1px;"
				/>
			</div>

			<!-- Name Field -->
			<div class="form-group">
				<label for="name" class="form-label">
					Name
					<span class="text-primary-400" aria-label="required">*</span>
				</label>
				<input
					id="name"
					type="text"
					name="name"
					bind:value={name}
					onblur={handleNameBlur}
					class="form-input"
					class:error={!!nameError}
					placeholder="Your full name"
					required
					aria-required="true"
					aria-invalid={nameError ? 'true' : 'false'}
					aria-describedby={nameError ? 'name-error' : undefined}
					autocomplete="name"
					aria-label="Your full name"
					disabled={submitStatus === 'success'}
				/>
				{#if nameError}
					<p id="name-error" class="form-error" role="alert" aria-live="polite">{nameError}</p>
				{/if}
			</div>

			<!-- Email Field -->
			<div class="form-group">
				<label for="email" class="form-label">
					Email
					<span class="text-primary-400" aria-label="required">*</span>
				</label>
				<input
					id="email"
					type="email"
					name="email"
					bind:value={email}
					onblur={handleEmailBlur}
					class="form-input"
					class:error={emailError}
					placeholder="your.email@example.com"
					required
					aria-required="true"
					aria-invalid={emailError ? 'true' : 'false'}
					aria-describedby={emailError ? 'email-error' : undefined}
					autocomplete="email"
					aria-label="Your email address"
					disabled={submitStatus === 'success'}
				/>
				{#if emailError}
					<p id="email-error" class="form-error" role="alert" aria-live="polite">{emailError}</p>
				{/if}
			</div>

			<!-- Subject Field -->
			<div class="form-group">
				<label for="subject" class="form-label">
					Topic
					<span class="text-primary-400" aria-label="required">*</span>
				</label>
				<!-- Hidden native select for form submission -->
				<select
					id="subject"
					name="subject"
					bind:value={subject}
					class="sr-only"
					required
					aria-hidden="true"
					tabindex="-1"
				>
					{#each subjectOptions as option}
						<option value={option.value} disabled={option.disabled}>{option.label}</option>
					{/each}
				</select>
				<!-- Custom dropdown -->
				<div bind:this={dropdownWrapper} class="custom-select-wrapper">
					<button
						type="button"
						bind:this={dropdownButton}
						onclick={() => {
							if (submitStatus !== 'success') {
								isDropdownOpen = !isDropdownOpen;
							}
						}}
						onkeydown={handleDropdownKeydown}
						class="custom-select-button form-input"
						class:error={!!subjectError}
						class:open={isDropdownOpen}
						aria-haspopup="listbox"
						aria-expanded={isDropdownOpen}
						aria-label="Select a topic for your inquiry"
						aria-describedby={subjectError ? 'subject-error' : undefined}
						disabled={submitStatus === 'success'}
					>
						<span class="custom-select-value">{selectedLabel}</span>
						<svg
							class="custom-select-arrow"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</button>
					{#if isDropdownOpen}
						<div
							class="custom-select-menu"
							role="listbox"
							tabindex="-1"
							onclick={(e) => e.stopPropagation()}
							onkeydown={(e) => {
								if (e.key === 'Escape') {
									isDropdownOpen = false;
									dropdownButton?.focus();
								}
							}}
						>
							{#each subjectOptions as option}
								<button
									type="button"
									role="option"
									class="custom-select-option"
									class:selected={subject === option.value}
									class:disabled={option.disabled}
									disabled={option.disabled}
									onclick={() => {
										if (!option.disabled) {
											subject = option.value;
											isDropdownOpen = false;
											dropdownButton?.focus();
											handleSubjectBlur();
										}
									}}
									aria-selected={subject === option.value}
								>
									{option.label}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				{#if subjectError}
					<p id="subject-error" class="form-error" role="alert" aria-live="polite">
						{subjectError}
					</p>
				{/if}
			</div>

			<!-- Message Field -->
			<div class="form-group">
				<label for="message" class="form-label">
					Message
					<span class="text-primary-400" aria-label="required">*</span>
				</label>
				<textarea
					id="message"
					name="message"
					bind:value={message}
					onblur={handleMessageBlur}
					class="form-input form-textarea"
					class:error={messageError}
					placeholder="Tell me about your project, timeline, budget, or just say hello..."
					rows="6"
					required
					aria-required="true"
					aria-invalid={messageError ? 'true' : 'false'}
					aria-describedby={messageError ? 'message-error message-counter' : 'message-counter'}
					aria-label="Your message"
					disabled={submitStatus === 'success'}>{message}</textarea
				>
				<div class="mt-1 flex items-center justify-between">
					{#if messageError}
						<p id="message-error" class="form-error" role="alert" aria-live="polite">
							{messageError}
						</p>
					{:else}
						<span></span>
					{/if}
					<span
						id="message-counter"
						class="text-xs text-surface-400"
						class:text-surface-300={messageLength > MAX_MESSAGE_LENGTH * 0.8}
						class:text-primary-400={messageLength > MAX_MESSAGE_LENGTH * 0.9}
						class:text-red-400={messageLength > MAX_MESSAGE_LENGTH}
						aria-live="polite"
					>
						{messageLength} / {MAX_MESSAGE_LENGTH}
					</span>
				</div>
			</div>

			<!-- Submit Button -->
			<button
				type="submit"
				class="form-submit"
				disabled={isSubmitting || submitStatus === 'success'}
				aria-busy={isSubmitting}
			>
				{#if isSubmitting}
					<LoaderCircle size={20} class="animate-spin" aria-hidden="true" />
					<span>Sending...</span>
				{:else}
					<Send size={20} aria-hidden="true" />
					<span>Send Message</span>
				{/if}
			</button>

			<!-- Privacy Note -->
			<p class="mt-4 text-center text-sm text-surface-400" aria-live="polite">
				<Shield size={14} class="mr-1 mb-0.5 inline" aria-hidden="true" />
				Your information is secure and will never be shared.
			</p>
		</div>
	</div>
</form>

<style>
	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-label {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-surface-200);
	}

	.form-input {
		width: 100%;
		border-radius: 0.5rem;
		border: 1px solid var(--color-surface-600);
		background-color: var(--color-surface-700);
		padding: 0.75rem 1rem;
		color: var(--color-surface-50);
		transition: all 0.2s;
	}

	.form-input::placeholder {
		color: var(--color-surface-500);
	}

	.form-input:focus {
		border-color: var(--color-primary-500);
		outline: none;
		box-shadow: 0 0 0 2px rgba(var(--color-primary-500), 0.2);
	}

	.form-input:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.form-input.error {
		border-color: rgb(239 68 68);
	}

	.form-input.error:focus {
		border-color: rgb(239 68 68);
		box-shadow: 0 0 0 2px rgba(239 68 68, 0.2);
	}

	.form-input:not(.error):hover {
		border-color: var(--color-surface-500);
	}

	.form-textarea {
		resize: vertical;
		min-height: 120px;
		font-family: inherit;
	}

	.form-error {
		margin-top: 0.25rem;
		font-size: 0.875rem;
		color: rgb(248 113 113);
	}

	.form-submit {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		border-radius: 0.5rem;
		background-color: var(--color-primary-600);
		padding: 1rem 1.5rem;
		font-weight: 700;
		color: var(--color-surface-950);
		transition: all 0.2s;
	}

	.form-submit:hover:not(:disabled) {
		transform: scale(1.05);
		background-color: var(--color-primary-500);
	}

	.form-submit:active:not(:disabled) {
		transform: scale(0.95);
	}

	.form-submit:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.form-submit:disabled:hover {
		transform: scale(1);
	}

	.form-submit:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-500);
	}

	/* Custom Select Dropdown */
	.custom-select-wrapper {
		position: relative;
		width: 100%;
	}

	.custom-select-button {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		cursor: pointer;
		text-align: left;
	}

	.custom-select-value {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.custom-select-arrow {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
		margin-left: 0.75rem;
		color: var(--color-primary-500);
		transition: transform 0.2s ease;
		pointer-events: none;
	}

	.custom-select-button.open .custom-select-arrow {
		transform: rotate(180deg);
	}

	.custom-select-menu {
		position: absolute;
		top: calc(100% + 0.25rem);
		left: 0;
		right: 0;
		z-index: 50;
		max-height: 16rem;
		overflow-y: auto;
		background-color: var(--color-surface-700);
		border: 1px solid var(--color-surface-600);
		border-radius: 0.5rem;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.3),
			0 4px 6px -2px rgba(0, 0, 0, 0.2);
		margin-top: 0.25rem;
		animation: dropdown-fade-in 0.15s ease-out;
	}

	@keyframes dropdown-fade-in {
		from {
			opacity: 0;
			transform: translateY(-0.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.custom-select-option {
		display: block;
		width: 100%;
		padding: 0.75rem 1rem;
		text-align: left;
		background-color: transparent;
		color: var(--color-surface-50);
		border: none;
		cursor: pointer;
		transition: all 0.15s ease;
		font-size: inherit;
		font-family: inherit;
	}

	.custom-select-option:first-child {
		border-radius: 0.5rem 0.5rem 0 0;
	}

	.custom-select-option:last-child {
		border-radius: 0 0 0.5rem 0.5rem;
	}

	.custom-select-option:not(.disabled):hover {
		background-color: var(--color-primary-500) !important;
		color: var(--color-surface-950) !important;
	}

	.custom-select-option:not(.disabled):focus {
		background-color: var(--color-primary-600);
		color: var(--color-surface-950);
		outline: none;
	}

	.custom-select-option.selected {
		background-color: var(--color-primary-600);
		color: var(--color-surface-950);
		font-weight: 600;
	}

	.custom-select-option.disabled {
		color: var(--color-surface-500);
		cursor: not-allowed;
		opacity: 0.6;
	}

	.custom-select-option.disabled:hover {
		background-color: transparent;
		color: var(--color-surface-500);
	}

	/* Animations */
	.error-message {
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Focus visible improvements */
	.form-input:focus-visible {
		box-shadow:
			0 0 0 2px rgba(var(--color-primary-500), 0.2),
			0 0 0 4px var(--color-surface-900);
	}

	/* Screen reader only class */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	/* Form content wrapper */
	.form-content-wrapper {
		position: relative;
	}

	/* Success overlay */
	.success-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-surface-900);
		opacity: 0.95;
		backdrop-filter: blur(8px);
		border-radius: 0.75rem;
		padding: 2rem;
		animation: overlay-fade-in 0.3s ease-out;
	}

	.success-overlay-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		max-width: 400px;
	}

	@keyframes overlay-fade-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* Form disabled state */
	.form-disabled {
		pointer-events: none;
		opacity: 0.6;
	}
</style>
