# Typography System Guide for iOS and Android

A comprehensive interactive reference for implementing accessible typography in iOS and Android apps — covering platform type systems, interactive scaling demos, and WCAG 2.2 AA compliance.

## What's New

See [CHANGELOG.md](CHANGELOG.md) for the full release history.

## Features

- Complete iOS type scale with specs for all 12 Dynamic Type sizes (xSmall → AX5), including Larger Accessibility Sizes
- Material Design 3 typography for Android with real measured values for Android 14's non-linear font scaling (up to 2.0x)
- Interactive Dynamic Type demo (iOS) and Font Scaling demo (Android) with live preview across all sizes
- WCAG 2.2 AA accessibility coverage: SC 1.4.3 Contrast, 1.4.4 Resize Text, 1.4.10 Reflow, 1.4.12 Text Spacing, and SC 2.5.8 Target Size (Minimum)
- Implementation code samples for UIKit, SwiftUI, Android XML, and Jetpack Compose
- Sticky table of contents sidebar with scroll-aware highlighting
- Sticky tab navigation, back-to-top button, and in-page search
- Fully keyboard-navigable with correct ARIA tab pattern (roving tabindex, arrow key navigation)
- WCAG2Mobile reference — W3C Group Draft Note (published 6 May 2025), the current official W3C guidance on applying WCAG 2.2 to native mobile apps

## Preview

<img width="1300" height="324" alt="main screen of Typography System Guide" src="https://github.com/user-attachments/assets/2d2a042b-2cb0-481b-87a2-2c492abf6650" />

## How to Use

1. Clone the repository
1. Open `index.html` in your browser
1. Use the tab buttons to switch between iOS, Android, and Accessibility sections
1. Drag the sliders to preview text at different Dynamic Type / font scale settings

## Live Demo

https://alansdead.github.io/typography-system-guide/

## Built With

Plain HTML, CSS, and vanilla JavaScript — no frameworks or build tools required. Syntax highlighting via [Prism.js](https://prismjs.com/) (CDN).

## Accessibility

This guide is built to practice what it preaches:

- WCAG 2.2 AA contrast throughout (all text/background pairs verified)
- Correct ARIA tab pattern — tablist, roving tabindex, keyboard arrow navigation
- No skipped heading levels (h1 → h2 → h3 → h4 → h5 → h6)
- `type="button"` on all buttons to prevent accidental form submission
- Skip-to-main-content link
- `prefers-reduced-motion` respected for all animations
- `prefers-contrast: more` media query for high contrast mode

## License

[MIT](LICENSE)
