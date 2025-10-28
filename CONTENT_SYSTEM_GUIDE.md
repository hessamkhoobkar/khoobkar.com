# Content Management System Guide

This guide explains the markdown-based content management system implemented for the Khoobkar website, designed to showcase expertise to hiring managers, entrepreneurs, and potential clients.

## Overview

The system provides a structured way to manage dynamic content across multiple categories, focusing on business impact and technical expertise demonstration.

## Directory Structure

```
src/
├── content/                    # Markdown content files
│   ├── work/                  # Previous client projects and freelance work
│   ├── projects/              # SaaS applications, experiments, complex components
│   ├── process/               # Development process content
│   │   ├── dev-logs/         # SaaS building series
│   │   ├── case-studies/      # Technical deep dives
│   │   └── idea-to-product/   # Rebuilt freelance work showcase
│   └── insights/              # Strategic business content
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
│           ├── ProjectLayout.svelte
│           └── DefaultLayout.svelte
└── routes/                    # Page routes
    ├── work/                  # Previous work showcase
    ├── projects/              # Current projects and experiments
    ├── process/               # Development process content
    │   ├── dev-logs/         # Dev log series
    │   ├── case-studies/     # Technical case studies
    │   └── idea-to-product/  # Idea to product series
    └── insights/              # Strategic insights
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
category: "work" | "projects" | "dev-log" | "case-study" | "insight" | "idea-to-product"
readingTime: 5
image: "/images/path/to/image.jpg"
---
```

### Content Categories

- **work**: Previous client projects and freelance work (displayed at `/work`)
- **projects**: SaaS applications, experiments, complex components (displayed at `/projects`)
- **dev-log**: SaaS building series and development journey (displayed at `/process/dev-logs`)
- **case-study**: Technical deep dives and problem-solving (displayed at `/process/case-studies`)
- **insight**: Strategic business content for leaders (displayed at `/insights`)
- **idea-to-product**: Rebuilt freelance work showcase (displayed at `/process/idea-to-product`)

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

### Creating a New Project Showcase

1. Create a new `.md` file in `src/content/projects/`
2. Add frontmatter with `category: "projects"`
3. Include metrics, tech stack, and business impact
4. The project will appear in `/projects`

### Creating a Dev Log Entry

1. Create a new `.md` file in `src/content/process/dev-logs/`
2. Use `category: "dev-log"` in frontmatter
3. Document your development process and decisions
4. The dev log will appear in `/process/dev-logs`

### Creating a Strategic Insight

1. Create a new `.md` file in `src/content/insights/`
2. Use `category: "insight"` in frontmatter
3. Focus on business impact and actionable advice
4. The insight will appear in `/insights`

### Creating a Case Study

1. Create a new `.md` file in `src/content/process/case-studies/`
2. Use `category: "case-study"` in frontmatter
3. Include problem, solution, and results
4. The case study will appear in `/process/case-studies`

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
