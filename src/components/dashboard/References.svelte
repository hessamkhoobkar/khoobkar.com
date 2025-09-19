<script lang="ts">
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	const splideOptions = {
		fixedHeight: '16rem',
		gap: '1rem',
		pagination: false,
		arrows: false,
		rewind: true,
		autoplay: true,
		pauseOnHover: true,
		interval: 10000
	};

	interface Reference {
		name: string;
		company: string;
		position: string;
		quote: string;
		avatar: string;
	}

	const references: Reference[] = [
		{
			name: 'Vidhi Gupta',
			company: 'Coinhaven',
			position: 'Senior Product Manager',
			quote:
				"Hessam is one of the most valuable people I have ever met. Both smart and professional. Experienced, deadline-oriented, and intelligent person. He is well versed with the technologies and has the hunger to learn on the go. Hessam's background in UX also renders him with an eye for detail and an understanding of user needs. He is a very proactive and helpful person with strong leadership capabilities. Hessam knows how to make peaceful outcomes out of chaotic situations. He is well suited for a fast-changing environment and start-up culture. I highly recommend working with him.",
			avatar: 'https://khoobkar.com/avatars/1629895787085.jpeg'
		},
		{
			name: 'Yasaman Heydarzadeh',
			company: 'Coinhaven',
			position: 'Product Design Lead',
			quote:
				'Hessam is an exceptional Front End Lead with impressive technical skills and an eye for design. During his time at Coinhaven, Hessam consistently delivered outstanding results, with an unwavering commitment to quality and exceptional attention to detail. He is an excellent communicator and collaborator with strong leadership skills. I highly recommend Hessam for any front-end development role.',
			avatar: 'https://khoobkar.com/avatars/1684407792962.jpeg'
		},
		{
			name: 'Emmanuel Sunday',
			company: 'Coinhaven',
			position: 'Backend Lead',
			quote:
				'Hessam is above all, an engineer that has empathy and is a great leader. He’s profound expertise, vast knowledge base of software engineering and his wit, makes him the firehouse he is.',
			avatar: 'https://khoobkar.com/avatars/1681054339376.jpeg'
		},
		{
			name: 'Ksenia Berezina',
			company: '',
			position: 'Product Manager',
			quote:
				'Hessam is a very talented, experienced and knowledgable front end developer. He can handle very complex and challenging tasks under deadlines, his enthusiasm really shines through. But most importantly, Hessam is an amazing person! He is extremely professional, yet very friendly and helpful. Hessam is a great team lead as well, managing a team of developers through multiple successful releases. Overall, I cannot recommend Hessam enough!',
			avatar: 'https://khoobkar.com/avatars/1663246993150.jpeg'
		}
	];
</script>

<div class="col-span-1 md:col-span-6 xl:col-span-8">
	<div class="w-full relative bg-gray-800 shadow-lg shadow-gray-900 rounded-2xl p-6 pb-12">
		<h3
			class="text-lg mb-4 font-black bg-clip-text text-transparent bg-gradient-to-br from-primary-500 to-tertiary-500 uppercase"
		>
			Refrances and recomandatoins
		</h3>

		<Splide
			hasTrack={false}
			class="cursor-pointer"
			options={splideOptions}
			aria-label="refrances slider"
		>
			<SplideTrack>
				{#each references as { name, company, position, quote, avatar }}
					<SplideSlide class="flex flex-col justify-start items-start">
						<p class="mb-4">{quote}</p>
						<div class="flex justify-start items-center gap-4 mt-auto">
							<img src={avatar} alt={name} class="rounded-full w-12 h-12" />
							<div class="flex flex-col justify-start items-start">
								<span class="text-xl">{name}</span>
								<div class="text-sm flex justify-start items-center gap-2">
									<span class="text-gray-400">{position}</span>
									{#if company}
										<span class="text-gray-400">-</span>
										<span class="text-gray-400">{company}</span>
									{/if}
								</div>
							</div>
						</div>
					</SplideSlide>
				{/each}
			</SplideTrack>
			<div class="absolute -bottom-8 inset-x-0 flex flex-col">
				<div class="splide__progress">
					<div class="splide__progress__bar"></div>
				</div>
			</div>
		</Splide>
	</div>
</div>

<style lang="postcss">
	.splide__progress {
		@apply bg-gray-900 rounded-full p-1;
	}
	.splide__progress__bar {
		@apply h-2 bg-gradient-to-br from-primary-500 to-tertiary-500 rounded-full;
	}
</style>
