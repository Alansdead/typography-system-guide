:root {
    font-size: 100%; /* 16px base */
    --ios-color: #0070ff;
    --android-color: #3ddc84;
    --divider-color: #e0e0e0;
    --bg-color: #f8f9fa;
    --text-color: #212121;
    --secondary-text: #757575;
    --highlight-bg: #f1f8ff;
    --android-highlight-bg: #f0fff8;
}

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

body {
    padding: 1.25rem;
    max-width: 75rem;
    margin: 0 auto;
    color: var(--text-color);
    background-color: var(--bg-color);
    line-height: 1.6;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    font-weight: 600;
}
h1 { font-size: 2.25rem; margin-top: 2.5rem; text-align: center; }
h2 { font-size: 1.75rem; margin-top: 2rem; border-bottom: 1px solid var(--divider-color); padding-bottom: 0.625rem; }
h3 { font-size: 1.375rem; margin-top: 1.5rem; }
h4 { font-size: 1.125rem; margin-top: 1.25rem; }
p, body, .ios-type-body, .android-type-body-large {
    font-size: 1rem;
}
.type-meta { font-size: 0.875rem; }
.android-type-label-large,
.android-type-label-medium,
.ios-type-caption-1,
.ios-type-subhead { font-size: 0.75rem; }

/* Container */
.container {
    max-width: 68.75rem;
    margin: 0 auto;
    background: #fff;
    padding: 1.875rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* Tab Navigation */
.tab-container {
    display: flex;
    margin-bottom: 1.25rem;
    border-bottom: 1px solid var(--divider-color);
}
.tab {
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-weight: 500;
    position: relative;
    background: none;
    border: none;
    font-size: 1rem;
}
.tab.active {
    color: var(--ios-color);
}
.tab.active[data-tab="android"] {
    color: var(--android-color);
}
.tab.active::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 0.188rem;
    background-color: var(--ios-color);
}
.tab.active[data-tab="android"]::after {
    background-color: var(--android-color);
}

/* Accessibility: Focus styles for tabs and all interactive elements */
.tab:focus, button:focus, [tabindex]:focus {
    outline: 3px solid var(--ios-color);
    outline-offset: 2px;
}

/* Tab Content */
.tab-content {
    display: none;
}
.tab-content.active {
    display: block;
}

/* Intro Sections */
.intro {
    margin-bottom: 2rem;
    padding: 1.25rem;
    background-color: var(--highlight-bg);
    border-radius: 0.375rem;
    border-left: 0.25rem solid var(--ios-color);
}
.intro.android {
    background-color: var(--android-highlight-bg);
    border-left: 0.25rem solid var(--android-color);
}

/* Typography Grid */
.typography-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.25rem;
    margin-bottom: 2rem;
}
@media (max-width: 48rem) {
    .typography-grid {
        grid-template-columns: 1fr;
    }
}

/* Typography Cards */
.type-card {
    padding: 1.25rem;
    border: 1px solid var(--divider-color);
    border-radius: 0.375rem;
    transition: all 0.2s ease-in-out;
}
.type-card:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}
.type-example {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--divider-color);
}
.type-meta {
    color: var(--secondary-text);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
}
.type-label {
    font-weight: 500;
}

