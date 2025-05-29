document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const tabContents = document.querySelectorAll('.panel');

    function activateTab(tab) {
        // Remove active class from all tabs
        tabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
        });
        
        // Add active class to clicked tab
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');

        // Show corresponding panel
        const tabId = tab.getAttribute('data-tab');
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabId}-panel`) {
                content.classList.add('active');
            }
        });
    }

    // Add click listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab));

        // Keyboard navigation for tabs
        tab.addEventListener('keydown', (e) => {
            let idx = tabs.indexOf(tab);
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                activateTab(tabs[(idx + 1) % tabs.length]);
                tabs[(idx + 1) % tabs.length].focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                activateTab(tabs[(idx - 1 + tabs.length) % tabs.length]);
                tabs[(idx - 1 + tabs.length) % tabs.length].focus();
            }
        });
    });

    // iOS Scale Slider functionality
    const iosScaleSlider = document.getElementById('ios-scale');
    const iosScaleValue = document.getElementById('ios-scale-value');
    const iosScaleLabels = ['XS', 'S', 'M', 'L (Default)', 'XL', 'XXL', 'XXXL'];
    const iosScaleFactors = [0.8, 0.9, 0.95, 1, 1.15, 1.3, 1.5];

    if (iosScaleSlider && iosScaleValue) {
        iosScaleSlider.addEventListener('input', () => {
            const index = parseInt(iosScaleSlider.value, 10);
            iosScaleValue.textContent = iosScaleLabels[index];

            // Update iOS demo text sizes
            const iosLargeDemo = document.getElementById('ios-large-demo');
            const iosTitle1Demo = document.getElementById('ios-title1-demo');
            const iosTitle2Demo = document.getElementById('ios-title2-demo');
            const iosHeadlineDemo = document.getElementById('ios-headline-demo');
            const iosBodyDemo = document.getElementById('ios-body-demo');
            const iosCalloutDemo = document.getElementById('ios-callout-demo');
            const iosFootnoteDemo = document.getElementById('ios-footnote-demo');
            const iosCaptionDemo = document.getElementById('ios-caption-demo');

            if (iosLargeDemo) iosLargeDemo.style.fontSize = `${2.125 * iosScaleFactors[index]}rem`;
            if (iosTitle1Demo) iosTitle1Demo.style.fontSize = `${1.75 * iosScaleFactors[index]}rem`;
            if (iosTitle2Demo) iosTitle2Demo.style.fontSize = `${1.375 * iosScaleFactors[index]}rem`;
            if (iosHeadlineDemo) iosHeadlineDemo.style.fontSize = `${1.0625 * iosScaleFactors[index]}rem`;
            if (iosBodyDemo) iosBodyDemo.style.fontSize = `${1.0625 * iosScaleFactors[index]}rem`;
            if (iosCalloutDemo) iosCalloutDemo.style.fontSize = `${1.0 * iosScaleFactors[index]}rem`;
            if (iosFootnoteDemo) iosFootnoteDemo.style.fontSize = `${0.8125 * iosScaleFactors[index]}rem`;
            if (iosCaptionDemo) iosCaptionDemo.style.fontSize = `${0.75 * iosScaleFactors[index]}rem`;
        });

        // Initialize iOS slider
        iosScaleSlider.dispatchEvent(new Event('input'));
    }

    // Android Scale Slider functionality
    const androidScaleSlider = document.getElementById('android-scale');
    const androidScaleValue = document.getElementById('android-scale-value');

    if (androidScaleSlider && androidScaleValue) {
        androidScaleSlider.addEventListener('input', () => {
            const scaleFactor = parseFloat(androidScaleSlider.value);
            androidScaleValue.textContent = `${scaleFactor.toFixed(1)}x`;

            // Update Android demo text sizes
            const androidDisplayDemo = document.getElementById('android-display-demo');
            const androidHeadlineDemo = document.getElementById('android-headline-demo');
            const androidTitleDemo = document.getElementById('android-title-demo');
            const androidBodyDemo = document.getElementById('android-body-demo');
            const androidLabelDemo = document.getElementById('android-label-demo');

            if (androidDisplayDemo) androidDisplayDemo.style.fontSize = `${3.5625 * scaleFactor}rem`;
            if (androidHeadlineDemo) androidHeadlineDemo.style.fontSize = `${2.0 * scaleFactor}rem`;
            if (androidTitleDemo) androidTitleDemo.style.fontSize = `${1.0 * scaleFactor}rem`;
            if (androidBodyDemo) androidBodyDemo.style.fontSize = `${1.0 * scaleFactor}rem`;
            if (androidLabelDemo) androidLabelDemo.style.fontSize = `${0.6875 * scaleFactor}rem`;
        });

        // Initialize Android slider
        androidScaleSlider.dispatchEvent(new Event('input'));
    }
});

// Theme toggle functionality - Using in-memory storage instead of localStorage
(function(){
    const btn = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    if (!btn) return;
    
    // Store theme state in memory
    let currentTheme = 'light';
    
    // Detect user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial state based on user preference
    window.addEventListener('DOMContentLoaded', () => {
        if (prefersDark) {
            currentTheme = 'dark';
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light';
        } else {
            currentTheme = 'light';
            document.documentElement.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark';
        }
    });
;
    
    // Listen for changes in user's color scheme preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (e.matches && currentTheme === 'light') {
            currentTheme = 'dark';
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light';
        } else if (!e.matches && currentTheme === 'dark') {
            currentTheme = 'light';
            document.documentElement.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark';
        }
    });
})();
