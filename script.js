// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active content
            const tabId = tab.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-content`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // iOS Scale Slider functionality
    const iosScaleSlider = document.getElementById('ios-scale-slider');
    const iosScaleValue = document.getElementById('ios-scale-value');
    const iosScaleLabels = ['xSmall', 'Small', 'Medium', 'Large (Default)', 'xLarge', 'xxLarge', 'xxxLarge'];
    const iosScaleFactors = [0.8, 0.9, 0.95, 1, 1.15, 1.3, 1.5];
    
    iosScaleSlider.addEventListener('input', () => {
        const index = parseInt(iosScaleSlider.value);
        iosScaleValue.textContent = iosScaleLabels[index];
        
        // Update text sizes with scale factor
        document.querySelectorAll('.ios-large-title, .ios-title-1, .ios-body, .ios-caption-1').forEach(el => {
            if (el.classList.contains('ios-large-title')) {
                el.style.fontSize = `${36 * iosScaleFactors[index]}px`;
            } else if (el.classList.contains('ios-title-1')) {
                el.style.fontSize = `${24 * iosScaleFactors[index]}px`;
            } else if (el.classList.contains('ios-body')) {
                el.style.fontSize = `${16 * iosScaleFactors[index]}px`;
            } else if (el.classList.contains('ios-caption-1')) {
                el.style.fontSize = `${12 * iosScaleFactors[index]}px`;
            }
        });
    });
    
    // Android Scale Slider functionality
    const androidScaleSlider = document.getElementById('android-scale-slider');
    const androidScaleValue = document.getElementById('android-scale-value');
    
    androidScaleSlider.addEventListener('input', () => {
        const scaleFactor = parseFloat(androidScaleSlider.value);
        androidScaleValue.textContent = `${scaleFactor.toFixed(1)}x`;
        
        // Update text sizes with scale factor
        document.querySelectorAll('.android-display-large, .android-headline-large, .android-body-large, .android-label-medium').forEach(el => {
            if (el.classList.contains('android-display-large')) {
                el.style.fontSize = `${36 * scaleFactor}px`;
            } else if (el.classList.contains('android-headline-large')) {
                el.style.fontSize = `${24 * scaleFactor}px`;
            } else if (el.classList.contains('android-body-large')) {
                el.style.fontSize = `${16 * scaleFactor}px`;
            } else if (el.classList.contains('android-label-medium')) {
                el.style.fontSize = `${12 * scaleFactor}px`;
            }
        });
    });
    
    // Initialize the sliders
    iosScaleSlider.dispatchEvent(new Event('input'));
    androidScaleSlider.dispatchEvent(new Event('input'));
});
