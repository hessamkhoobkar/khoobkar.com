# Portfolio Website Pre-Launch Checklist

> **Last Updated**: October 9, 2025  
> **Target Personas**: Alex the Recruiter | Jordan the Freelance Client | Sam the Peer Developer

---

## 🚨 CRITICAL PRIORITIES (Must Complete Before Launch)

### Content & Authenticity

- [ ] **1. Update Generic Content to Personal**
  - [ ] Remove all "Khoobkar Team" references and replace with personal voice
  - [ ] Change blog post authors from "Khoobkar Team" to "Hessam Khoobkar"
  - [ ] Update blog content - currently reads as company blog, not personal portfolio
  - [ ] Remove "We" language throughout; use "I" (e.g., "Our Mission" → "My Approach")
  - [ ] Update `/welcome-to-khoobkar` blog post to reflect personal story, not company launch

- [ ] **2. Work Portfolio - EMPTY!**
  - [ ] **URGENT**: `/src/content/work/` directory is completely empty
  - [ ] Add real case studies for actual work:
    - [ ] POMECHAIN (Vue.js Component Library)
    - [ ] Coinhaven (React to SvelteKit migration)
    - [ ] Piller Iddaa (Betting platform)
    - [ ] Shabakeh Gostar Kayer projects
  - [ ] Create detailed case studies with:
    - [ ] Problem/Solution/Results format
    - [ ] Real metrics and outcomes
    - [ ] Screenshots or mockups
    - [ ] Technologies used
    - [ ] Your specific contributions

- [ ] **3. Missing Portfolio Images**
  - [ ] No images in `/static/images/` for case studies
  - [ ] Only 2 blog images exist (welcome.jpg, sveltekit-guide.jpg)
  - [ ] Create/add portfolio project screenshots
  - [ ] Add case study hero images
  - [ ] Consider adding personal photo (currently showing placeholder "HK" avatar)

- [ ] **4. Inconsistent Experience Claims**
  - [ ] Homepage says "10+ years" in meta description
  - [ ] About page says "6+ years"
  - [ ] Decide on accurate number and make consistent everywhere
  - [ ] Your resume shows 6+ years - recommend using this consistently

---

## 📝 CONTENT TASKS

### For Alex the Recruiter (Quick Evaluation)

- [ ] **5. Create a Resume/CV Download**
  - [ ] Add downloadable PDF resume on About page
  - [ ] Add "Download Resume" CTA for recruiters
  - [ ] Ensure resume highlights senior-level expertise

- [ ] **6. Add Technical Skills Assessment**
  - [ ] Consider adding proficiency levels to tech stack (Expert/Advanced/Intermediate)
  - [ ] Add years of experience with each major framework

- [ ] **7. Work Availability & Location**
  - [x] Location shown (Tallinn, Estonia)
  - [ ] Clarify work authorization/visa status for EU/international
  - [ ] Add timezone (EET/EEST) for remote work clarity

### For Jordan the Freelance Client (Trust Building)

- [ ] **8. Add Real Testimonials**
  - [ ] Services page has **fake testimonials** (Sarah Johnson, Michael Chen, Emily Rodriguez)
  - [ ] Replace with real client testimonials OR remove section entirely
  - [ ] If real testimonials unavailable, add LinkedIn recommendations instead
  - [ ] Consider video testimonials if possible

- [ ] **9. Add Client Logos/Social Proof**
  - [ ] Add logos of companies you've worked with (with permission)
  - [ ] POMECHAIN, Coinhaven, Piller Iddaa logos/mentions
  - [ ] "Trusted by" or "Worked with" section

- [ ] **10. Pricing Transparency**
  - [ ] Services page has starting prices ($2,500-$7,000)
  - [ ] Consider if these are accurate for your market/experience
  - [ ] Add hourly rate as alternative option
  - [ ] Create simple pricing calculator or questionnaire

- [ ] **11. Project Process Documentation**
  - [x] Services page has 5-step process
  - [ ] Add estimated timelines for each phase
  - [ ] Add communication frequency expectations
  - [ ] Define deliverables for each phase

### For Sam the Peer Developer (Learning & Networking)

- [ ] **12. Enhance Blog Content**
  - [ ] 7 blog posts exist but feel generic
  - [ ] Add personal insights and experiences to each post
  - [ ] Add code examples and real-world scenarios
  - [ ] Write about your actual POMECHAIN/Coinhaven migration experience
  - [ ] Share performance optimization lessons learned

- [ ] **13. Resources Section - Currently Empty**
  - [ ] Add actual developer resources (currently just placeholders)
  - [ ] Share your favorite tools
  - [ ] Create code snippet library
  - [ ] Add your dotfiles or setup guide
  - [ ] Share learning resources that helped you

- [ ] **14. Add /now Page Content**
  - [ ] /now route exists but no content visible
  - [ ] Document current projects
  - [ ] What you're learning
  - [ ] Books you're reading
  - [ ] Technologies you're exploring