/* iOS Typography Styles */
.ios-type-large-title {
    font-weight: 700;
    font-size: 2.25rem;    /* 36px */
    line-height: 3rem;     /* 48px */
}
.ios-type-title-1 {
    font-weight: 700;
    font-size: 1.5rem;     /* 24px */
    line-height: 2rem;     /* 32px */
}
.ios-type-title-2 {
    font-weight: 400;
    font-size: 1.5rem;     /* 24px */
    line-height: 2rem;     /* 32px */
}
.ios-type-title-3 {
    font-weight: 700;
    font-size: 1.125rem;   /* 18px */
    line-height: 1.5rem;   /* 24px */
}
.ios-type-headline {
    font-weight: 400;
    font-size: 1rem;       /* 16px */
    line-height: 2rem;     /* 32px */
}
.ios-type-body {
    font-weight: 500;
    font-size: 1rem;       /* 16px */
    line-height: 1.5rem;   /* 24px */
}
.ios-type-callout {
    font-weight: 400;
    font-size: 1rem;       /* 16px */
    line-height: 1.75rem;  /* 28px */
}
.ios-type-footnote {
    font-weight: 700;
    font-size: 0.875rem;   /* 14px */
    line-height: 1.5rem;   /* 24px */
    text-transform: uppercase;
    letter-spacing: 0.094rem; /* 1.5px */
}
.ios-type-subhead {
    font-weight: 700;
    font-size: 0.75rem;    /* 12px */
    line-height: 1rem;     /* 16px */
    text-transform: uppercase;
    letter-spacing: 0.094rem;
}
.ios-type-caption-1 {
    font-weight: 500;
    font-size: 0.75rem;    /* 12px */
    line-height: 1.25rem;  /* 20px */
}
.ios-type-caption-2 {
    font-weight: 400;
    font-size: 0.625rem;   /* 10px */
    line-height: 1rem;     /* 16px */
}

/* Android Typography Styles */
.android-type-display-large {
    font-weight: 700;
    font-size: 2.25rem;    /* 36px */
    line-height: 3rem;     /* 48px */
}
.android-type-headline-large {
    font-weight: 700;
    font-size: 1.5rem;     /* 24px */
    line-height: 2rem;     /* 32px */
}
.android-type-title-large {
    font-weight: 400;
    font-size: 1.5rem;     /* 24px */
    line-height: 2rem;     /* 32px */
}
.android-type-title-medium {
    font-weight: 700;
    font-size: 1.125rem;   /* 18px */
    line-height: 1.5rem;   /* 24px */
}
.android-type-title-small {
    font-weight: 400;
    font-size: 1rem;       /* 16px */
    line-height: 2rem;     /* 32px */
}
.android-type-body-large {
    font-weight: 500;
    font-size: 1rem;       /* 16px */
    line-height: 1.5rem;   /* 24px */
}
.android-type-body-medium {
    font-weight: 400;
    font-size: 1rem;       /* 16px */
    line-height: 1.75rem;  /* 28px */
}
.android-type-label-large {
    font-weight: 700;
    font-size: 0.875rem;   /* 14px */
    line-height: 1.5rem;   /* 24px */
    text-transform: uppercase;
    letter-spacing: 0.094rem;
}
.android-type-body-small {
    font-weight: 700;
    font-size: 0.75rem;    /* 12px */
    line-height: 1rem;     /* 16px */
    text-transform: uppercase;
    letter-spacing: 0.094rem;
}
.android-type-label-medium {
    font-weight: 500;
    font-size: 0.75rem;    /* 12px */
    line-height: 1.25rem;  /* 20px */
    letter-spacing: 0.094rem;
}
.android-type-label-small {
    font-weight: 400;
    font-size: 0.625rem;   /* 10px */
    line-height: 1rem;     /* 16px */
}

/* Typography Scaling Example */
.type-scaling-example {
    margin: 1.875rem 0;
    padding: 1.25rem;
    border: 1px solid var(--divider-color);
    border-radius: 0.5rem;
    background-color: #fff;
}
.scale-controls {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
}
.scale-slider {
    flex-grow: 1;
    margin: 0 1rem;
}
.scale-value {
    font-weight: 600;
    min-width: 2.5rem;
}
.scale-example {
    transition: font-size 0.3s ease;
}

/* Dynamic Type Example */
.dynamic-type-example {
    margin-top: 1.5rem;
}
.dynamic-type-row {
    display: grid;
    grid-template-columns: 12.5rem 1fr;
    margin-bottom: 1rem;
    align-items: center;
}
.dynamic-type-name {
    font-weight: 600;
    font-size: 0.875rem;
}

