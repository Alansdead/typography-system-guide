# Changelog

---

## [2026-06-22]

**JavaScript (script.js) — full rewrite for clarity and correctness**

- Removed the Manager object pattern (`TabManager`, `IOSScaler`, `ChecklistManager`, etc.) — replaced with plain functions, which is what the code actually needed
- Removed dead infrastructure: empty `ThemeManager` stub, `AnalyticsManager` (wrote to sessionStorage, never read back), `ErrorHandler` (same), `window.TypographyGuide` global export with unused `debounce`/`throttle`/`isInViewport` helpers, and `typographyGuideReady` custom event — none of this served any purpose on a static reference page
- Removed `FormManager` — there are no real forms, only sliders; kept the one useful bit (range `aria-valuetext`) and moved it inline
- Removed `ResponsiveManager` — it was toggling `flex-direction` on `.slider-wrapper` via JS on every resize; that belongs in a CSS media query
- Removed `PerformanceManager.setupLazyLoading` — was setting `contentVisibility: auto` on sections below the fold, which can cause layout shifts and is a premature optimisation on a page this size
- Consolidated the two scaler functions around a shared `buildDemos()` helper that derives element references from the base-size table; removed the 8-key `elements` object that had to be kept in sync by hand
- `aria-valuetext` on the iOS slider now announces the actual Dynamic Type size name ("Large (Default)", "AX5") instead of a generic percentage — more useful to screen-reader users
- `aria-valuetext` on the Android slider now announces "1.0x", "2.0x" etc. matching what the visible label shows
- TOC wired directly to the tab handler instead of via a `MutationObserver` watching for class changes your own code made — cleaner and removes an unnecessary indirection
- `IntersectionObserver` in scroll reveal now calls `unobserve()` after the first intersection so it stops watching elements that have already animated in
- Keyboard nav and focus-ring detection inlined into `DOMContentLoaded` (was `trackKeyboardNav()` and `setupRangeA11y()` — too small to be separate named functions)
- Comment style: removed narrating comments ("// Update display", "// Reset all tabs") and replaced with purposeful notes where the reason isn't obvious from the code

---

**HTML (index.html)**

- Moved `role="tablist"` off the `<nav>` landmark onto a `<div>` — `<nav>` + `role="tablist"` conflict; the tab widget is not site navigation
- Added `type="button"` to all 18 `<button>` elements — buttons inside or near a form default to `type="submit"` without it
- Fixed skipped heading levels: six `<h5>` headings that jumped directly from an `<h3>` parent were promoted to `<h4>` — the four "Step 1–4" testing headings correctly remain `<h5>` since they sit under an `<h4>`; the promoted headings are: "1. Implement Native Text Scaling", "2. Responsive Layout Design", "3. Handle Dynamic Changes", "Key Insight — Android 14 Non-Linear Curve", "iOS Testing", "Android Testing"
- Stripped all HTML comments — 79 comments removed, no content lost

---

**CSS (styles.css)**

- `font-size` on `.code-block-label` raised from `0.7rem` (11.2px) to `0.75rem` (12px)
- `font-size` on `.copy-btn` raised from `0.7rem` (11.2px) to `0.8rem` (12.8px)
- `font-size` on `.toc-title` raised from `0.68rem` (10.9px) to `0.75rem` (12px)
- `font-size` on `.toc-list .toc-sub a` raised from `0.74rem` (11.8px) to `0.78rem` (12.5px)
- Note: type specimen text (`.ios-caption-2` at 11px, `.android-label-small` at 11px, etc.) was deliberately left at platform-specified sizes — these demonstrate real iOS and Android values, not UI chrome
- Renamed `.requirement-item h5`, `.insight-box h5`, `.checklist-card h5`, and `#accessibility-panel .checklist-card h5` to `h4` to match the promoted heading levels in the HTML; `.section h5` left unchanged (the "Step" headings still use it)
- Fixed doubled `#accessibility-panel` selector at line 2100 — an orphaned `/* TL;DR pill */` comment was parsed as a selector, causing `#accessibility-panel .recommendations` to compile as `#accessibility-panel #accessibility-panel .recommendations` (matched nothing); collapsed to the correct single selector
- Removed empty `.intro-card.android {}` rule (comment-only body)
- Removed empty `.testing-guidelines h4 {}` rule
- Removed unused `:root { --color-bg-code: #000000; }` token (the value is set directly on `.code-block` and `.code-block pre`)
- Stripped all CSS comments — 79 blocks removed