- [ ] **15. Social Proof for Developers**
  - [ ] Link to actual GitHub profile (currently shows khoobkar org, not hessamkhoobkar)
  - [ ] Add GitHub contributions/stats
  - [ ] Link to open-source contributions
  - [ ] Add npm packages if you've published any

---

## 🎨 DESIGN & UX TASKS

- [ ] **16. Visual Identity**
  - [ ] Add actual headshot/professional photo instead of "HK" placeholder
  - [ ] Consider adding personality through photography
  - [ ] Ensure consistent brand colors throughout

- [ ] **17. Mobile Optimization**
  - [ ] Test all pages on mobile devices
  - [ ] Verify navigation works smoothly on mobile
  - [ ] Check hero sections don't feel too tall on mobile
  - [ ] Test contact forms on mobile

- [ ] **18. Accessibility (WCAG)**
  - [ ] Run accessibility audit (Lighthouse/axe DevTools)
  - [ ] Ensure keyboard navigation works everywhere
  - [ ] Check color contrast ratios
  - [ ] Add proper ARIA labels where needed
  - [ ] Test with screen readers

- [ ] **19. Loading States & Error Handling**
  - [ ] Add better error states for failed content loading
  - [ ] Improve loading skeletons
  - [ ] Add 404 page
  - [ ] Add error boundary for React-like error catching

---

## ⚡ TECHNICAL TASKS

### Performance

- [ ] **20. Image Optimization**
  - [ ] Add responsive images with srcset
  - [ ] Implement lazy loading for portfolio images
  - [ ] Convert images to WebP/AVIF formats
  - [ ] Add proper image dimensions to prevent CLS

- [ ] **21. Bundle Optimization**
  - [ ] Check bundle size with `vite build --analyze`
  - [ ] Lazy load GSAP animations
  - [ ] Code split route components
  - [ ] Lazy load Three.js (used in Silk component)

- [ ] **22. Performance Metrics**
  - [ ] Run Lighthouse audit
  - [ ] Achieve 90+ scores on all metrics
  - [ ] Optimize Core Web Vitals (LCP, FID, CLS)
  - [ ] Test on slow 3G connection

### SEO & Metadata

- [ ] **23. SEO Fundamentals**
  - [ ] Add sitemap.xml (currently missing)
  - [x] robots.txt exists but very permissive
  - [ ] Add Open Graph images for all pages
  - [ ] Create og-image templates for blog posts
  - [ ] Add structured data (JSON-LD) to all pages
  - [ ] Verify meta descriptions are under 160 characters
  - [ ] Add canonical URLs

- [ ] **24. Analytics & Tracking**
  - [ ] Add Google Analytics or privacy-friendly alternative (Plausible/Fathom)
  - [ ] Set up goal tracking for contact form
  - [ ] Track portfolio project views
  - [ ] Monitor which services pages get most traffic
  - [ ] Add event tracking for CTA clicks

- [ ] **25. Social Media Integration**
  - [ ] Update social links in `navigation.ts` - currently generic
    - [ ] Twitter: @khoobkar → @hessamkhoobkar (if exists)
    - [x] LinkedIn: company/khoobkar → in/hessam-khoobkar
    - [x] GitHub: khoobkar → hessamkhoobkar
  - [ ] Add social sharing buttons to blog posts
  - [ ] Create social media card templates

### Security & Privacy

- [ ] **26. Privacy & Legal**
  - [ ] Create Privacy Policy page (link exists in footer but no page)
  - [ ] Create Terms of Service page (link exists in footer but no page)
  - [ ] Add cookie consent if using analytics
  - [ ] Ensure GDPR compliance for contact form
  - [ ] Add data handling transparency

- [ ] **27. Contact Form**
  - [ ] Contact page only has mailto and Calendly links
  - [ ] Consider adding actual contact form with validation
  - [ ] Add form spam protection (reCAPTCHA or honeypot)
  - [ ] Set up form backend (FormSpree, Web3Forms, or custom)
  - [ ] Add auto-reply email confirmation

- [ ] **28. Email Setup**
  - [ ] Using Gmail address (amirhessam.dev@gmail.com)
  - [ ] Consider professional domain email (hello@khoobkar.com)
  - [ ] Set up email signature with portfolio link

---

## 🔍 SEO & MARKETING TASKS

- [ ] **29. Content SEO**
  - [ ] Research keywords for target personas
  - [ ] Optimize blog posts for relevant keywords
  - [ ] Add internal linking strategy
  - [ ] Create content calendar for post-launch

- [ ] **30. Local SEO (if targeting Estonian market)**
  - [ ] Add Google My Business listing
  - [ ] Add local schema markup
  - [ ] Join Estonian developer communities

- [ ] **31. Professional Profiles**
  - [ ] Update LinkedIn with portfolio link
  - [ ] Update GitHub README with portfolio link
  - [ ] Add portfolio to dev.to, Medium bio
  - [ ] Create Dribbble portfolio (link exists in contact)
  - [ ] Consider Twitter/X presence for developer persona

