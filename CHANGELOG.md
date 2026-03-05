# Changelog
## [2026-03-05]

As of 2025, Dynamic Type has 12 sizes: xSmall, Small, Medium, Large (default), xLarge, xxLarge, xxxLarge, AX1, AX2, AX3, AX4, AX5. The guide says "XS to AX5" which is correct in range but uses inconsistent abbreviations — "XS/S/M/L/XL/XXL/XXXL" should be written out as "xSmall through xxxLarge" to match Apple's exact naming.
The guide's testing section says "Test all Dynamic Type sizes (XS to AX5)" — that's fine for intent, but the label in the JS slider only goes up to XXXL with 7 steps. If Larger Accessibility Sizes is enabled, 5 more text sizes become available, making 12 total. The slider is missing AX1–AX5 entirely.
Apple's App Store Connect now evaluates Larger Text support, and apps should support body text scaling to 200% or more — Dynamic Type on iOS allows body text sizes over 300%. The guide caps its recommendation at 200%, which meets WCAG but undersells what iOS actually requires for a good experience.
WWDC24 introduced the Large Content Viewer as the recommended solution for navigation controls like tab bars that can't grow with Dynamic Type. The guide doesn't mention this at all.
The font size values in the type cards (34pt, 28pt, 22pt etc.) are still accurate — these are the standard Dynamic Type default sizes and haven't changed.

---
This is the bigger problem. Starting with Android 14, the maximum font scale increased from 130% to 200%, and the system now applies a non-linear scaling curve so that large text doesn't scale at the same rate as smaller text.
The guide's testing section says "Test font scale 0.85x to 1.3x"—that ceiling is incorrect. Android 13 topped out at 130% on Pixels, but Android 14 goes to 200%. The guide needs to say 0.85x to 2.0x.
Because font scaling is non-linear in Android 14+, the scaledDensity field is no longer accurate, and lineHeight should always use sp units instead of dp so it scales with text. The guide doesn't mention non-linear scaling at all, which is a significant omission for a typography guide.
The Material Design 3 type scale naming in the guide is correct (Display, Headline, Title, Body, Label). Material 3's old h1/h2/body1 naming from Material 2 is gone — and the guide already uses the correct M3 names, so that's fine.
Material Design 3 recommends a minimum of 14sp for body text and never set touch targets below 48dp. The guide recommends "minimum 16sp/17pt for body text" in the Best Practices section, which is slightly more conservative than M3's own minimum — that's not wrong, but worth noting as a discrepancy.
The guide references WCAG AA contrast (4.5:1 for normal text, 3:1 for large text) which is still correct. But it's missing two relevant SC updates from WCAG 2.1/2.2 that directly affect mobile typography:
WCAG 2.5.8 Target Size (Minimum) at AA requires interactive elements to have a minimum target size of 24×24 CSS pixels — the guide's testing checklist doesn't mention this.
WCAG 1.4.12 Text Spacing requires that no loss of content or functionality occurs when users set: line height to at least 1.5× font size, paragraph spacing to at least 2× font size, letter spacing to at least 0.12× font size, and word spacing to at least 0.16× font size. This SC isn't mentioned anywhere in the guide, even though the Accessibility Guidelines tab has a full testing section.
WCAG 1.4.10 Reflow (AA) requires content to reflow without horizontal scrolling at 400% zoom (equivalent to a 320px-wide viewport) — also absent from the guide.

## [2025-05-27]
Fixed HTML Structure Issues

Problem: Accessibility sections appearing on all tabs instead of only the Accessibility Guidelines tab
Solution: Completely restructured HTML to properly contain sections within their respective panels
Result: Clean separation - iOS content only on iOS tab, Android only on Android tab, Accessibility only on Accessibility tab

✅ Added Missing Accessibility Content

Assistive Technology vs. Accessibility Features section with color-coded comparison cards
Implementation Requirements for WCAG 1.4.4 Compliance with 3 detailed requirements:

Implement Native Text Scaling (iOS UIKit/SwiftUI + Android XML/Compose code)
Responsive Layout Design (Auto Layout + ConstraintLayout examples)
Handle Dynamic Changes (Notification handling + Configuration changes)



✅ Enhanced Android Font Scaling Demo

Added 3 missing font sizes: Headline Large, Title Medium, Label Small
Updated JavaScript to handle all 5 Android scaling elements
Now matches iOS demo comprehensiveness

✅ Improved Testing Process Organization

Restructured testing into 4 clear steps with visual organization
Added platform-specific setup instructions with emojis
Color-coded sections: blue (setup), green (criteria), red (issues), teal (documentation)
Created grid layouts for better scanability

✅ Fixed CSS Errors

Corrected prefers-contrast: high to prefers-contrast: more
Added all missing CSS for new sections (compliance cards, implementation requirements, testing organization)

✅ Complete Code Implementation

Added iOS Swift code examples (UIKit + SwiftUI)
Added Android code examples (XML + Compose)
Proper syntax highlighting with dark code blocks

📋 Current Status

HTML: Complete, properly structured, WCAG compliant
CSS: Complete, error-free, responsive design
JavaScript: Complete, accessible interactions
Content: All original sections included and organized
Structure: Clean separation between platform-specific content
