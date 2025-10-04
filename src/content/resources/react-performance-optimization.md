---
title: 'React Performance Optimization: A Practical Guide for 2024'
description: 'Proven techniques to make your React apps lightning-fast: profiling, memoization, code splitting, and more with real-world examples'
date: '2024-10-01'
author: 'Hessam Khoobkar'
tags: ['react', 'performance', 'optimization', 'web-vitals', 'tutorial']
featured: true
published: true
slug: 'react-performance-optimization'
category: 'resource'
readingTime: 15
image: '/images/resources/react-performance.jpg'
---

# React Performance Optimization: A Practical Guide for 2024

Performance isn't just about fast load times—it's about creating delightful user experiences that keep people engaged. After optimizing dozens of React applications, I've learned that performance optimization follows patterns. This guide shares those patterns with real-world examples.

## Table of Contents

1. [Measuring Performance](#measuring-performance)
2. [Component Optimization](#component-optimization)
3. [Code Splitting & Lazy Loading](#code-splitting)
4. [Data Fetching Strategies](#data-fetching)
5. [Image & Asset Optimization](#assets)
6. [Production Checklist](#checklist)

## Measuring Performance

**Rule #1: Measure before optimizing.** Don't guess what's slow—prove it.

### React DevTools Profiler

```jsx
import { Profiler } from 'react';

function onRenderCallback(
	id, // the "id" prop of the Profiler tree that has just committed
	phase, // either "mount" or "update"
	actualDuration, // time spent rendering the committed update
	baseDuration, // estimated time to render the entire subtree without memoization
	startTime, // when React began rendering this update
	commitTime, // when React committed this update
	interactions // the Set of interactions belonging to this update
) {
	console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

<Profiler id="MyComponent" onRender={onRenderCallback}>
	<MyComponent />
</Profiler>;
```

### Chrome DevTools Performance Tab

1. Open DevTools → Performance tab
2. Click Record → Interact with your app → Stop
3. Look for:
   - **Long Tasks** (anything over 50ms)
   - **Scripting time** (yellow blocks)
   - **Layout thrashing** (purple blocks)

### Web Vitals

```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
	// Send to your analytics endpoint
	console.log(metric);
}

getCLS(sendToAnalytics); // Cumulative Layout Shift
getFID(sendToAnalytics); // First Input Delay
getFCP(sendToAnalytics); // First Contentful Paint
getLCP(sendToAnalytics); // Largest Contentful Paint
getTTFB(sendToAnalytics); // Time to First Byte
```

**Target Scores:**

- LCP: &lt; 2.5s
- FID: &lt; 100ms
- CLS: &lt; 0.1

## Component Optimization

### 1. React.memo - Prevent Unnecessary Renders

```jsx
// ❌ Bad: Re-renders on every parent render
function ExpensiveComponent({ data }) {
	console.log('Rendering ExpensiveComponent');
	return (
		<div>
			{data.map((item) => (
				<ComplexChart key={item.id} data={item} />
			))}
		</div>
	);
}

// ✅ Good: Only re-renders when data changes
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
	console.log('Rendering ExpensiveComponent');
	return (
		<div>
			{data.map((item) => (
				<ComplexChart key={item.id} data={item} />
			))}
		</div>
	);
});

// ✅ Better: Custom comparison for complex props
const ExpensiveComponent = React.memo(
	function ExpensiveComponent({ data }) {
		// ... component code
	},
	(prevProps, nextProps) => {
		// Only re-render if IDs changed
		return prevProps.data.map((d) => d.id).join() === nextProps.data.map((d) => d.id).join();
	}
);
```

### 2. useMemo - Memoize Expensive Calculations

```jsx
function DataTable({ data }) {
	// ❌ Bad: Recalculates on every render
	const sortedData = data.sort((a, b) => b.value - a.value);
	const filteredData = sortedData.filter((item) => item.active);

	// ✅ Good: Only recalculates when data changes
	const processedData = useMemo(() => {
		const sorted = data.sort((a, b) => b.value - a.value);
		return sorted.filter((item) => item.active);
	}, [data]);

	return (
		<table>
			{processedData.map((item) => (
				<tr key={item.id}>
					<td>{item.name}</td>
					<td>{item.value}</td>
				</tr>
			))}
		</table>
	);
}
```

**When to use useMemo:**

- ✅ Expensive calculations (sorting large arrays, complex filtering)
- ✅ Passing computed values to React.memo components
- ✅ Dependencies in other hooks (useEffect, useMemo)
- ❌ Simple calculations (adding two numbers)
- ❌ Every single variable (over-optimization)

### 3. useCallback - Stable Function References

```jsx
function ParentComponent() {
	const [count, setCount] = useState(0);
	const [text, setText] = useState('');

	// ❌ Bad: New function on every render → child re-renders unnecessarily
	const handleClick = () => {
		console.log('Clicked!');
	};

	// ✅ Good: Stable function reference
	const handleClick = useCallback(() => {
		console.log('Clicked!');
	}, []); // Dependencies array

	// ✅ With dependencies
	const handleSubmit = useCallback(() => {
		api.submit({ count, text });
	}, [count, text]);

	return (
		<>
			<button onClick={() => setCount(count + 1)}>Count: {count}</button>
			<input value={text} onChange={(e) => setText(e.target.value)} />
			<ExpensiveChild onClick={handleClick} />
		</>
	);
}

const ExpensiveChild = React.memo(({ onClick }) => {
	console.log('Rendering ExpensiveChild');
	return <button onClick={onClick}>Click me!</button>;
});
```

### 4. List Virtualization

For rendering large lists (100+ items), use virtualization:

```jsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
	const parentRef = React.useRef(null);

	const rowVirtualizer = useVirtualizer({
		count: items.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 50, // Estimated row height
		overscan: 5 // Render 5 extra items outside viewport
	});

	return (
		<div ref={parentRef} style={{ height: '500px', overflow: 'auto' }}>
			<div
				style={{
					height: `${rowVirtualizer.getTotalSize()}px`,
					width: '100%',
					position: 'relative'
				}}
			>
				{rowVirtualizer.getVirtualItems().map((virtualRow) => (
					<div
						key={virtualRow.index}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: `${virtualRow.size}px`,
							transform: `translateY(${virtualRow.start}px)`
						}}
					>
						<div className="list-item">{items[virtualRow.index].name}</div>
					</div>
				))}
			</div>
		</div>
	);
}
```

**Result:** Render 10,000 items with 60fps scrolling

## Code Splitting & Lazy Loading

### Route-based Code Splitting

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ❌ Bad: Import everything upfront
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';

// ✅ Good: Lazy load routes
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingSpinner />}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/analytics" element={<Analytics />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
```

### Component-based Code Splitting

```jsx
import { lazy, Suspense, useState } from 'react';

// Heavy chart library - only load when needed
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
	const [showChart, setShowChart] = useState(false);

	return (
		<div>
			<h1>Dashboard</h1>
			<button onClick={() => setShowChart(true)}>Show Chart</button>

			{showChart && (
				<Suspense fallback={<div>Loading chart...</div>}>
					<HeavyChart />
				</Suspense>
			)}
		</div>
	);
}
```

### Prefetch on Hover

```jsx
function Navigation() {
	const prefetchDashboard = () => {
		// Prefetch the chunk when user hovers
		import('./pages/Dashboard');
	};

	return (
		<nav>
			<Link to="/dashboard" onMouseEnter={prefetchDashboard}>
				Dashboard
			</Link>
		</nav>
	);
}
```

## Data Fetching Strategies

### 1. TanStack Query (React Query)

```jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserProfile({ userId }) {
	const queryClient = useQueryClient();

	// Fetch with automatic caching, refetching, and error handling
	const { data, isLoading, error } = useQuery({
		queryKey: ['user', userId],
		queryFn: () => fetchUser(userId),
		staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
		cacheTime: 30 * 60 * 1000 // Keep in cache for 30 minutes
	});

	// Mutation with optimistic updates
	const updateUser = useMutation({
		mutationFn: (userData) => api.updateUser(userId, userData),
		onMutate: async (newData) => {
			// Optimistic update
			await queryClient.cancelQueries({ queryKey: ['user', userId] });
			const previousUser = queryClient.getQueryData(['user', userId]);
			queryClient.setQueryData(['user', userId], newData);
			return { previousUser };
		},
		onError: (err, newData, context) => {
			// Rollback on error
			queryClient.setQueryData(['user', userId], context.previousUser);
		},
		onSettled: () => {
			// Refetch after mutation
			queryClient.invalidateQueries({ queryKey: ['user', userId] });
		}
	});

	if (isLoading) return <LoadingSkeleton />;
	if (error) return <ErrorMessage error={error} />;

	return <div>{data.name}</div>;
}
```

### 2. Parallel Data Fetching

```jsx
// ❌ Bad: Sequential (waterfall)
async function loadDashboard() {
	const user = await fetchUser();
	const posts = await fetchPosts(user.id);
	const comments = await fetchComments(posts[0].id);
	return { user, posts, comments };
}

// ✅ Good: Parallel
async function loadDashboard() {
	const [user, posts, comments] = await Promise.all([fetchUser(), fetchPosts(), fetchComments()]);
	return { user, posts, comments };
}

// ✅ Better: With React Query
function Dashboard() {
	const userQuery = useQuery({ queryKey: ['user'], queryFn: fetchUser });
	const postsQuery = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
	const commentsQuery = useQuery({ queryKey: ['comments'], queryFn: fetchComments });

	if (userQuery.isLoading || postsQuery.isLoading || commentsQuery.isLoading) {
		return <LoadingSkeleton />;
	}

	return (
		<div>
			<UserInfo user={userQuery.data} />
			<PostsList posts={postsQuery.data} />
			<CommentsList comments={commentsQuery.data} />
		</div>
	);
}
```

## Image & Asset Optimization

### 1. Next.js Image Component

```jsx
import Image from 'next/image';

// ❌ Bad: No optimization
<img src="/hero.jpg" alt="Hero" width="800" height="600" />

// ✅ Good: Automatic optimization
<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority // Load immediately for above-the-fold images
  placeholder="blur" // Show blur while loading
  blurDataURL={blurDataUrl} // Low-quality placeholder
/>

// ✅ Responsive images
<Image
  src="/hero.jpg"
  alt="Hero"
  fill // Fill parent container
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  style={{ objectFit: 'cover' }}
/>
```

### 2. Lazy Load Images

```jsx
function LazyImage({ src, alt }) {
	const [imageSrc, setImageSrc] = useState(null);
	const imgRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setImageSrc(src);
					observer.disconnect();
				}
			},
			{ rootMargin: '50px' } // Start loading 50px before entering viewport
		);

		if (imgRef.current) {
			observer.observe(imgRef.current);
		}

		return () => observer.disconnect();
	}, [src]);

	return <img ref={imgRef} src={imageSrc || 'placeholder.jpg'} alt={alt} loading="lazy" />;
}
```

### 3. WebP & Modern Formats

```html
<picture>
	<source srcset="/image.avif" type="image/avif" />
	<source srcset="/image.webp" type="image/webp" />
	<img src="/image.jpg" alt="Fallback" />
