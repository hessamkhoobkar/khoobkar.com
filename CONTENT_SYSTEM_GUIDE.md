# Content Management System Guide

This guide explains the markdown-based content management system implemented for the Khoobkar website.

## Overview

The system provides a structured way to manage dynamic content like blog posts, case studies, and resources using markdown files with frontmatter metadata.

## Directory Structure

```
src/
├── content/                    # Markdown content files
│   ├── blog/                  # Blog posts
│   ├── case-studies/          # Case studies
│   ├── resources/             # Resources and guides
│   └── work/                  # Portfolio items
├── lib/
│   ├── data/                  # Data configuration
│   │   ├── navigation.ts      # Navigation structure
│   │   └── content.ts         # Content types and config
│   ├── utils/
│   │   └── content.ts         # Content loading utilities
│   └── components/
│       └── layouts/           # Markdown layout components
│           ├── BlogLayout.svelte
│           ├── CaseStudyLayout.svelte
│           └── DefaultLayout.svelte
└── routes/                    # Page routes
    ├── insights/              # Blog listing and posts
    ├── work/                  # Case studies listing and detail
    └── resources/             # Resources listing and detail
```

## Content Structure

### Frontmatter

All markdown files must include frontmatter with the following structure:

```yaml
---
title: "Your Title"
description: "Brief description"
date: "2024-01-15"
author: "Author Name"
tags: ["tag1", "tag2", "tag3"]
featured: true
published: true
slug: "url-slug"
category: "blog" | "case-study" | "resource" | "work"
readingTime: 5
image: "/images/path/to/image.jpg"
---
```

### Content Categories

- **blog**: Blog posts and articles (displayed at `/insights`)
- **case-study**: Project case studies (displayed at `/work`)
- **resource**: Tools, guides, and resources (displayed at `/resources`)
- **work**: Portfolio items (displayed at `/work`)

## Key Features

### 1. Dynamic Content Loading

- Automatic content discovery from markdown files
- Frontmatter parsing for metadata
- Category-based organization

### 2. Featured Content

- Mark content as `featured: true` to display on homepage
- Automatic featured content selection

### 3. Related Content

- Tag-based content recommendations
- Automatic related content suggestions

### 4. Search and Filtering

- Search functionality across all content
- Tag-based filtering
- Category-based organization

### 5. SEO Optimization

- Automatic meta tag generation
- Open Graph support
- Structured data for articles

## Usage Examples

### Creating a New Blog Post

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter with required fields
3. Write your content in markdown
4. The post will automatically appear in `/insights`

### Creating a Case Study

1. Create a new `.md` file in `src/content/case-studies/`
2. Use `category: "case-study"` in frontmatter
3. The case study will appear in `/work`

### Navigation Management

Edit `src/lib/data/navigation.ts` to modify:

- Main navigation items
- Footer navigation
- Social links

## Utility Functions

### Content Loading

```typescript
import { loadContent, loadContentItem } from '$lib/utils/content';

// Load all blog posts
const blogPosts = await loadContent('blog');

// Load specific post
const post = await loadContentItem('blog', 'post-slug');
```

### Featured Content

```typescript
import { getFeaturedContent } from '$lib/utils/content';

const featured = await getFeaturedContent();
```

### Search

```typescript
import { searchContent } from '$lib/utils/content';

const results = await searchContent('search query');
```

## Layout Components

### BlogLayout.svelte

- Used for blog posts
- Displays title, date, author, tags
- Responsive design with proper typography

### CaseStudyLayout.svelte

- Used for case studies
- Hero-style header with large title
- Call-to-action footer
- Project metadata display

### DefaultLayout.svelte

- Simple layout for other content types
- Clean typography focus

## Configuration

### Content Settings

Edit `src/lib/data/content.ts` to modify:

- Posts per page
- Excerpt length
- Date format
- Featured posts limit
- Related posts limit

### MDSvex Configuration

The system uses mdsvex for markdown processing with:

- Custom layouts per content type
- TypeScript support
- Remark and Rehype plugin support

## Best Practices

### Content Creation

1. Always include complete frontmatter
2. Use descriptive titles and descriptions
3. Add relevant tags for better discoverability
4. Include reading time estimates
5. Use high-quality images with proper alt text

### File Naming

- Use kebab-case for file names
- Match filename with slug in frontmatter
- Keep names descriptive but concise

### SEO Optimization

- Write compelling meta descriptions
- Use proper heading hierarchy (H1, H2, H3)
- Include relevant keywords naturally
- Optimize images for web

## Development

### Adding New Content Types

1. Create new directory in `src/content/`
2. Add category to content types
3. Create corresponding routes
4. Update navigation if needed

### Extending Functionality

- Add new utility functions in `src/lib/utils/content.ts`
- Create custom layout components
- Extend frontmatter schema in `src/lib/data/content.ts`

## Deployment

The content system works with static site generation:

- All content is processed at build time
- No runtime dependencies for content loading
- Fast performance with pre-generated pages
- SEO-friendly static HTML output

This system provides a scalable, maintainable way to manage content while keeping the developer experience simple and the performance optimal.
