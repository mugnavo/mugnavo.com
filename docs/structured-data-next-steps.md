# Structured Data Next Steps

The current implementation intentionally stays minimal and truthful. These are the next structured-data upgrades that will become useful for this agency site once the supporting business or content data exists.

Page-level JSON-LD is passed to `BaseLayout` through its `structuredData` prop; the layout already emits the site-wide `Organization` and `WebSite` graph on every page.

Avoid making up new data, and prefer to infer from the ones we already have in our pages and consts. Keep implementation simple. Consider it for all important marketing pages. If necessary, add more centralized data to `/src/lib/consts.ts`.

## 1. Add `ProfessionalService` or `LocalBusiness`

Use this only after the site has stable business details such as a phone number, address, service area, and social profiles.

Useful fields to add later:

- `telephone`
- `address`
- `areaServed`
- `sameAs`
- `openingHoursSpecification`

Example:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Mugnavo",
  "url": "https://mugnavo.com",
  "email": "hello@mugnavo.com",
  "telephone": "+63-000-000-0000",
  "areaServed": ["Philippines", "Worldwide"],
  "sameAs": ["https://www.linkedin.com/company/mugnavo", "https://github.com/mugnavo"]
}
```

## 2. Add `FAQPage` for sales objections and process questions

This is a strong fit for an agency site once the services or contact page includes real question-and-answer content.

Good candidates:

- pricing expectations
- project timelines
- tech stack and maintenance
- how discovery or handoff works

Example:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does a typical website project take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most marketing websites take between 3 and 6 weeks depending on scope and feedback cycles."
      }
    }
  ]
}
```

## 3. Add portfolio-level schema once real case studies exist

The current `work` page is still placeholder content, so `WebPage` is the right choice today. Once the site has real projects, add a listing schema on the work index and a richer schema per case study page.

Useful content to model later:

- client name
- project URL
- launch date
- outcomes or metrics
- screenshots or cover images

Example index shape:

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Work – Mugnavo",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "CreativeWork",
          "name": "Krafta website rebuild",
          "url": "https://mugnavo.com/work/krafta"
        }
      }
    ]
  }
}
```

## 4. Add `BreadcrumbList` when page hierarchy is more established

Breadcrumb schema becomes more useful when the site has deeper content trees, especially for blog posts and future case studies.

Example:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Blog",
      "item": "https://mugnavo.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Structured data planning",
      "item": "https://mugnavo.com/blog/structured-data-planning"
    }
  ]
}
```

## 5. Strengthen `BlogPosting` as the editorial layer matures

The blog schema is already live, but it can become richer when posts consistently include more frontmatter.

Useful future fields:

- cover image for every post
- `updatedDate`
- categories or tags
- author avatar or author profile page
- citations or references for more authoritative articles

Recommended content-model example:

```yaml
title: "Improving conversion on service websites"
description: "What actually changes lead quality on a modern agency website."
image: "/images/blog/conversion-audit.webp"
pubDate: "2026-04-17"
updatedDate: "2026-04-20"
author:
  name: "Nathaniel John Tampus"
  url: "https://nize.ph"
tags:
  - SEO
  - CRO
  - Web Strategy
```

## 6. Add organization trust signals for AI and search systems

This is especially useful for an agency site because buyers and AI assistants both benefit from clear attribution and contact signals.

Recommended additions later:

- dedicated about page
- founder or team profiles
- client logos or testimonials with permission
- public social profiles
- a plain-language `llms.txt` route summarizing services, industries, and contact paths

These upgrades should be added only when the corresponding site content is live and can be kept accurate.
