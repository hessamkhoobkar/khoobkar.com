<!-- Inventory of current content and routing, mapped to keep/merge/remove -->
# Content Inventory

## Summary
- Keep: Home, Work, Projects, Insights, About, Contact
- Remove: Resources (content, routes, links, assets)
- Review/Merge: Case Studies under Work vs Projects (dedupe where overlapping)

## Content Tree (src/content)

### Blog (keep)
- ai-revolutionizing-web-development.md
- building-modern-web-apps.md
- developer-productivity-tools.md
- modern-css-features.md
- responsive-design-best-practices.md
- web-performance-optimization.md
- welcome-to-khoobkar.md

Notes: Keep as historical/context posts. Ensure tone consistent (non-salesy).

### Case Studies (keep, review for merge with Projects)
- accessibility-transformation.md
- design-system-implementation.md
- e-commerce-conversion-boost.md
- e-commerce-platform-redesign.md
- pwa-mobile-app-replacement.md
- saas-dashboard-transformation.md

Actions: Standardize outcomes; merge into Projects when overlap is high.

### Insights (keep, adjust tone)
- hidden-cost-technical-debt.md

Actions: Ensure editorial guideline (heartfelt technical rants); add tags.

### Projects (keep, make centerpiece)
- saas-analytics-platform.md
- webgl-particle-system.md

Actions: Standardize front‑matter; add outcomes/visuals; curate order.

### Resources (remove)
- essential-dev-tools.md
- modern-css-layout-techniques.md
- react-performance-optimization.md
- svelte-vs-react-comparison.md
- typescript-best-practices.md

Actions: Delete all; update any internal links pointing to /resources.

### Work (folder present; content via routes) (keep)
Actions: Keep Work route; ensure it lists case studies distinctly from Projects or acts as filtered view.

## Routes (src/routes)

Keep
- / (+page.svelte)
- /about
- /contact
- /insights (+list and [slug])
- /projects (+list and [slug])
- /work (+list and [slug])

Remove
- /resources (+list and [slug])

## Assets (static/images)
- blog/: keep
- resources/: remove folder if empty after deletions

## Link and Copy Sweep
- Remove/replace any links to /resources in content or components
- Adjust copy that mentions “insights and resources” to drop “resources”


