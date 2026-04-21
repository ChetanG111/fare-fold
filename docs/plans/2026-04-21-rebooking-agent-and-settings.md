# Fare-Fold v2: Agent & Profile Evolution Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Evolve Fare-Fold into a premium, agent-driven flight rebooking platform with a consolidated user management experience and enhanced data visualization.

**Architecture:** 
- **Settings:** Centralized profile and preference management using server actions.
- **Agent:** Background polling logic (simulated) with threshold-based rebooking triggers.
- **UI:** Premium, luxury-refined aesthetic using the Maroon/Cream/Gold palette with high-end animations and glassmorphism.

**Tech Stack:** Next.js 15, Drizzle ORM, TailwindCSS, Lucide Icons, Framer Motion (for animations), Recharts (for data viz).

---

### Task 1: Branding & Layout Standardization

**Files:**
- Modify: `config/branding.ts`
- Modify: `app/[locale]/(main)/layout.tsx`

**Step 1: Update branding config**
Ensure all design tokens match the premium Maroon/Cream palette.

**Step 2: Add navigation to Settings**
Modify the dashboard layout to include a clear link to the new Settings page in the sidebar/header.

---

### Task 2: Settings & Profile Management Page

**Files:**
- Create: `app/[locale]/(main)/settings/page.tsx`
- Create: `components/settings/settings-page.tsx`
- Create: `components/settings/profile-form.tsx`
- Create: `components/settings/notification-settings.tsx`

**Step 1: Create the Settings page skeleton**
Implement the page with a clean, luxury-minimalist layout using Framer Motion for entrance animations.

**Step 2: Implement Profile Form**
Allow users to update their name, avatar (placeholder for now), and view their email.

**Step 3: Implement Notification Settings**
Add toggles for "Price Drop Alerts" and "Automatic Rebooking Notifications".

---

### Task 3: AI-Driven Rebooking Agent (Logic)

**Files:**
- Modify: `lib/fare-fold/service.ts`
- Modify: `app/api/fare-fold/route.ts`
- Create: `lib/fare-fold/agent.ts`

**Step 1: Define Rebooking Logic**
Implement a function `evaluateRebookingOpportunity` that compares current price history with the initial booking price and a configurable threshold (e.g., $50 savings).

**Step 2: Implement "Agent Mode" Trigger**
Add a manual "Run Price Check" trigger in the dashboard (for simulation/demo purposes) that calls the rebooking logic.

---

### Task 4: Dashboard Functional Enhancements

**Files:**
- Modify: `components/dashboard/dashboard.tsx`
- Create: `components/dashboard/savings-chart.tsx`
- Create: `components/dashboard/price-prediction-badge.tsx`

**Step 1: Add Savings Chart**
Integrate an area chart showing cumulative savings over time.

**Step 2: Add Price Prediction**
Implement a "Prediction: Price likely to drop in 48h" badge based on mock trends.

