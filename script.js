// Accessible Tab Switching and Typography Scaling Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const tabContents = document.querySelectorAll('.tab-content');

    function activateTab(tab) {
        tabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        tab.focus();

        const tabId = tab.getAttribute('data-tab');
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.setAttribute('hidden', 'true');
            if (content.id === `${tabId}-content`) {
                content.classList.add('active');
                content.removeAttribute('hidden');
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
    const iosScaleSlider = document.getElementById('ios-scale-slider');
    const iosScaleValue = document.getElementById('ios-scale-value');
    const iosScaleLabels = ['xSmall', 'Small', 'Medium', 'Large (Default)', 'xLarge', 'xxLarge', 'xxxLarge'];
    const iosScaleFactors = [0.8, 0.9, 0.95, 1, 1.15, 1.3, 1.5];

    if (iosScaleSlider && iosScaleValue) {
        iosScaleSlider.addEventListener('input', () => {
            const index = parseInt(iosScaleSlider.value, 10);
            iosScaleValue.textContent = iosScaleLabels[index];

            // Update text sizes with scale factor
            document.querySelectorAll('.ios-large-title, .ios-title-1, .ios-body, .ios-caption-1').forEach(el => {
                if (el.classList.contains('ios-large-title')) {
                    el.style.fontSize = `${2.25 * iosScaleFactors[index]}rem`;
                } else if (el.classList.contains('ios-title-1')) {
                    el.style.fontSize = `${1.5 * iosScaleFactors[index]}rem`;
                } else if (el.classList.contains('ios-body')) {
                    el.style.fontSize = `${1 * iosScaleFactors[index]}rem`;
                } else if (el.classList.contains('ios-caption-1')) {
                    el.style.fontSize = `${0.75 * iosScaleFactors[index]}rem`;
                }
            });
        });
    }

    // Android Scale Slider functionality
    const androidScaleSlider = document.getElementById('android-scale-slider');
    const androidScaleValue = document.getElementById('android-scale-value');

    if (androidScaleSlider && androidScaleValue) {
        androidScaleSlider.addEventListener('input', () => {
            const scaleFactor = parseFloat(androidScaleSlider.value);
            androidScaleValue.textContent = `${scaleFactor.toFixed(1)}x`;

            // Update text sizes with scale factor
            document.querySelectorAll('.android-display-large, .android-headline-large, .android-body-large, .android-label-medium').forEach(el => {
                if (el.classList.contains('android-display-large')) {
                    el.style.fontSize = `${2.25 * scaleFactor}rem`;
                } else if (el.classList.contains('android-headline-large')) {
                    el.style.fontSize = `${1.5 * scaleFactor}rem`;
                } else if (el.classList.contains('android-body-large')) {
                    el.style.fontSize = `${1 * scaleFactor}rem`;
                } else if (el.classList.contains('android-label-medium')) {
                    el.style.fontSize = `${0.75 * scaleFactor}rem`;
                }
            });
        });
    }

    // Initialize the sliders on page load
    if (iosScaleSlider) iosScaleSlider.dispatchEvent(new Event('input'));
    if (androidScaleSlider) androidScaleSlider.dispatchEvent(new Event('input'));
});
