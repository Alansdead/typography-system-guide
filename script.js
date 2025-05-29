/**
 * Typography System Guide - JavaScript
 * Handles tab navigation and dynamic type scaling demos
 */

// ==========================================================================
// Constants and Configuration
// ==========================================================================

const IOS_SCALE_LABELS = ['xSmall', 'Small', 'Medium', 'Large (Default)', 'xLarge', 'xxLarge', 'xxxLarge'];
const IOS_SCALE_FACTORS = [0.8, 0.9, 0.95, 1, 1.15, 1.3, 1.5];

const IOS_BASE_SIZES = {
  'ios-large-title': 34,
  'ios-title-1': 28,
  'ios-body': 17,
  'ios-caption-1': 12
};

const ANDROID_BASE_SIZES = {
  'android-display-large': 57,
  'android-headline-large': 32,
  'android-body-large': 16,
  'android-label-medium': 12
};

// ==========================================================================
// Utility Functions
// ==========================================================================

/**
 * Announce content changes to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
  const announcements = document.getElementById('announcements');
  if (announcements) {
    announcements.textContent = message;
    // Clear after a delay
    setTimeout(() => {
      announcements.textContent = '';
    }, 1000);
  }
}

/**
 * Safely query selector with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element|null} - Found element or null
 */
function safeQuerySelector(selector, context = document) {
  try {
    return context.querySelector(selector);
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`, error);
    return null;
  }
}

/**
 * Safely query all selectors with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {NodeList} - Found elements or empty NodeList
 */
function safeQuerySelectorAll(selector, context = document) {
  try {
    return context.querySelectorAll(selector);
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`, error);
    return [];
  }
}

