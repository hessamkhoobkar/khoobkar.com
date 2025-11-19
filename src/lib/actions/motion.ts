import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin only in browser to avoid SSR issues
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

type ScrubValue = boolean | number;

export interface ParallaxOptions {
	speed?: number;
	axis?: 'x' | 'y';
	from?: number;
	to?: number;
	start?: string;
	end?: string;
	scrub?: ScrubValue;
	ease?: string;
}

const defaultParallax: Required<Omit<ParallaxOptions, 'scrub'>> & { scrub: ScrubValue } = {
	speed: 0.6,
	axis: 'y',
	from: -16,
	to: 16,
	start: 'top bottom',
	end: 'bottom top',
	ease: 'none',
	scrub: true
};

function resolveParallaxConfig(options: ParallaxOptions = {}) {
	const config = { ...defaultParallax, ...options };
	const distance = Math.abs(config.to - config.from);

	// Automatically scale distance by speed when from/to not explicitly provided.
	if (options.from === undefined || options.to === undefined) {
		const base = 32 * config.speed;
		config.from = options.from ?? -base;
		config.to = options.to ?? base;
	}

	// Gentle easing by default for subtle motion.
	if (!options.ease && distance > 0) {
		config.ease = distance > 80 ? 'power2.out' : 'power1.out';
	}

	return config;
}

export function parallax(node: HTMLElement, options: ParallaxOptions = {}) {
	if (typeof window === 'undefined') {
		return {
			update() {
				/* noop on server */
			},
			destroy() {
				/* noop on server */
			}
		};
	}

	let animation: gsap.core.Tween | null = null;
	let config = resolveParallaxConfig(options);
	let ctx = gsap.context(() => {}, node);

	function createAnimation() {
		ctx.add(() => {
			animation?.kill();

			const props = config.axis === 'x' ? { x: config.from } : { y: config.from };
			gsap.set(node, props);

			animation = gsap.to(node, {
				ease: config.ease,
				...(config.axis === 'x' ? { x: config.to } : { y: config.to }),
				scrollTrigger: {
					trigger: node,
					start: config.start,
					end: config.end,
					scrub: config.scrub,
					invalidateOnRefresh: true
				}
			});
		});
	}

	createAnimation();

	return {
		update(newOptions: ParallaxOptions = {}) {
			config = resolveParallaxConfig(newOptions);
			ctx.revert();
			ctx = gsap.context(() => {}, node);
			createAnimation();
		},
		destroy() {
			animation?.kill();
			ctx.revert();
		}
	};
}

export interface ScrollAtmosphereOptions {
	target?: HTMLElement | (() => HTMLElement | null);
	property?: string;
	from?: string | number;
	to?: string | number;
	start?: string;
	end?: string;
	ease?: string;
	scrub?: ScrubValue;
	pin?: boolean;
	onEnter?: () => void;
	onLeave?: () => void;
	onUpdate?: (self: ScrollTrigger) => void;
}

const defaultAtmosphere: Required<
	Omit<ScrollAtmosphereOptions, 'target' | 'onEnter' | 'onLeave' | 'onUpdate'>
> = {
	property: 'backgroundColor',
	from: 'var(--surface-start, rgba(10,10,12,0.96))',
	to: 'var(--surface-end, rgba(6,6,8,0.98))',
	start: 'top bottom',
	end: 'bottom top',
	ease: 'power1.inOut',
	scrub: 0.6,
	pin: false
};

function resolveTarget(targetOption: ScrollAtmosphereOptions['target']) {
	if (typeof targetOption === 'function') {
		return targetOption() ?? null;
	}
	if (targetOption) return targetOption;
	return document.querySelector<HTMLElement>('[data-scroll-atmosphere-root]') ?? document.body;
}

export function scrollAtmosphere(node: HTMLElement, options: ScrollAtmosphereOptions = {}) {
	if (typeof window === 'undefined') {
		return {
			update() {
				/* noop on server */
			},
			destroy() {
				/* noop on server */
			}
		};
	}

	let config = { ...defaultAtmosphere, ...options };
	let target = resolveTarget(config.target);
	let animation: gsap.core.Tween | null = null;

	function init() {
		target = resolveTarget(config.target);

		if (!target) return;

		animation?.kill();

		animation = gsap.fromTo(
			target,
			{ [config.property]: config.from },
			{
				[config.property]: config.to,
				ease: config.ease,
				scrollTrigger: {
					trigger: node,
					start: config.start,
					end: config.end,
					scrub: config.scrub,
					pin: config.pin,
					onEnter: config.onEnter,
					onLeave: config.onLeave,
					onUpdate: config.onUpdate,
					invalidateOnRefresh: true
				}
			}
		);
	}

	init();

	return {
		update(newOptions: ScrollAtmosphereOptions = {}) {
			config = { ...defaultAtmosphere, ...newOptions };
			init();
		},
		destroy() {
			animation?.kill();
		}
	};
}

export interface DepthFadeOptions {
	start?: string;
	end?: string;
	from?: gsap.TweenVars;
	to?: gsap.TweenVars;
	scrub?: ScrubValue;
}

const defaultDepthFade: Required<Omit<DepthFadeOptions, 'from' | 'to'>> & {
	from: gsap.TweenVars;
	to: gsap.TweenVars;
} = {
	start: 'top 85%',
	end: 'bottom 35%',
	scrub: 0.4,
	from: {
		opacity: 0,
		y: 48,
		filter: 'blur(10px)'
	},
	to: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)'
	}
};

export function depthFade(node: HTMLElement, options: DepthFadeOptions = {}) {
	if (typeof window === 'undefined') {
		return {
			update() {
				/* noop on server */
			},
			destroy() {
				/* noop on server */
			}
		};
	}

	let config: typeof defaultDepthFade & DepthFadeOptions = {
		...defaultDepthFade,
		...options,
		from: { ...defaultDepthFade.from, ...(options.from || {}) },
		to: { ...defaultDepthFade.to, ...(options.to || {}) }
	};
	let animation: gsap.core.Tween | null = null;

	function init() {
		animation?.kill();

		animation = gsap.fromTo(node, config.from, {
			...config.to,
			scrollTrigger: {
				trigger: node,
				start: config.start,
				end: config.end,
				scrub: config.scrub,
				invalidateOnRefresh: true
			}
		});
	}

	init();

	return {
		update(newOptions: DepthFadeOptions = {}) {
			config = {
				...defaultDepthFade,
				...newOptions,
				from: { ...defaultDepthFade.from, ...(newOptions.from || {}) },
				to: { ...defaultDepthFade.to, ...(newOptions.to || {}) }
			};
			init();
		},
		destroy() {
			animation?.kill();
		}
	};
}