/* Table Styles */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.25rem 0;
    font-size: 0.875rem;
}
th, td {
    border: 1px solid var(--divider-color);
    padding: 0.75rem;
    text-align: left;
}
th {
    background-color: #f5f7f9;
    font-weight: 600;
}
tr:nth-child(even) {
    background-color: #f9f9f9;
}

/* Feature Grid */
.features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    margin: 1.5rem 0;
}
@media (max-width: 48rem) {
    .features-grid {
        grid-template-columns: 1fr;
    }
}
.feature-card {
    padding: 1.25rem;
    border: 1px solid var(--divider-color);
    border-radius: 0.375rem;
    background-color: white;
}
.feature-card.acceptable {
    border-left: 0.25rem solid #28a745;
    background-color: #f8fff9;
}
.feature-card.not-sufficient {
    border-left: 0.25rem solid #dc3545;
    background-color: #fff8f8;
}

/* Code Block */
.code-block {
    background-color: #f5f7f9;
    padding: 1rem;
    border-radius: 0.25rem;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.875rem;
    overflow-x: auto;
    margin: 1rem 0;
    border: 1px solid #e0e0e0;
}

/* Implementation Requirements, Checklist, etc. */
.implementation-requirements, .testing-guidelines, .webview-section, .best-practices-summary, .recommendations {
    margin: 2.5rem 0;
}
.requirement-list {
    display: grid;
    gap: 1.25rem;
    margin: 1rem 0;
}
.requirement-item {
    padding: 1.25rem;
    border: 1px solid var(--divider-color);
    border-radius: 0.375rem;
    background-color: white;
}
.requirement-item h5 {
    margin-bottom: 0.75rem;
    color: #28a745;
    font-size: 1rem;
}
.testing-guidelines {
    background-color: #fff9e6;
    border-radius: 0.5rem;
    border-left: 0.25rem solid #ffc107;
    padding: 1.5rem;
}
.checklist {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.25rem 0;
}
@media (max-width: 48rem) {
    .checklist {
        grid-template-columns: 1fr;
    }
}
.checklist-section {
    padding: 1rem;
    background-color: white;
    border-radius: 0.375rem;
    border: 1px solid var(--divider-color);
}
.checklist-section h5 {
    margin-bottom: 1rem;
    color: var(--ios-color);
}
.checklist-section label {
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.75rem;
    cursor: pointer;
    font-size: 0.875rem;
    line-height: 1.4;
}
.checklist-section input[type="checkbox"] {
    margin-right: 0.75rem;
    margin-top: 0.125rem;
    flex-shrink: 0;
}
.webview-section {
    background-color: #f0fff8;
    border-radius: 0.5rem;
    border-left: 0.25rem solid var(--android-color);
    padding: 1.5rem;
}
.webview-requirements {
    margin: 1.25rem 0;
}
.webview-requirements h4 {
    color: var(--android-color);
    margin-bottom: 0.75rem;
}

/* Best Practices Summary */
.practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
    gap: 1.25rem;
    margin: 1.25rem 0;
}
.practice-card {
    padding: 1.25rem;
    background-color: white;
    border: 1px solid var(--divider-color);
    border-radius: 0.375rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.practice-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.practice-card h4 {
    color: var(--ios-color);
    margin-bottom: 1rem;
    font-size: 1.125rem;
}
.practice-card ul {
    margin: 0;
    padding-left: 1.25rem;
}
.practice-card li {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
}

/* Recommendations */
.recommendations {
    padding: 1.25rem;
    background-color: #fff9e6;
    border-radius: 0.375rem;
    border-left: 0.25rem solid #ffc107;
}

/* Responsive adjustments */
@media (max-width: 48rem) {
    .wcag-section,
    .scaling-research,
    .testing-guidelines,
    .webview-section {
        padding: 1rem;
        margin: 1.5rem 0;
    }
    .practices-grid {
        grid-template-columns: 1fr;
    }
    .scaling-table {
        font-size: 0.75rem;
    }
    .scaling-table th,
    .scaling-table td {
        padding: 0.5rem 0.25rem;
    }
}
