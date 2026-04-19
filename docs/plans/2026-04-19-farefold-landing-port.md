# FareFold Landing Port Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Port the `index.html` FareFold landing page into the existing Next.js SaaS starter.

**Architecture:** Keep the starter routing, auth, payments, and locale shell intact. Replace only the public site components, brand metadata, and design tokens needed for the FareFold landing experience.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS 4, next/font, next-intl routing.

---

### Task 1: Brand foundation

**Files:**
- Modify: `config/fonts.ts`
- Modify: `config/branding.ts`
- Modify: `lib/seo.ts`
- Modify: `app/[locale]/layout.tsx`
- Modify: `app/_styles/globals.css`

**Steps:**
1. Switch display/body fonts to Fraunces and Manrope.
2. Update brand name, support email, SEO title, description, keywords, and app icons.
3. Add FareFold CSS variables, page background, focus states, and reduced-motion handling.
4. Run type/lint checks.

### Task 2: Landing page sections

**Files:**
- Modify: `app/[locale]/page.tsx`
- Modify: `app/[locale]/(site)/navbar.tsx`
- Modify: `app/[locale]/(site)/hero.tsx`
- Modify: `app/[locale]/(site)/features.tsx`
- Modify: `app/[locale]/(site)/pricing.tsx`
- Modify: `app/[locale]/(site)/testimonials.tsx`
- Modify: `app/[locale]/(site)/faq.tsx`
- Modify: `app/[locale]/(site)/cta.tsx`
- Modify: `app/[locale]/(site)/footer.tsx`
- Modify: `app/[locale]/(site)/grid-layout.tsx`

**Steps:**
1. Replace starter boilerplate copy with FareFold content from `index.html`.
2. Recreate the product preview, tickets, proof tiles, feature cards, pricing cards, testimonials, stats, FAQ, CTA, and footer.
3. Keep components server-rendered unless they need client state.
4. Preserve accessible headings, section anchors, and mobile navigation.
5. Build and review the page locally.