---

**Mobile responsiveness**

- `.tabs` now wraps its buttons on narrow viewports instead of overflowing horizontally — tabs had `white-space: nowrap` and `flex: 1` which forced a horizontal scroll on phones below ~380px wide
- `.tab` minimum height set to 44px to meet the iOS HIG tap-target recommendation (and clear WCAG SC 2.5.8's 24px minimum)
- `.requirement-header` set to `flex-wrap: wrap` so the "Level AA — New in WCAG 2.2" badge drops below the heading on narrow screens instead of overflowing
- `.copy-btn` padding increased on mobile for a larger touch target
- `.slider-wrapper` flex-direction changed from JS to a CSS media query (`@media (max-width: 768px)`)

---

**Accessibility audit fixes**

- WAVE reported 3 contrast errors on `.copy-btn`: color was `#5a6a8a` on `#0a0a0a` (3.64:1, fails AA 4.5:1); changed to `#94a3c7` (7.85:1, passes AA)
- WCAG2Mobile reference corrected: was labelled "W3C Group Note" — correct status is "W3C Group Draft Note, published 6 May 2025"

---

## [2026-03-06]

**HTML Structure**
- Removed duplicate `<html>`, `<head>`, `<body>` tags — the outer broken shell had the wrong title, missing viewport meta, wrong CSS filename, and a duplicate script tag
- Fixed `<title>` to single clean version
- Removed duplicate `<script src="./script.js">` tag at the bottom

---

**iOS Section**
- Updated intro card to mention iOS 18 by name and clarify Dynamic Type as "12 sizes total — 7 standard (xSmall → xxxLarge) + 5 Larger Accessibility Sizes (AX1–AX5)"
- Changed all instances of "12 sizes" to "7 standard + 5 accessibility sizes" for accuracy (4 places)
- Replaced "XS to AX5" with "xSmall to AX5" in the testing step to match Apple's official naming
- Added body text scales to "approximately 310%" — flagged as approximate since Apple doesn't publish official percentages
- Added Large Content Viewer guidance (iOS 13+) with UIKit and SwiftUI code examples
- Extended the Dynamic Type slider from `max="6"` (7 sizes) to `max="11"` (12 sizes)
- Updated slider labels in JS from `['XS','S','M','L (Default)','XL','XXL','XXXL']` to correct Apple naming `['xSmall' … 'AX5']`
- Updated scale factors in JS from 7 values topping at 1.5x to 12 values up to 2.65x

---

**iOS Scaling Table**
- Updated caption to "Approximate measured values — Apple does not publish official percentages"
- Added `~` prefix to all AX5 values and scale factors
- Column header changed from "AX5 (Largest)" to "AX5 (approx.)"

---

**Android Section**
- Updated intro card to mention Android 14 by name, 200% maximum font scale, and non-linear scaling curve
- Updated implementation guidelines: test ceiling changed from "1.3x" to "2.0x"
- Added explicit warning to use `sp` for line heights, not `dp`, with explanation of why it breaks on Android 14+
- Updated XML code example to include `android:lineHeight="24sp"`
- Extended Android slider from `max="1.8"` to `max="2.0"`
- Added JS comment noting Android 14's 2.0x maximum

---

**Android Scaling Table**
- Replaced entirely — old table was linear extrapolation (`base × 2.0`), which is wrong for Android 14's non-linear curve
- New table uses real measured values from Android 14's `FontScaleConverter`
- Added Display Large (57sp) row showing it only reaches ~112% at 2.0x — the most important data point for designers
- Updated caption, column headers, and Key Insight text to reflect actual non-linear behavior
- Key insight rewritten: small text (8sp) exceeds 200% while large display text barely grows — the opposite of what the old table implied

---

**Accessibility Tab — New Sections Added**
- **SC 1.4.3 Contrast (Minimum)** — added as a full new section, covering 4.5:1 body / 3:1 large text split, placeholder text, disabled text, the Dynamic Type threshold interaction, Bold Text on iOS, High Contrast Text on Android, and text over gradients
- **SC 1.4.10 Reflow** — added, covering 320px viewport requirement and mobile-specific guidance
- **SC 1.4.12 Text Spacing** — added, covering line height, paragraph spacing, letter spacing, word spacing, iOS Bold Text, Android overrides, and WebView testing
- **SC 2.5.8 Target Size (Minimum)** — added, new in WCAG 2.2, covering 24×24px minimum, iOS 44pt and Android 48dp recommendations, and when targets are most likely to fail

---

**Accessibility Tab — Existing Content Updated**
- Intro card updated from "WCAG 2.1 AA" to "WCAG 2.2 AA" with publication date note
- SC 1.4.4 heading dash style normalized
- iOS testing checklist expanded from 4 to 5 items — added Large Content Viewer item
- Android testing checklist expanded from 4 to 5 items — added `sp` for line heights item and ADB command updated to `font_scale 2.0`
- Added **Truncation Issues** block to Common Issues checklist covering `line-clamp`, `lineLimit`, `ellipsize`, `truncationMode`, fixed heights in SwiftUI and Android XML, and the "most important words first" fallback rule

---

**W3C MATF Section**
- Replaced "ongoing W3C MATF discussions" framing with accurate status: WCAG 2.2 published October 2023, now the current standard
- All five bullet points rewritten to your exact wording
- Added dated footnote: "Last reviewed against WCAG 2.2 (October 2023), iOS 18, and Android 14"

---

**JavaScript (script.js)**
- Fixed critical bug: 11 instances of `$()` (returns first element only) replaced with `$$()` across 7 managers — `ChecklistManager`, `AnalyticsManager`, `FormManager`, `AccessibilityManager`, `PerformanceManager`, `ResponsiveManager`, `SmoothScrollManager` were all silently broken
- Fixed `window.TypographyGuide.utils` export — `$` was exported twice, `$$` was never exported
- `TabManager.handleKeydown` now handles `Home` (first tab) and `End` (last tab) keys — required by ARIA tabs pattern
- `activateTab` now sets `tabindex="0"` on the active panel for correct focus management
- `ThemeManager` replaced with a clean no-op stub since there's no toggle UI

---

**CSS (styles.css)**
- `--color-text-tertiary` raised from `#a1a1aa` (3.9:1 contrast — fails AA) to `#b4b4be` (4.6:1 — passes AA)
- Panel `fadeIn` animation wrapped in `@media (prefers-reduced-motion: no-preference)` so it respects the OS reduced motion setting
- Checked checklist items changed from `opacity: 0.7` (effective contrast ~3.5:1, fails AA) to `text-decoration: line-through` + `color: var(--color-text-tertiary)` for proper visual treatment without contrast failure

---

## [2025-05-27]

Fixed HTML Structure Issues

Problem: Accessibility sections appearing on all tabs instead of only the Accessibility Guidelines tab
Solution: Completely restructured HTML to properly contain sections within their respective panels
Result: Clean separation — iOS content only on iOS tab, Android only on Android tab, Accessibility only on Accessibility tab

Added Missing Accessibility Content

Assistive Technology vs. Accessibility Features section with color-coded comparison cards
Implementation Requirements for WCAG 1.4.4 Compliance with 3 detailed requirements:
- Implement Native Text Scaling (iOS UIKit/SwiftUI + Android XML/Compose code)
- Responsive Layout Design (Auto Layout + ConstraintLayout examples)
- Handle Dynamic Changes (Notification handling + Configuration changes)

Enhanced Android Font Scaling Demo

- Added 3 missing font sizes: Headline Large, Title Medium, Label Small
- Updated JavaScript to handle all 5 Android scaling elements
- Now matches iOS demo comprehensiveness

Improved Testing Process Organization

- Restructured testing into 4 clear steps with visual organization
- Added platform-specific setup instructions
- Created grid layouts for better scanability

Fixed CSS Errors

- Corrected `prefers-contrast: high` to `prefers-contrast: more`
- Added all missing CSS for new sections (compliance cards, implementation requirements, testing organization)

Complete Code Implementation

- Added iOS Swift code examples (UIKit + SwiftUI)
- Added Android code examples (XML + Compose)
- Proper syntax highlighting with dark code blocks
