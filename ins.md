# Build A Production-Grade Landing Page For This Startup Idea

## Idea
> "A startup that automatically negotiates flight prices by booking refundable fares and rebooking when prices drop."

## Context
- Treat this as a real 🎯 Consumer company launching today, not a loose concept.
- Derive a strong, brandable product name from the idea and use it consistently across the page.
- Define the most likely target user, their trigger moment, the pain they already feel, and the clearest paid offer.
- Keep the strategy, copy, and visuals specific to this idea. Avoid generic AI SaaS language or template copy.

## Repo Context
- If the selected agent file or shared project docs reference `SKILL.md`, skill folders, or inspiration docs, read the relevant ones before implementation.
- Do not merge rules from other agent-specific root files unless the selected agent file or project docs explicitly point to them.
- Do not ignore repo instructions. Only create a missing agent-context file if the project clearly uses that pattern and a minimal file would materially improve future consistency.

## Execution Constraints
- Work inside the existing repo conventions and current stack instead of introducing a new setup.
- Framework fit: Match the existing route, rendering, and styling conventions, and keep interactivity isolated to places that actually need it.
- Return production-ready code — no partial snippets or pseudo-code.
- Make strong, opinionated design decisions.
- Write specific, benefit-driven copy — no placeholders.
- If the repo includes `CLAUDE.md`, treat it as project-specific context and follow it.
- Return production-ready code only. No pseudo-code, placeholders, or partial sections.

## Before Coding, Explicitly Define
### 1. Visual Thesis
- One sentence on mood, material feel, and energy.

### 2. Content Plan
- Hero: brand + bold promise
- Context / Why Now: why this matters now
- Problem / Solution: 3 pains and how the product resolves them
- Feature Detail: 4-6 features with concrete benefits
- Social Proof: 2 testimonials + 3 trust stats
- Pricing / Offer: the most credible monetization model for this product
- FAQ: 5 real objections
- Final CTA: direct close with clear next step

### 3. Interaction Thesis
- Use exactly 2-3 intentional motions.
- Motion must support hierarchy or product presence, not decoration.
- Respect prefers-reduced-motion.

### 4. Accessibility Notes
- Semantic HTML, correct headings and landmarks, visible focus states, keyboard support, meaningful alt text, and WCAG 2.2 AA contrast.

### 5. Design System
- Exact font family decision: choose the best headline font and the best body/UI font for this idea, explain why they fit the brand, and use no more than 2 typefaces total.
- Exact theme colors: define concrete theme tokens for background, surface, text, muted text, border, accent, and accent-foreground.
- Keep the palette disciplined: mostly neutrals plus 1 accent color. Do not use 4-5 competing colors or a messy gradient-heavy scheme.
- Typography scale with sizes and weights.
- Spacing scale using a 4px rhythm.
- CSS variables or design tokens.
- Borders, shadows, and radii.

### 6. Precision Audit
- Define the visual quality bar for spacing, alignment, card sizing, button sizing, and section balance before implementation.
- The page must feel pixel-perfect, measured, and clean rather than approximate.

### 7. Visual Archetype
- Derive a specific visual archetype from the idea itself, not just the category.
- Use that archetype to drive font pairing, theme colors, spacing density, hero composition, product imagery, and section emphasis.

## Idea-Specific Direction
- Audience angle: Speak to an everyday user who wants a sharper habit, less noise, and immediate personal payoff.
- Product surface: Favor a mobile-first product story or digest-style interface if that feels more credible than a generic browser dashboard.
- Visual direction: Use a warm editorial feel with crisp typography, content surfaces, and a product composition that feels personal rather than corporate.
- Theme discipline: Use warm neutrals and one refined accent. A tasteful editorial-style headline font can work if it improves the brand, but pair it with a clean UI/body sans so the page still feels modern and easy to scan.
- Offer model: Prefer a consumer-friendly offer such as free + premium, personal + family, or a simple monthly subscription model.
- Proof to emphasize: Use believable consumer proof such as daily actives, time saved, streak retention, completion rate, or session frequency.