</picture>
```

## Production Checklist

### Build Configuration

```javascript
// vite.config.js
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// Separate vendor chunks
					'react-vendor': ['react', 'react-dom', 'react-router-dom'],
					'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
					utils: ['date-fns', 'lodash-es']
				}
			}
		},
		// Minification
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true, // Remove console.log in production
				drop_debugger: true
			}
		}
	}
});
```

### Bundle Analysis

```bash
# Analyze bundle size
npm install -D vite-bundle-visualizer

# Add to vite.config.js
import { visualizer } from 'vite-bundle-visualizer';

export default defineConfig({
  plugins: [
    visualizer({ open: true })
  ]
});
```

### Performance Monitoring

```jsx
// Monitor performance in production
import { onCLS, onFID, onLCP } from 'web-vitals';

function sendToAnalytics({ name, value, id }) {
	// Send to your analytics service
	fetch('/api/analytics', {
		method: 'POST',
		body: JSON.stringify({ name, value, id })
	});
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onLCP(sendToAnalytics);
```

## Common Performance Anti-Patterns

### 1. Inline Function in JSX

```jsx
// ❌ Bad: Creates new function on every render
<button onClick={() => handleClick(item.id)}>Click</button>;

// ✅ Good: Use event delegation or memo
const handleButtonClick = useCallback((id) => {
	return () => handleClick(id);
}, []);

<button onClick={handleButtonClick(item.id)}>Click</button>;
```

### 2. Creating Objects/Arrays in Render

```jsx
// ❌ Bad: New array reference on every render
<ChildComponent items={data.filter((item) => item.active)} />;

// ✅ Good: Memoize the filtered array
const activeItems = useMemo(() => data.filter((item) => item.active), [data]);
<ChildComponent items={activeItems} />;
```

### 3. Too Many useEffect Calls

```jsx
// ❌ Bad: Multiple effects doing related things
useEffect(() => {
	fetchUser();
}, [userId]);

useEffect(() => {
	fetchPosts();
}, [userId]);

useEffect(() => {
	fetchComments();
}, [userId]);

// ✅ Good: Combine related effects or use a data fetching library
useEffect(() => {
	Promise.all([fetchUser(), fetchPosts(), fetchComments()]);
}, [userId]);

// ✅ Better: Use React Query
const { data } = useQueries([
	{ queryKey: ['user', userId], queryFn: fetchUser },
	{ queryKey: ['posts', userId], queryFn: fetchPosts },
	{ queryKey: ['comments', userId], queryFn: fetchComments }
]);
```

## Conclusion

Performance optimization is an ongoing process, not a one-time fix. Focus on:

1. **Measure first** - Profile before optimizing
2. **Fix the biggest issues** - 80/20 rule applies
3. **Monitor continuously** - Track Web Vitals in production
4. **User experience** - Fast load, smooth interactions, no jank

Remember: Premature optimization is the root of all evil. Optimize when you have data showing it's needed.

## Want Help Optimizing Your React App?

I specialize in React performance optimization and have helped dozens of companies achieve 2-3x performance improvements. [Let's discuss your project](/contact).

---

**Next Steps:**

- [View More Resources](/resources)
- [Read My Blog](/insights)
- [See Case Studies](/work)
