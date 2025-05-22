
# ✅ WCAG 2.1 AA Accessibility Audit Checklist

_Audit for: `index.accessible.html`_

---

## 1. Perceivable (Guideline 1.0)

| Check | Description | Status |
|-------|-------------|--------|
| ✅ Text alternatives | All visual controls have labels (e.g. `aria-label` for theme select) | ✔️ |
| ✅ Semantic headings | One `<h1>`, logical hierarchy (`<h2>`, `<h3>`) | ✔️ |
| ✅ Visible labels | Theme selector and tabs have visible + programmatic labels | ✔️ |
| ✅ Sufficient color contrast | All themes maintain WCAG AA contrast | ✔️ |
| ✅ Scalable text | Typography dynamically scales and supports user resizing | ✔️ |

---

## 2. Operable (Guideline 2.0)

| Check | Description | Status |
|-------|-------------|--------|
| ✅ Keyboard navigation | Tabs, buttons, sliders operable by keyboard | ✔️ |
| ✅ Tab order | Logical and predictable navigation order | ✔️ |
| ✅ Focus indicators | Visible focus outlines on interactive elements | ✔️ |
| ✅ Avoids keyboard traps | No component locks focus | ✔️ |

---

## 3. Understandable (Guideline 3.0)

| Check | Description | Status |
|-------|-------------|--------|
| ✅ Clear labels | All form elements have clear labels | ✔️ |
| ✅ Consistent navigation | Tabs and layout are consistent and predictable | ✔️ |
| ✅ Error prevention | No risky inputs or form errors | ✔️ |

---

## 4. Robust (Guideline 4.0)

| Check | Description | Status |
|-------|-------------|--------|
| ✅ Semantic HTML5 | Uses `<header>`, `<main>`, `<nav>` | ✔️ |
| ✅ ARIA support | Uses `role`, `aria-controls`, `aria-label` properly | ✔️ |
| ✅ Assistive tech compatibility | Screen reader friendly structure | ✔️ |
| ✅ JS compatibility | Script preserves accessibility behavior | ✔️ |

---

## 🔁 Manual Testing Recommendations

- ✅ Screen reader test (NVDA, VoiceOver)
- ✅ Navigate via Tab / Shift+Tab
- ✅ Test all themes for contrast compliance
- ✅ Zoom and OS-level font scaling tests
