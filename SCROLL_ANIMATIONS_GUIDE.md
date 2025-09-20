# GSAP Scroll Smoothing & Animations Guide

This guide explains how to use the GSAP scroll smoothing and animation features that have been integrated into the Khoobkar website.

## Overview

The website now includes:

- **Global scroll smoothing** using GSAP ScrollSmoother
- **Scroll-triggered animations** for enhanced user experience
- **Mobile-optimized performance** with reduced effects on smaller screens
- **Parallax effects** for engaging visual elements

## Scroll Smoothing

The scroll smoothing is automatically applied to the entire website through the main layout. It provides:

- Smooth, buttery scrolling experience
- Reduced scroll smoothing on mobile devices for better performance
- Automatic resize handling
- Touch-optimized scrolling

### Configuration

The scroll smoothing can be customized in `src/routes/+layout.svelte`:

```svelte
<ScrollSmoother smooth={1.2} effects={true} smoothTouch={0.1}>
	<!-- Your content -->
</ScrollSmoother>
```

**Available props:**

- `smooth`: Smoothness factor (default: 1.2)
- `effects`: Enable scroll effects (default: true)
- `smoothTouch`: Touch scroll smoothness (default: 0.1)
- `normalizeScroll`: Normalize scroll behavior (default: true)
- `ignoreMobileResize`: Ignore mobile resize events (default: true)
- `autoResize`: Auto-resize handling (default: true)

## Scroll Animations

### Available Animation Classes

Add these classes to elements to trigger scroll animations:

#### 1. `animate-fade-in`

Fades in elements from bottom with scale effect:

```html
<div class="animate-fade-in">This content will fade in from the bottom</div>
```

#### 2. `animate-slide-left`

Slides elements in from the left:

```html
<div class="animate-slide-left">This content will slide in from the left</div>
```

#### 3. `animate-slide-right`

Slides elements in from the right:

```html
<div class="animate-slide-right">This content will slide in from the right</div>
```

#### 4. `animate-scale-in`

Scales elements in with a bounce effect:

```html
<div class="animate-scale-in">This content will scale in with bounce</div>
```

#### 5. `animate-stagger`

Animates child elements with stagger effect:

```html
<div class="animate-stagger">
	<div class="stagger-item">Item 1</div>
	<div class="stagger-item">Item 2</div>
	<div class="stagger-item">Item 3</div>
</div>
```

#### 6. `animate-on-scroll` (Legacy)

Basic fade-in from bottom animation:

```html
<div class="animate-on-scroll">Legacy animation support</div>
```

### Parallax Effects

Add the `parallax-element` class to create parallax effects:

```html
<div class="parallax-element">This element will have a parallax effect</div>
```

## Advanced Usage

### Custom Scroll Animations

You can create custom scroll animations using the utility functions in `src/lib/utils/scroll-animations.ts`:

```typescript
import { createParallaxEffect, createTextReveal } from '$lib/utils/scroll-animations';

// Create custom parallax effect
createParallaxEffect('.my-parallax-element', 0.3);

// Create text reveal animation
createTextReveal('.text-reveal');
```

### Accessing ScrollSmoother Instance

You can access the ScrollSmoother instance for advanced control:

```svelte
<script>
	import ScrollSmoother from '$lib/components/ui/ScrollSmoother.svelte';

	let smoother;

	function scrollToTop() {
		if (smoother) {
			smoother.scrollTo(0, true);
		}
	}
</script>

<ScrollSmoother bind:smoother>
	<button on:click={scrollToTop}>Scroll to Top</button>
</ScrollSmoother>
```

## Performance Considerations

### Mobile Optimization

- Scroll smoothing is reduced on mobile devices
- Effects are disabled on mobile for better performance
- Touch scrolling is optimized for mobile devices

### Best Practices

1. **Use animations sparingly** - Too many animations can impact performance
2. **Test on mobile devices** - Ensure animations work well on smaller screens
3. **Use appropriate animation classes** - Choose the right animation for your content
4. **Consider accessibility** - Some users may prefer reduced motion

### Reducing Motion

For users who prefer reduced motion, you can disable animations:

```css
@media (prefers-reduced-motion: reduce) {
	.animate-fade-in,
	.animate-slide-left,
	.animate-slide-right,
	.animate-scale-in,
	.animate-stagger,
	.animate-on-scroll {
		animation: none !important;
	}
}
```

## Browser Support

The scroll smoothing and animations work in all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Common Issues

1. **Animations not working**: Ensure elements have the correct classes and are visible
2. **Performance issues**: Reduce the number of animated elements or disable on mobile
3. **Scroll not smooth**: Check if ScrollSmoother is properly initialized

### Debug Mode

To debug scroll animations, you can enable ScrollTrigger's debug mode:

```javascript
ScrollTrigger.config({
	debug: true
});
```

## Examples

Check the homepage (`src/routes/+page.svelte`) for examples of how to use these animation classes in practice.

## Further Reading

- [GSAP ScrollSmoother Documentation](https://greensock.com/docs/v3/Plugins/ScrollSmoother)
- [GSAP ScrollTrigger Documentation](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Performance Guide](<https://greensock.com/docs/v3/GSAP/gsap.config()>)