---

## 🧪 TESTING & QA

- [ ] **32. Cross-Browser Testing**
  - [ ] Test on Chrome, Firefox, Safari, Edge
  - [ ] Test on iOS Safari and Android Chrome
  - [ ] Check for browser-specific CSS issues
  - [ ] Verify GSAP animations work everywhere

- [ ] **33. Functional Testing**
  - [ ] Test all navigation links
  - [ ] Verify all CTAs work correctly
  - [ ] Test mailto links
  - [ ] Test Calendly integration
  - [ ] Check all external links open in new tab
  - [ ] Verify loading states don't flash

- [ ] **34. Content Review**
  - [ ] Proofread all content for typos
  - [ ] Check grammar with Grammarly/LanguageTool
  - [ ] Verify all dates are current
  - [ ] Check for broken images
  - [ ] Verify consistency in terminology

- [ ] **35. Performance Testing**
  - [ ] Test on slow network
  - [ ] Test with JavaScript disabled (progressive enhancement)
  - [ ] Check memory leaks (especially GSAP animations)
  - [ ] Test long scroll behavior

---

## 🚀 PRE-LAUNCH CHECKLIST

- [ ] **36. Domain & Hosting**
  - [ ] Verify khoobkar.com DNS settings
  - [ ] Set up SSL certificate (Vercel should handle this)
  - [ ] Configure custom domain on Vercel
  - [ ] Set up www redirect

- [ ] **37. Backup & Version Control**
  - [x] Git repository exists
  - [ ] Create backup of current version
  - [ ] Tag release version (v1.0.0)
  - [ ] Document deployment process

- [ ] **38. Launch Preparation**
  - [ ] Create launch announcement post
  - [ ] Prepare social media announcements
  - [ ] Schedule launch posts
  - [ ] Notify network about new site

- [ ] **39. Post-Launch Monitoring**
  - [ ] Set up uptime monitoring (UptimeRobot)
  - [ ] Monitor analytics for first week
  - [ ] Check for 404s in Search Console
  - [ ] Monitor contact form submissions
  - [ ] Set up error tracking (Sentry)

---

## 📊 PRIORITY RANKING

### 🔴 MUST DO BEFORE LAUNCH (Blockers)

1. ❌ Create real portfolio case studies in `/src/content/work/`
2. ❌ Remove fake testimonials from Services page
3. ❌ Add portfolio project images
4. ❌ Fix experience years inconsistency (6+ vs 10+)
5. ❌ Update all "company" language to personal voice
6. ❌ Add Privacy Policy and Terms pages
7. ❌ Update social media links to personal accounts
8. ❌ Add real headshot photo
9. ❌ Create sitemap.xml
10. ❌ Run full content proofread

### 🟡 SHOULD DO BEFORE LAUNCH (Important)

11. ⚠️ Add real testimonials or remove section
12. ⚠️ Set up contact form
13. ⚠️ Add downloadable resume
14. ⚠️ Populate Resources section with real content
15. ⚠️ Add analytics tracking
16. ⚠️ Create /now page content
17. ⚠️ Run Lighthouse audit and fix issues
18. ⚠️ Cross-browser testing
19. ⚠️ Add Open Graph images
20. ⚠️ Professional email setup

### 🟢 NICE TO HAVE (Post-Launch OK)

21. Blog content enhancement
22. GitHub stats widget
23. Video testimonials
24. Pricing calculator
25. Advanced animations
26. Multiple language support
27. Dark/light mode refinement

---

## 💡 RECOMMENDATIONS BY PERSONA

### For Alex the Recruiter (Speed & Clarity)

- **Add "Hire Me" or "Available for Full-Time" badge** prominently on homepage
- **Resume download** in header/about page
- **Quick skills snapshot** - make tech stack scannable
- **Performance metrics** dashboard showing your impact numbers

### For Jordan the Freelance Client (Trust & Results)

- **Real case studies with results** - this is your #1 priority
- **Client testimonials** - get 3-5 real ones
- **Clear pricing** and process transparency
- **Response time guarantee** (you already mention 24h - good!)
- **Portfolio diversity** - show range of projects

### For Sam the Peer Developer (Learning & Connection)

- **Share actual code** - GitHub, CodePen examples
- **Write about real challenges** you've solved
- **Engage on social** - Twitter threads, LinkedIn posts
- **Open source** contributions visibility
- **"How I built this site"** meta-blog post

---

## ⏱️ ESTIMATED TIMELINE

### Critical Tasks (Week 1-2): 40-60 hours

- Portfolio case studies creation: 20-30 hours
- Content cleanup and rewrite: 15-20 hours
- Image creation: 5-10 hours

### Important Tasks (Week 3): 20-30 hours

- Technical improvements: 10-15 hours
- SEO setup: 5-8 hours
- Testing: 5-7 hours

### Nice-to-Have (Post-Launch): Ongoing

- Content creation: 2-4 hours/week
- Performance monitoring: 1-2 hours/week

---

## Current findings. 

- 

