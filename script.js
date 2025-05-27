document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const tabContents = document.querySelectorAll('.panel');

    function activateTab(tab) {
        tabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');

        const tabId = tab.getAttribute('data-tab');
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabId}-panel`) {
                content.classList.add('active');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab));

        tab.addEventListener('keydown', (e) => {
            let idx = tabs.indexOf(tab);
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                activateTab(tabs[(idx + 1) % tabs.length]);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                activateTab(tabs[(idx - 1 + tabs.length) % tabs.length]);
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
            const iosBodyDemo = document.getElementById('ios-body-demo');
            const iosCaptionDemo = document.getElementById('ios-caption-demo');

            if (iosLargeDemo) iosLargeDemo.style.fontSize = `${2.125 * iosScaleFactors[index]}rem`;
            if (iosTitle1Demo) iosTitle1Demo.style.fontSize = `${1.75 * iosScaleFactors[index]}rem`;
            if (iosTitle2Demo) iosTitle2Demo.style.fontSize = `${1.375 * iosScaleFactors[index]}rem`;
            if (iosBodyDemo) iosBodyDemo.style.fontSize = `${1.0625 * iosScaleFactors[index]}rem`;
            if (iosCaptionDemo) iosCaptionDemo.style.fontSize = `${0.75 * iosScaleFactors[index]}rem`;
        });
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
    }

    // Initialize sliders
    if (iosScaleSlider) iosScaleSlider.dispatchEvent(new Event('input'));
    if (androidScaleSlider) androidScaleSlider.dispatchEvent(new Event('input'));
});

// Theme toggle functionality
(function(){
    // Use existing button from HTML
    const btn = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');

    if (!btn) return;

    // Set initial state
    window.addEventListener('DOMContentLoaded', () => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') {
            document.documentElement.setAttribute('data-theme', saved);
            themeIcon.textContent = saved === 'dark' ? '☀️' : '🌙';
            themeText.textContent = saved === 'dark' ? 'Light' : 'Dark';
        } else {
            document.documentElement.removeAttribute('data-theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            themeIcon.textContent = prefersDark ? '☀️' : '🌙';
            themeText.textContent = prefersDark ? 'Light' : 'Dark';
        }
    });

    // Toggle handler
    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        if (current === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light';
        }
    });
})();
