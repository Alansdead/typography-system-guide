# Changelog

## [2025-05-23]
### Accessibility and Validation Improvements
- Added headings (`<h2>`, `<h3>`, `<h4>`) to all `<section>` and `<article>` elements, including visually hidden `.sr-only` headings where appropriate, for improved screen reader support and W3C compliance.
- Removed `role="main"` from the `<main>` element to eliminate unnecessary ARIA roles.
- Removed invalid ARIA attributes (`aria-valuemin`, `aria-valuemax`) from `<input type="range">` elements, as these are redundant with the `min` and `max` attributes.
- Added a `.sr-only` CSS class for visually hidden headings and improved accessibility.
- Ensured all tab sections and cards have accessible, unique headings.
- Improved semantic HTML structure and heading hierarchy throughout the document.

### Documentation
- Updated `README.md` to reference the new `CHANGELOG.md` and to highlight recent accessibility and validation improvements.
- Added "What's New" section to README for quick summaries of major changes.