/**
 * Debounce function to limit rapid function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==========================================================================
// Tab Navigation System
// ==========================================================================

class TabNavigation {
  constructor() {
    this.tabs = safeQuerySelectorAll('.tab');
    this.tabContents = safeQuerySelectorAll('.tab-content');
    this.activeTabIndex = 0;
    
    this.init();
  }

  init() {
    if (this.tabs.length === 0) {
      console.warn('No tabs found');
      return;
    }

    this.bindEvents();
    this.setInitialActiveTab();
    console.log('Tab navigation initialized');
  }

  bindEvents() {
    this.tabs.forEach((tab, index) => {
      // Click handler
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        this.activateTab(index);
      });

      // Keyboard navigation
      tab.addEventListener('keydown', (e) => {
        this.handleKeyNavigation(e, index);
      });
    });
  }

  handleKeyNavigation(event, currentIndex) {
    let targetIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        targetIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        targetIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = this.tabs.length - 1;
        break;
      default:
        return; // Don't handle other keys
    }

    this.activateTab(targetIndex);
    this.tabs[targetIndex].focus();
  }

  setInitialActiveTab() {
    // Find the tab that has the 'active' class or default to first tab
    const activeTab = Array.from(this.tabs).findIndex(tab => tab.classList.contains('active'));
    this.activateTab(activeTab >= 0 ? activeTab : 0);
  }

  activateTab(index) {
    if (index < 0 || index >= this.tabs.length) {
      console.warn(`Invalid tab index: ${index}`);
      return;
    }

    const targetTab = this.tabs[index];
    const tabId = targetTab.getAttribute('data-tab');
    const targetContent = safeQuerySelector(`#${tabId}-content`);

    if (!targetContent) {
      console.warn(`No content found for tab: ${tabId}`);
      return;
    }

    // Update tab states
    this.tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive.toString());
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    // Update content states
    this.tabContents.forEach(content => {
      content.classList.remove('active');
    });
    targetContent.classList.add('active');

    // Update active tab index
    this.activeTabIndex = index;

    // Announce tab change to screen readers
    const tabText = targetTab.textContent.trim();
    announceToScreenReader(`${tabText} tab selected`);

    console.log(`Activated tab: ${tabText}`);
  }

  getCurrentTab() {
    return this.tabs[this.activeTabIndex];
  }
}

// ==========================================================================
// iOS Dynamic Type Scaling
// ==========================================================================

class IOSTypeScaling {
  constructor() {
    this.slider = safeQuerySelector('#ios-scale-slider');
    this.output = safeQuerySelector('#ios-scale-value');
    this.examples = safeQuerySelectorAll('.ios-large-title, .ios-title-1, .ios-body, .ios-caption-1');
    
    this.init();
  }

  init() {
    if (!this.slider || !this.output) {
      console.warn('iOS scaling elements not found');
      return;
    }

    this.bindEvents();
    this.updateScale(); // Set initial state
    console.log('iOS type scaling initialized');
  }

  bindEvents() {
    // Use debounced input handler for better performance
    const debouncedUpdate = debounce(() => this.updateScale(), 16); // ~60fps
    
    this.slider.addEventListener('input', debouncedUpdate);
    this.slider.addEventListener('change', () => this.announceScaleChange());
  }

  updateScale() {
    const index = parseInt(this.slider.value, 10);
    
    if (index < 0 || index >= IOS_SCALE_LABELS.length) {
      console.warn(`Invalid iOS scale index: ${index}`);
      return;
    }

    const label = IOS_SCALE_LABELS[index];
    const scaleFactor = IOS_SCALE_FACTORS[index];

    // Update output display
    this.output.textContent = label;

    // Update font sizes for each example
    this.examples.forEach(element => {
      const className = Array.from(element.classList).find(cls => cls.startsWith('ios-'));
      if (className && IOS_BASE_SIZES[className]) {
        const newSize = IOS_BASE_SIZES[className] * scaleFactor;
        element.style.fontSize = `${newSize}px`;
      }
    });
  }

  announceScaleChange() {
    const label = IOS_SCALE_LABELS[parseInt(this.slider.value, 10)];
    announceToScreenReader(`iOS text size changed to ${label}`);
  }
}

// ==========================================================================
// Android Font Scaling
// ==========================================================================

class AndroidFontScaling {
  constructor() {
    this.slider = safeQuerySelector('#android-scale-slider');
    this.output = safeQuerySelector('#android-scale-value');
    this.examples = safeQuerySelectorAll('.android-display-large, .android-headline-large, .android-body-large, .android-label-medium');
    
    this.init();
  }

  init() {
    if (!this.slider || !this.output) {
      console.warn('Android scaling elements not found');
      return;
    }

    this.bindEvents();
    this.updateScale(); // Set initial state
    console.log('Android font scaling initialized');
  }

  bindEvents() {
    // Use debounced input handler for better performance
    const debouncedUpdate = debounce(() => this.updateScale(), 16); // ~60fps
    
    this.slider.addEventListener('input', debouncedUpdate);
    this.slider.addEventListener('change', () => this.announceScaleChange());
  }

  updateScale() {
    const scaleFactor = parseFloat(this.slider.value);
    
    if (isNaN(scaleFactor) || scaleFactor <= 0) {
      console.warn(`Invalid Android scale factor: ${scaleFactor}`);
      return;
    }

    // Update output display
    this.output.textContent = `${scaleFactor.toFixed(1)}x`;

    // Update font sizes for each example
    this.examples.forEach(element => {
      const className = Array.from(element.classList).find(cls => cls.startsWith('android-'));
      if (className && ANDROID_BASE_SIZES[className]) {
        const newSize = ANDROID_BASE_SIZES[className] * scaleFactor;
        element.style.fontSize = `${newSize}px`;
      }
    });
  }

  announceScaleChange() {
    const scaleFactor = parseFloat(this.slider.value);
    announceToScreenReader(`Android font scale changed to ${scaleFactor.toFixed(1)}x`);
  }
}

// ==========================================================================
// Accessibility Enhancements
// ==========================================================================

class AccessibilityEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.setupReducedMotion();
    this.setupHighContrast();
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    console.log('Accessibility enhancements initialized');
  }

  setupReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionChange = (mediaQuery) => {
      document.documentElement.classList.toggle('reduced-motion', mediaQuery.matches);
    };

    handleMotionChange(prefersReducedMotion);
    prefersReducedMotion.addEventListener('change', handleMotionChange);
  }

  setupHighContrast() {
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    
    const handleContrastChange = (mediaQuery) => {
      document.documentElement.classList.toggle('high-contrast', mediaQuery.matches);
    };

    handleContrastChange(prefersHighContrast);
    prefersHighContrast.addEventListener('change', handleContrastChange);
  }

  setupKeyboardNavigation() {
    // Add keyboard navigation hints
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupFocusManagement() {
    // Ensure proper focus management for dynamic content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target.classList.contains('active') && target.hasAttribute('role')) {
            // Focus management for tab panels
            const focusableElement = target.querySelector('[tabindex="0"], button, input, select, textarea, a[href]');
            if (focusableElement && document.activeElement !== focusableElement) {
              // Don't steal focus unless specifically needed
              // focusableElement.focus();
            }
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class']
    });
  }
}

// ==========================================================================
// Checkbox State Management
// ==========================================================================

class CheckboxStateManager {
  constructor() {
    this.checkboxes = safeQuerySelectorAll('input[type="checkbox"]');
    this.init();
  }

  init() {
    if (this.checkboxes.length === 0) {
      return;
    }

    this.loadStates();
    this.bindEvents();
    console.log(`Checkbox state manager initialized for ${this.checkboxes.length} checkboxes`);
  }

  bindEvents() {
    this.checkboxes.forEach((checkbox, index) => {
      checkbox.addEventListener('change', () => {
        this.saveState(index, checkbox.checked);
        this.announceCheckboxChange(checkbox);
      });
    });
  }

  saveState(index, checked) {
    try {
      const states = this.getStoredStates();
      states[index] = checked;
      localStorage.setItem('typography-guide-checkboxes', JSON.stringify(states));
    } catch (error) {
      console.warn('Could not save checkbox state:', error);
    }
  }

  loadStates() {
    try {
      const states = this.getStoredStates();
      this.checkboxes.forEach((checkbox, index) => {
        if (states[index] !== undefined) {
          checkbox.checked = states[index];
        }
      });
    } catch (error) {
      console.warn('Could not load checkbox states:', error);
    }
  }

  getStoredStates() {
    try {
      const stored = localStorage.getItem('typography-guide-checkboxes');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('Could not parse stored checkbox states:', error);
      return {};
    }
  }

  announceCheckboxChange(checkbox) {
    const label = checkbox.closest('label');
    if (label) {
      const labelText = label.textContent.replace(/\s+/g, ' ').trim();
      const state = checkbox.checked ? 'checked' : 'unchecked';
      announceToScreenReader(`${labelText} ${state}`);
    }
  }
}

// ==========================================================================
// Error Handling and Initialization
// ==========================================================================

class TypographyGuide {
  constructor() {
    this.components = [];
    this.init();
  }

  init() {
    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
      } else {
        this.initializeComponents();
      }
    } catch (error) {
      console.error('Failed to initialize Typography Guide:', error);
    }
  }

  initializeComponents() {
    try {
      // Initialize all components
      this.components.push(new TabNavigation());
      this.components.push(new IOSTypeScaling());
      this.components.push(new AndroidFontScaling());
      this.components.push(new AccessibilityEnhancements());
      this.components.push(new CheckboxStateManager());

      console.log('Typography Guide initialized successfully');
      
      // Announce to screen readers that the page is ready
      setTimeout(() => {
        announceToScreenReader('Typography guide loaded and ready for use');
      }, 500);

    } catch (error) {
      console.error('Failed to initialize components:', error);
    }
  }

  // Public method to get component instances
  getComponent(componentClass) {
    return this.components.find(component => component instanceof componentClass);
  }

  // Public method to refresh all components
  refresh() {
    this.components.forEach(component => {
      if (typeof component.refresh === 'function') {
        component.refresh();
      }
    });
  }
}

// ==========================================================================
// Global Error Handler
// ==========================================================================

window.addEventListener('error', (event) => {
  console.error('Typography Guide Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Typography Guide Unhandled Promise Rejection:', event.reason);
});

// ==========================================================================
// Initialize Application
// ==========================================================================

// Initialize the application
const typographyGuide = new TypographyGuide();

// Make it available globally for debugging
window.typographyGuide = typographyGuide;

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TypographyGuide;
}
