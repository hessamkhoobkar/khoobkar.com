<script lang="ts">
	import MyImage from '@/assets/images/me-welcoming.webp';
	import Dribbble from '@/assets/icons/Dribbble.svelte';
	import Gmail from '@/assets/icons/Gmail.svelte';
	import Linkedin from '@/assets/icons/Linkedin.svelte';
	import Telegram from '@/assets/icons/Telegram.svelte';
	import Whatsapp from '@/assets/icons/Whatsapp.svelte';
	import PageHero from '@/components/layout/PageHero.svelte';
	import { fade } from 'svelte/transition';

	const linkData = [
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/hessam-khoobkar/', icon: Linkedin },
		{ label: 'Dribbble', href: 'https://dribbble.com/hessam_khoobkar', icon: Dribbble },
		{ label: 'Telegram', href: 'https://t.me/AmirhessamKhan', icon: Telegram },
		{ label: 'WhatsApp', href: 'https://wa.me/9196230597', icon: Whatsapp },
		{ label: 'Gmail address', href: 'mailto:amirhessam.dev@gmail.com', icon: Gmail }
	];

	let tooltipDisplay: boolean = false;
</script>

<div class="w-full flex flex-col justify-start items-start xl:gap-12">
	<!-- Hero -->
	<PageHero variant="primary">
		<div class="p-6 md:p-10 md:pt-8 max-w-4xl font-medium mb-12">
			<h2 class="text-5xl font-black mb-4">Welcome to the contact page</h2>
			<p class="mb-4">
				I'm thrilled that you're interested in getting in touch. Whether you have a question, a
				collaboration idea, or simply want to say hello, I'd love to hear from you. Communication is
				key, and I'm here to ensure that connecting with me is easy and convenient.
			</p>
			<p class="mb-4">
				I value your feedback, suggestions, and ideas, so please don't hesitate to share them. Your
				input helps me continually improve and create content that resonates with you.
			</p>
			<p>
				Thank you for taking the time to visit my website and explore what I have to offer. I'm
				excited to connect with you and look forward to hearing from you soon!
			</p>
		</div>
	</PageHero>

	<!-- Body -->
	<div class="w-full mt-4 xl:p-8">
		<div
			class="flex flex-col xl:flex-row justify-start items-stretch gap-4 w-full xl:-mt-40 text-gray-400 font-medium"
		>
			<div class="bg-gray-800 border border-gray-700 w-full xl:w-1/2 p-4 rounded-2xl">
				<form
					id="fs-frm"
					name="simple-contact-form"
					method="post"
					class="flex flex-col justify-start items-start pt-1 gap-6 w-full h-full"
				>
					<div class="flex flex-col xl:flex-row justify-start items-start gap-6 w-full">
						<div class="flex flex-col justify-start items-start gap-2 w-full">
							<label for="full-name">Full Name</label>
							<input
								class="input"
								type="text"
								name="name"
								id="full-name"
								placeholder="First and Last"
							/>
						</div>
						<div class="flex flex-col justify-start items-start gap-2 w-full">
							<label for="email-address">Email Address</label>
							<input
								class="input"
								type="email"
								name="_replyto"
								id="email-address"
								placeholder="email@domain.tld"
							/>
						</div>
					</div>
					<div class="flex flex-col justify-start items-start gap-2 w-full">
						<label for="subject">Subject</label>
						<input
							class="input"
							type="text"
							name="subject"
							id="subject"
							placeholder="Your message subject"
						/>
					</div>

					<div class="flex flex-col justify-start items-start gap-2 w-full grow">
						<label for="message">Message</label>
						<textarea
							class="input grow"
							name="message"
							id="message"
							placeholder="Type your message here. Your feedback is valuable to me and I will respond as soon as possible."
						/>
					</div>
					<div class="w-full relative">
						<input
							class="bg-gradient-to-br from-primary-500 to-tertiary-500 border-primary-600 flex justify-center items-center rounded-xl w-full py-5 text-gray-900 font-bold cursor-pointer mt-4 disabled:cursor-not-allowed"
							type="submit"
							value="Send Message"
							disabled
							on:mouseenter={() => {
								tooltipDisplay = true;
							}}
							on:mouseleave={() => {
								tooltipDisplay = false;
							}}
						/>
						{#if tooltipDisplay}
							<div
								transition:fade|global
								class="absolute -top-[90%] left-0 bg-gray-700 p-4 rounded-2xl shadow-lg w-3/4"
							>
								<p class="text-xs text-primary-500">
									Unfortunately, the contact form database is down and not accessible at the moment.
									Please get in touch with me via email or social media.
								</p>
								<div class="absolute triangle" />
							</div>
						{/if}
					</div>
				</form>
			</div>
			<div class="w-full xl:w-1/2 flex flex-col justify-start items-start gap-4">
				<div class="bg-gray-800 border border-gray-700 w-full p-4 rounded-2xl">
					<img class="rounded-xl" src={MyImage} alt="" />
				</div>
				<div class="bg-gray-800 border border-gray-700 w-full p-4 rounded-2xl">
					<p class="mb-4">
						The king had recently lost his wife and son during childbirth and was thoroughly
						depressed, crying himself to sleep every night. He sought out a ring that would cheer
						his spirits, appease his suffering.
					</p>

					<p>
						People from all over tried to help, but nothing of importance resonated with king. Then,
						the scholar, now not so young, was sought out to advise the king and perhaps suggest a
						phrase. Shortly thereafter, a ring appeared from the scholar with a phrase inscribed
						inside of the gold and ruby ring:
						<span class="text-tertiary-500 capitalize font-bold"> this too shall pass </span>
					</p>
				</div>
			</div>
		</div>

		<div class="w-full py-8">
			<div class="w-full flex flex-row flex-wrap xl:flex-nowrap justify-start items-start gap-4">
				{#each linkData as { label, href, icon }}
					<a
						{href}
						class="bg-gray-800 border border-gray-700 max-xl:w-5/12 grow flex flex-col justify-center items-center py-8 rounded-2xl gap-3 hover:bg-gray-800 hover:border-primary-500 transition-all duration-200 ease-in-out group"
					>
						<svelte:component
							this={icon}
							size="32"
							class="opacity-30 group-hover:opacity-100 group-hover:text-primary-500 transition-all duration-200 ease-in-out"
						/>
						<span>{label}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.input {
		@apply w-full px-4 py-4 rounded-xl bg-gray-700 bg-opacity-70 border border-gray-600 transition-all duration-200 ease-in-out ring-0 outline-none text-white;
	}

	.input::placeholder {
		@apply text-gray-400;
	}

	.input:hover {
		@apply bg-opacity-90 border-primary-900;
	}

	.input:focus {
		@apply bg-opacity-90 border-primary-500 ring-0 outline-none;
	}

	.triangle {
		width: 0px;
		height: 0px;
		border-style: solid;
		border-width: 2rem 1.5rem 0 1.5rem;
		border-color: rgb(28, 32, 42) transparent transparent transparent;
	}
</style>