## Visual Archetype
- Archetype: Lifestyle Precision
- Why it fits: The product is consumer-facing, so the page should feel personal, premium, and emotionally legible rather than enterprise-heavy.
- Typography direction: Use a characterful but polished heading style with a clean sans for support copy and UI.
- Color mood: Use warm or soft neutrals with one refined accent.
- Layout behavior: Use a hero-led composition with product visuals that feel intimate and habit-oriented.
- Product visualization: Show personalized moments, mobile states, or habit-driven interfaces.
- Motion behavior: Use subtle, polished motion that supports presence without visual clutter.
- Section emphasis: Put extra emphasis on the user outcome, ease of adoption, and emotional resonance.

## Page Requirements
### 1. Hero
- Create a sharp product name derived from the idea.
- Write a headline with a clear value proposition and a supporting subheadline that explains who it is for and why it matters now.
- Include one primary CTA and one lower-friction secondary CTA.
- Make the first viewport feel like one unified composition.
- Brand first. The page should still feel distinctive even without the nav.
- Do not use a generic hero card unless the product UI itself is the primary interaction.

### 2. Context / Why Now
- Explain the market shift, behavioral change, or user frustration that makes this product relevant right now.
- Add 2-3 short proof points, stats, or credibility signals that feel plausible for this idea.

### 3. Problem / Solution
- Surface 3 concrete pain points the target customer already feels.
- Explain exactly how this product solves them better than the status quo.

### 4. Feature Detail
- Create 4-6 features.
- For each feature, include a name, one short benefit-driven description, and a suggested Lucide icon.

### 5. Social Proof
- Write 2 realistic testimonials with name, role, company, and a quote that sounds specific rather than generic.
- Add 3 stats that support trust or momentum.

### 6. Pricing / Offer
- Choose a pricing or offer structure that fits the category and buying motion.
- Use 3 tiers or an equally clear offer structure if that is more credible.
- Mark one option as the recommended choice.

### 7. FAQ
- Answer 5 real objections with short, confident responses.

### 8. Final CTA
- End with a clear closing headline, one sentence of support copy, and a direct CTA.

## Copy Rules
- Lead with the outcome, not the feature list.
- Use specific, benefit-driven copy written for the likely buyer.
- Keep sections concise, scannable, and commercially sharp.
- Avoid placeholders, vague buzzwords, and filler text.

## UI Rules
- Use a calm, premium hierarchy with strong contrast and restrained accent use.
- Prefer border-led surfaces, subtle radii, and crisp typography over flashy effects.
- The theme must feel aesthetic and professional, not colorful for the sake of being colorful.
- Choose font families that fit the product story. Do not default to generic fonts unless they are clearly the strongest choice.
- Two ideas in the same category should still be allowed to look meaningfully different if their promise, audience, or emotional tone differs.
- Keep the palette tight: neutrals plus one accent is the default.
- Make spacing feel exact. Audit every gap, padding, margin, and max-width so the layout feels deliberate rather than loose.
- If the design uses cards, make card heights, padding, border treatment, icon sizing, and headline rhythm feel consistent and balanced.
- Avoid floppy sections, oversized UI, weak alignment, and random whitespace.
- Push toward a pixel-perfect result on both desktop and mobile.
- Keep the component structure clean and manageable for a solo developer.
- Avoid over-engineering or unnecessary folders.
- Make the layout excellent on desktop and mobile.

## SEO Metadata
- Provide a page title under 60 characters.
- Provide a meta description under 155 characters.
- Provide descriptive OG image alt text.

## Delivery
- Return the full implementation, not a partial snippet or a planning document.
- Make the result specific enough that it can be generated well in one pass.

## Design QA Checklist
- Confirm the first viewport reads as one unified composition and the brand is visually dominant.
- Confirm the font pairing fits the idea, feels intentional, and does not fall back to generic defaults without reason.
- Confirm the theme stays disciplined: mostly neutrals plus one accent, with clean contrast and no messy extra colors.
- Confirm spacing follows a consistent 4px rhythm and section spacing feels deliberate rather than loose.
- Confirm any cards use balanced heights, padding, icon sizing, border treatment, and headline rhythm.
- Confirm buttons, inputs, badges, and nav elements feel proportionate and not oversized.
- Confirm desktop and mobile layouts both feel polished, aligned, and visually calm.
- Confirm motion is minimal, purposeful, and respects prefers-reduced-motion.
- Confirm there are no placeholders, weak copy blocks, awkward gaps, or sloppy alignment.
- If any item fails, refine the implementation before stopping.