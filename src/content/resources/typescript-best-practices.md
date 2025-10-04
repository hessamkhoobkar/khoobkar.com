---
title: 'TypeScript Best Practices: Writing Type-Safe, Maintainable Code'
description: 'Comprehensive guide to TypeScript best practices, from basic types to advanced patterns for building robust applications'
date: '2024-09-18'
author: 'Hessam Khoobkar'
tags: ['typescript', 'best-practices', 'type-safety', 'code-quality']
featured: true
published: true
slug: 'typescript-best-practices'
category: 'resource'
readingTime: 14
image: '/images/resources/typescript.jpg'
---

# TypeScript Best Practices: Writing Type-Safe, Maintainable Code

TypeScript has become the de facto standard for building modern web applications. But using TypeScript effectively requires more than just adding type annotations. This guide covers battle-tested best practices I've used across dozens of production applications.

## Table of Contents

1. [Type Fundamentals](#fundamentals)
2. [Interface vs Type](#interface-vs-type)
3. [Utility Types](#utility-types)
4. [Generic Patterns](#generics)
5. [Real-World Patterns](#patterns)
6. [Common Mistakes](#mistakes)

## Type Fundamentals

### Prefer Explicit Types for Public APIs

```typescript
// ❌ Bad: Implicit types
function processUser(user) {
	return {
		fullName: `${user.firstName} ${user.lastName}`,
		email: user.email.toLowerCase()
	};
}

// ✅ Good: Explicit types
interface User {
	firstName: string;
	lastName: string;
	email: string;
	age?: number;
}

interface ProcessedUser {
	fullName: string;
	email: string;
}

function processUser(user: User): ProcessedUser {
	return {
		fullName: `${user.firstName} ${user.lastName}`,
		email: user.email.toLowerCase()
	};
}
```

### Use Const Assertions for Literals

```typescript
// ❌ Bad: Type widened to string[]
const routes = ['home', 'about', 'contact'];
// Type: string[]

// ✅ Good: Precise literal types
const routes = ['home', 'about', 'contact'] as const;
// Type: readonly ["home", "about", "contact"]

type Route = (typeof routes)[number]; // "home" | "about" | "contact"
```

### Discriminated Unions for State

```typescript
// ❌ Bad: Unclear state representation
interface DataState {
  loading: boolean;
  error: Error | null;
  data: User | null;
}

// ✅ Good: Discriminated union
type DataState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: User };

function handleData(state: DataState) {
  switch (state.status) {
    case 'idle':
      return <div>Click to load</div>;
    case 'loading':
      return <Spinner />;
    case 'error':
      return <Error message={state.error.message} />; // Type-safe!
    case 'success':
      return <UserProfile user={state.data} />; // Type-safe!
  }
}
```

## Interface vs Type

### When to Use Interface

```typescript
// ✅ Good: For object shapes that might be extended
interface User {
	id: string;
	name: string;
	email: string;
}

// Easy to extend
interface AdminUser extends User {
	permissions: string[];
	role: 'admin' | 'super-admin';
}

// Declaration merging (useful for libraries)
interface User {
	createdAt: Date; // Adds to User interface
}
```

### When to Use Type

```typescript
// ✅ Good: For unions, intersections, and complex types
type Status = 'pending' | 'approved' | 'rejected';

type Result<T> = { success: true; data: T } | { success: false; error: string };

// Conditional types
type IsString<T> = T extends string ? true : false;

// Mapped types
type Readonly<T> = {
	readonly [K in keyof T]: T[K];
};
```

**Rule of Thumb:** Use `interface` for object shapes, `type` for everything else.

## Utility Types

### Built-in Utility Types

```typescript
interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	age: number;
	address: string;
}

// Partial - Make all properties optional
type PartialUser = Partial<User>;
// { id?: string; name?: string; ... }

// Required - Make all properties required
type RequiredUser = Required<PartialUser>;

// Pick - Select specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'email'>;
// { id: string; name: string; email: string }

// Omit - Exclude specific properties
type PublicUser = Omit<User, 'password'>;
// { id: string; name: string; email: string; age: number; address: string }

// Record - Create object type with specific keys
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;
// { [key: string]: 'admin' | 'user' | 'guest' }

// ReturnType - Extract function return type
function getUser() {
	return { id: '1', name: 'John' };
}
type UserType = ReturnType<typeof getUser>;
// { id: string; name: string }

// Awaited - Unwrap Promise type
type AwaitedUser = Awaited<Promise<User>>;
// User
```

### Custom Utility Types

```typescript
// NonNullable fields
type NonNullableKeys<T> = {
	[K in keyof T]-?: NonNullable<T[K]>;
};

// Deep Partial
type DeepPartial<T> = {
	[K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Prettify - Better type hints in IDE
type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

// Before: Complex intersection shows as A & B & C
// After: Shows all properties clearly
type User = Prettify<BaseUser & WithPermissions & WithMetadata>;
```

## Generic Patterns

### API Response Type

```typescript
interface ApiResponse<T> {
	data: T;
	status: number;
	message: string;
	timestamp: Date;
}

interface Pagination {
	page: number;
	perPage: number;
	total: number;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
	pagination: Pagination;
}

// Usage
async function fetchUsers(): Promise<PaginatedResponse<User>> {
	const response = await fetch('/api/users');
	return response.json();
}

// Type-safe!
const users = await fetchUsers();
users.data.forEach((user) => console.log(user.name)); // ✓ Type-safe
console.log(users.pagination.total); // ✓ Type-safe
```

### Generic React Components

```typescript
interface SelectOption<T = string> {
  label: string;
  value: T;
}

interface SelectProps<T> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
}

function Select<T extends string | number>({
  options,
  value,
  onChange,
  placeholder
}: SelectProps<T>) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as T)}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Usage - fully type-safe!
<Select<'user' | 'admin'>
  options={[
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' }
  ]}
  value={role}
  onChange={setRole} // onChange infers correct type!
/>
```

## Real-World Patterns

### Form Handling with Type Safety

```typescript
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define schema
const userSchema = z.object({
  firstName: z.string().min(2, 'Too short').max(50, 'Too long'),
  lastName: z.string().min(2).max(50),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18+').max(120),
  password: z.string().min(8, 'Minimum 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[0-9]/, 'Must contain number')
});

// Infer TypeScript type from schema
type UserFormData = z.infer<typeof userSchema>;

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema)
  });

  const onSubmit = async (data: UserFormData) => {
    // data is fully typed!
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName')} />
      {errors.firstName && <span>{errors.firstName.message}</span>}

      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Type-Safe API Client

```typescript
// api-client.ts
interface Endpoints {
	'/users': {
		GET: { response: User[] };
		POST: { body: CreateUserDto; response: User };
	};
	'/users/:id': {
		GET: { response: User };
		PATCH: { body: Partial<User>; response: User };
		DELETE: { response: void };
	};
	'/posts': {
		GET: { response: Post[] };
		POST: { body: CreatePostDto; response: Post };
	};
}

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

class ApiClient {
	async request<TPath extends keyof Endpoints, TMethod extends keyof Endpoints[TPath] & Method>(
		path: TPath,
		method: TMethod,
		options?: Endpoints[TPath][TMethod] extends { body: infer TBody } ? { body: TBody } : {}
	): Promise<Endpoints[TPath][TMethod] extends { response: infer TResponse } ? TResponse : never> {
		const response = await fetch(path as string, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: options && 'body' in options ? JSON.stringify(options.body) : undefined
		});

		return response.json();
	}
}

const api = new ApiClient();

// Fully type-safe API calls!
const users = await api.request('/users', 'GET'); // Type: User[]
const newUser = await api.request('/users', 'POST', {
	body: { name: 'John', email: 'john@example.com' } // Type-checked!
}); // Type: User

// TypeScript catches errors!
await api.request('/users', 'POST', {
	body: { invalid: 'field' } // ❌ Error: Property 'name' is missing
});
```

### Type-Safe Event Handlers

```typescript
// Define event map
interface AppEvents {
	'user:login': { userId: string; timestamp: Date };
	'user:logout': { userId: string };
	'post:created': { postId: string; authorId: string };
	error: { message: string; code: number };
}

class EventBus {
	private listeners: { [K in keyof AppEvents]?: Array<(data: AppEvents[K]) => void> } = {};

	on<K extends keyof AppEvents>(event: K, callback: (data: AppEvents[K]) => void): () => void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event]!.push(callback);

		// Return unsubscribe function
		return () => {
			const callbacks = this.listeners[event];
			if (callbacks) {
				const index = callbacks.indexOf(callback);
				if (index > -1) {
					callbacks.splice(index, 1);
				}
			}
		};
	}

	emit<K extends keyof AppEvents>(event: K, data: AppEvents[K]): void {
		const callbacks = this.listeners[event];
		if (callbacks) {
			callbacks.forEach((callback) => callback(data));
		}
	}
}

const eventBus = new EventBus();

// Type-safe event handling!
eventBus.on('user:login', (data) => {
	console.log(data.userId); // ✓ Type-safe
	console.log(data.timestamp); // ✓ Type-safe
	console.log(data.invalid); // ❌ Error: Property doesn't exist
});

eventBus.emit('user:login', {
	userId: '123',
	timestamp: new Date()
}); // ✓

eventBus.emit('user:login', {
	userId: 123 // ❌ Error: Should be string
});
```

## Common Mistakes

### 1. Overusing `any`

```typescript
// ❌ Bad: Using any defeats the purpose of TypeScript
function processData(data: any) {
	return data.map((item: any) => item.value);
}

// ✅ Good: Use generics
function processData<T extends { value: unknown }>(data: T[]): unknown[] {
	return data.map((item) => item.value);
}

// ✅ Better: Be more specific
interface DataItem {
	id: string;
	value: number;
}

function processData(data: DataItem[]): number[] {
	return data.map((item) => item.value);
}
```

### 2. Not Using Strict Mode

```json
// tsconfig.json
{
	"compilerOptions": {
		"strict": true, // Enable all strict checks
		"noImplicitAny": true,
		"strictNullChecks": true,
		"strictFunctionTypes": true,
		"strictBindCallApply": true,
		"strictPropertyInitialization": true,
		"noImplicitThis": true,
		"alwaysStrict": true
	}
}
```

### 3. Ignoring Null/Undefined

```typescript
// ❌ Bad: Assuming value exists
function getUserName(user: User | null) {
	return user.name.toUpperCase(); // Runtime error if user is null!
}

// ✅ Good: Handle null/undefined
function getUserName(user: User | null): string {
	return user?.name?.toUpperCase() ?? 'Guest';
}

// ✅ Better: Type guard
function getUserName(user: User | null): string {
	if (!user) return 'Guest';
	return user.name.toUpperCase();
}
```

### 4. Type Assertions Without Validation

```typescript
// ❌ Bad: Unsafe type assertion
const userData = JSON.parse(response) as User;
// What if response isn't actually a User?

// ✅ Good: Validate with type guard
function isUser(value: unknown): value is User {
	return (
		typeof value === 'object' &&
		value !== null &&
		'id' in value &&
		'name' in value &&
		'email' in value &&
		typeof value.id === 'string' &&
		typeof value.name === 'string' &&
		typeof value.email === 'string'
	);
}

const parsed = JSON.parse(response);
if (isUser(parsed)) {
	const user: User = parsed; // Type-safe!
} else {
	throw new Error('Invalid user data');
}

// ✅ Better: Use Zod for runtime validation
const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email()
});

const user = UserSchema.parse(JSON.parse(response));
// Validated at runtime AND typed!
```

### 5. Not Using Readonly

```typescript
// ❌ Bad: Mutable configuration
interface Config {
	apiUrl: string;
	timeout: number;
	retries: number;
}

const config: Config = {
	apiUrl: 'https://api.example.com',
	timeout: 5000,
	retries: 3
};

config.apiUrl = 'https://evil.com'; // Oops!

// ✅ Good: Immutable configuration
interface Config {
	readonly apiUrl: string;
	readonly timeout: number;
	readonly retries: number;
}

// ✅ Or use Readonly utility
type Config = Readonly<{
	apiUrl: string;
	timeout: number;
	retries: number;
}>;

config.apiUrl = 'https://evil.com'; // ❌ Error: Cannot assign to readonly property
```

## Advanced Patterns

### Builder Pattern with Type Safety

```typescript
interface Email {
	to: string[];
	cc?: string[];
	bcc?: string[];
	subject: string;
	body: string;
	attachments?: File[];
}

class EmailBuilder {
	private email: Partial<Email> = {};

	to(...addresses: string[]): this {
		this.email.to = addresses;
		return this;
	}

	cc(...addresses: string[]): this {
		this.email.cc = addresses;
		return this;
	}

	subject(subject: string): this {
		this.email.subject = subject;
		return this;
	}

	body(body: string): this {
		this.email.body = body;
		return this;
	}

	attachments(...files: File[]): this {
		this.email.attachments = files;
		return this;
	}

	build(): Email {
		// Validate required fields
		if (!this.email.to || !this.email.subject || !this.email.body) {
			throw new Error('Missing required fields');
		}

		return this.email as Email;
	}
}

// Usage
const email = new EmailBuilder()
	.to('user@example.com')
	.subject('Hello')
	.body('Hello World')
	.cc('manager@example.com')
	.build();
```

### Type-Safe State Machine

```typescript
type State =
	| { type: 'idle' }
	| { type: 'loading' }
	| { type: 'success'; data: string }
	| { type: 'error'; error: Error };

type Event =
	| { type: 'FETCH' }
	| { type: 'SUCCESS'; data: string }
	| { type: 'ERROR'; error: Error }
	| { type: 'RESET' };

function reducer(state: State, event: Event): State {
	switch (state.type) {
		case 'idle':
			if (event.type === 'FETCH') {
				return { type: 'loading' };
			}
			break;

		case 'loading':
			if (event.type === 'SUCCESS') {
				return { type: 'success', data: event.data };
			}
			if (event.type === 'ERROR') {
				return { type: 'error', error: event.error };
			}
			break;

		case 'success':
		case 'error':
			if (event.type === 'RESET') {
				return { type: 'idle' };
			}
			if (event.type === 'FETCH') {
				return { type: 'loading' };
			}
			break;
	}

	return state;
}
```

## Configuration

### Recommended tsconfig.json

```json
{
	"compilerOptions": {
		// Type Checking
		"strict": true,
		"noUncheckedIndexedAccess": true,
		"noImplicitOverride": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true,

		// Modules
		"module": "ESNext",
		"moduleResolution": "bundler",
		"resolveJsonModule": true,

		// Emit
		"declaration": true,
		"declarationMap": true,
		"sourceMap": true,

		// JavaScript Support
		"allowJs": false,
		"checkJs": false,

		// Interop Constraints
		"esModuleInterop": true,
		"allowSyntheticDefaultImports": true,
		"forceConsistentCasingInFileNames": true,

		// Language and Environment
		"target": "ES2022",
		"lib": ["ES2022", "DOM", "DOM.Iterable"],
		"jsx": "react-jsx",

		// Skip Checking .d.ts Files
		"skipLibCheck": true
	},
	"include": ["src"],
	"exclude": ["node_modules", "dist", "build"]
}
```

## Conclusion

TypeScript is a powerful tool, but only when used correctly:

1. **Enable strict mode** - Catch bugs at compile time
2. **Avoid `any`** - Use `unknown` or proper types
3. **Leverage utility types** - Don't reinvent the wheel
4. **Use generics wisely** - Make code reusable and type-safe
5. **Validate at runtime** - Types don't exist at runtime

Remember: TypeScript is about **preventing bugs**, not just adding annotations.

## Need TypeScript Help?

I specialize in TypeScript architecture and have helped teams improve code quality and reduce bugs significantly. [Let's discuss your project](/contact).

---

**Next Steps:**

- [View More Resources](/resources)
- [React Performance Guide](/resources/react-performance-optimization)
- [Modern CSS Layouts](/resources/modern-css-layout-techniques)
