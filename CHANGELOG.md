# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Content Engine:** Implemented a blog and documentation system using MDX. 
  - Added `app/[locale]/(site)/blog` for blog posts.
  - Added `app/[locale]/(site)/docs` for documentation.
- **Feedback System:** Added a feedback widget component (`components/feedback/feedback-widget.tsx`) to allow users to submit feedback directly.
- **Notifications:** Added notification components (`components/notifications/`).
- **Database:** Updated schema to support feedback and notification systems.
- **Hooks:** Added `use-toast` hook for toast notifications.

## [0.0.3] - 2026-02-08

### Documentation
- Updated `SETUP_GUIDE.md` with detailed environment variable instructions for easier setup (`0922a35`).

### Features
- **Admin Dashboard:** Added a new admin dashboard route (`/admin`) for managing the platform (`3b4110c`).
- **Auth Bypass:** Implemented authentication bypass for local development ease (`3b4110c`).

### Miscellaneous
- **Roadmap:** Added `suggestions.md` outlining future improvements and features (`fd5a0ad`).
