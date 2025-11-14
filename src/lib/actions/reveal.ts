import { gsap } from 'gsap';

type StaggerVars = gsap.StaggerVars;
type TweenVars = gsap.TweenVars;

export interface RevealOptions {
	once?: boolean;
	threshold?: number;
	rootMargin?: string;
	from?: TweenVars;
	to?: TweenVars;
	childSelector?: string;
	stagger?: number | StaggerVars;
	delay?: number;
}

const defaultFrom: TweenVars = {
	opacity: 0,
	y: 48,
	rotateX: -8,
	filter: 'blur(6px)'
};

const defaultTo: TweenVars = {
	opacity: 1,
	y: 0,
	rotateX: 0,
	filter: 'blur(0px)',
	duration: 1.1,
	ease: 'power3.out'
};

const defaultConfig: Required<Omit<RevealOptions, 'from' | 'to'>> & {
	from: TweenVars;
	to: TweenVars;
} = {
	once: true,
	threshold: 0.5,
	rootMargin: '0px 0px -10% 0px',
	childSelector: '',
	stagger: 0.1,
	delay: 0,
	from: defaultFrom,
	to: defaultTo
};

function mergeConfig(options: RevealOptions = {}) {
	return {
		...defaultConfig,
		...options,
		from: { ...defaultFrom, ...(options.from || {}) },
		to: { ...defaultTo, ...(options.to || {}) }
	};
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
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

	let config = mergeConfig(options);
	let ctx = gsap.context(() => {}, node);
	let observer: IntersectionObserver | null = null;
	let hasAnimated = false;
	let targets: HTMLElement[] = [];

	function animateIn() {
		ctx.add(() => {
			const timelineTargets = targets.length ? targets : [node];
			gsap.to(timelineTargets, {
				...config.to,
				delay: config.delay,
				stagger: config.childSelector ? config.stagger : undefined,
				overwrite: true
			});
		});
	}

	function animateOut() {
		if (config.once) return;

		ctx.add(() => {
			const timelineTargets = targets.length ? targets : [node];
			gsap.to(timelineTargets, {
				...config.from,
				duration: 0.45,
				ease: 'power1.out',
				overwrite: true
			});
		});
	}

	function initTargets() {
		targets =
			config.childSelector && config.childSelector.length > 0
				? Array.from(node.querySelectorAll<HTMLElement>(config.childSelector))
				: [node];

		ctx.add(() => {
			gsap.set(targets, config.from);
		});
	}

	function initObserver() {
		if (observer) {
			observer.disconnect();
			observer = null;
		}

		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						if (!hasAnimated || !config.once) {
							animateIn();
							hasAnimated = true;
						}
						if (config.once && observer) {
							observer.unobserve(node);
						}
					} else {
						animateOut();
					}
				}
			},
			{
				threshold: config.threshold,
				rootMargin: config.rootMargin
			}
		);

		observer.observe(node);
	}

	function setup() {
		ctx.revert();
		ctx = gsap.context(() => {}, node);
		hasAnimated = false;
		initTargets();
		initObserver();
	}

	setup();

	return {
		update(newOptions: RevealOptions = {}) {
			config = mergeConfig(newOptions);
			setup();
		},
		destroy() {
			if (observer) {
				observer.disconnect();
				observer = null;
			}
			ctx.revert();
		}
	};
}
