// ===== UTILITY FUNCTIONS =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
   // ===== TAB FUNCTIONALITY =====
   const TabManager = {
      tabs: Array.from($$('.tab')),
      panels: $$('.panel'),
      
      init() {
         this.bindEvents();
      },
      
      bindEvents() {
         this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.activateTab(tab));
            tab.addEventListener('keydown', (e) => this.handleKeydown(e, tab));
         });
      },
      
      activateTab(activeTab) {
         // Reset all tabs
         this.tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
         });
         
         // Activate selected tab
         activeTab.classList.add('active');
         activeTab.setAttribute('aria-selected', 'true');
         activeTab.setAttribute('tabindex', '0');
         
         // Show corresponding panel
         const tabId = activeTab.getAttribute('data-tab');
         this.panels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `${tabId}-panel`) {
               panel.classList.add('active');
            }
         });
      },
      
      handleKeydown(e, tab) {
         const currentIndex = this.tabs.indexOf(tab);
         let nextIndex;
         
         switch(e.key) {
            case 'ArrowRight':
               e.preventDefault();
               nextIndex = (currentIndex + 1) % this.tabs.length;
               this.activateTab(this.tabs[nextIndex]);
               this.tabs[nextIndex].focus();
               break;
            case 'ArrowLeft':
               e.preventDefault();
               nextIndex = (currentIndex - 1 + this.tabs.length) % this.tabs.length;
               this.activateTab(this.tabs[nextIndex]);
               this.tabs[nextIndex].focus();
               break;
         }
      }
   };

   // ===== iOS SCALING FUNCTIONALITY =====
   const IOSScaler = {
      slider: $('#ios-scale'),
      valueDisplay: $('#ios-scale-value'),
      labels: ['XS', 'S', 'M', 'L (Default)', 'XL', 'XXL', 'XXXL'],
      scaleFactors: [0.8, 0.9, 0.95, 1, 1.15, 1.3, 1.5],
      elements: {
         large: $('#ios-large-demo'),
         title1: $('#ios-title1-demo'),
         title2: $('#ios-title2-demo'),
         headline: $('#ios-headline-demo'),
         body: $('#ios-body-demo'),
         callout: $('#ios-callout-demo'),
         footnote: $('#ios-footnote-demo'),
         caption: $('#ios-caption-demo')
      },
      baseSizes: {
         large: 2.125,
         title1: 1.75,
         title2: 1.375,
         headline: 1.0625,
         body: 1.0625,
         callout: 1.0,
         footnote: 0.8125,
         caption: 0.75
      },
      
      init() {
         if (!this.slider) return;
         this.bindEvents();
         this.updateScale();
      },
      
      bindEvents() {
         this.slider.addEventListener('input', () => this.updateScale());
      },
      
      updateScale() {
         const index = parseInt(this.slider.value, 10);
         const scaleFactor = this.scaleFactors[index];
         
         // Update display
         this.valueDisplay.textContent = this.labels[index];
         
         // Update all text elements
         Object.keys(this.elements).forEach(key => {
            if (this.elements[key]) {
               const newSize = this.baseSizes[key] * scaleFactor;
               this.elements[key].style.fontSize = `${newSize}rem`;
            }
         });
      }
   };

   // ===== ANDROID SCALING FUNCTIONALITY =====
   const AndroidScaler = {
      slider: $('#android-scale'),
      valueDisplay: $('#android-scale-value'),
      elements: {
         display: $('#android-display-demo'),
         headline: $('#android-headline-demo'),
         title: $('#android-title-demo'),
         body: $('#android-body-demo'),
         label: $('#android-label-demo')
      },
      baseSizes: {
         display: 3.5625,
         headline: 2.0,
         title: 1.0,
         body: 1.0,
         label: 0.6875
      },
      
      init() {
         if (!this.slider) return;
         this.bindEvents();
         this.updateScale();
      },
      
      bindEvents() {
         this.slider.addEventListener('input', () => this.updateScale());
      },
      
      updateScale() {
         const scaleFactor = parseFloat(this.slider.value);
         
         // Update display
         this.valueDisplay.textContent = `${scaleFactor.toFixed(1)}x`;
         
         // Update all text elements
         Object.keys(this.elements).forEach(key => {
            if (this.elements[key]) {
               const newSize = this.baseSizes[key] * scaleFactor;
               this.elements[key].style.fontSize = `${newSize}rem`;
            }
         });
      }
   };

   // ===== THEME TOGGLE FUNCTIONALITY =====
   const ThemeManager = {
      button: $('.theme-toggle'),
      icon: $('.theme-icon'),
      text: $('.theme-text'),
      currentTheme: 'light',
      
      init() {
         if (!this.button) return;
         this.setupInitialTheme();
         this.bindEvents();
      },
      
      setupInitialTheme() {
         const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
         
         if (prefersDark) {
            this.setTheme('dark');
         } else {
            this.setTheme('light');
         }
      },
      
      bindEvents() {
         this.button.addEventListener('click', () => this.toggleTheme());
         
         // Listen for system theme changes
         window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
               if (e.matches && this.currentTheme === 'light') {
                  this.setTheme('dark');
               } else if (!e.matches && this.currentTheme === 'dark') {
                  this.setTheme('light');
               }
            });
      },
      
      setTheme(theme) {
         this.currentTheme = theme;
         
         if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (this.icon) this.icon.textContent = '☀️';
            if (this.text) this.text.textContent = 'Light';
         } else {
            document.documentElement.removeAttribute('data-theme');
            if (this.icon) this.icon.textContent = '🌙';
            if (this.text) this.text.textContent = 'Dark';
         }
      },
      
      toggleTheme() {
         const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
         this.setTheme(newTheme);
      }
   };

   // ===== CHECKLIST FUNCTIONALITY =====
   const ChecklistManager = {
      checkboxes: $('.checklist-item input[type="checkbox"]'),
      
      init() {
         this.bindEvents();
      },
      
      bindEvents() {
         this.checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleCheckboxChange(checkbox));
         });
      },
      
      handleCheckboxChange(checkbox) {
         const item = checkbox.closest('.checklist-item');
         if (checkbox.checked) {
            item.style.opacity = '0.7';
         } else {
            item.style.opacity = '1';
         }
      }
   };

   // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
   const SmoothScrollManager = {
      links: $('a[href^="#"]'),
      
      init() {
         this.bindEvents();
      },
      
      bindEvents() {
         this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e, link));
         });
      },
      
      handleClick(e, link) {
         const targetId = link.getAttribute('href').substring(1);
         const targetElement = $(`#${targetId}`);
         
         if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
               behavior: 'smooth',
               block: 'start'
            });
            
            // Focus the target for accessibility
            if (targetElement.tabIndex < 0) {
               targetElement.tabIndex = -1;
            }
            targetElement.focus();
         }
      }
   };

   // ===== ACCESSIBILITY ENHANCEMENTS =====
   const AccessibilityManager = {
      focusableElements: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      
      init() {
         this.setupFocusTrapping();
         this.setupKeyboardNavigation();
      },
      
      setupFocusTrapping() {
         // Add visible focus indicators for keyboard users
         document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
               document.body.classList.add('keyboard-nav');
            }
         });
         
         document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
         });
      },
      
      setupKeyboardNavigation() {
         // Enhanced keyboard navigation for interactive elements
         const interactiveElements = $(this.focusableElements);
         
         interactiveElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
               if (e.key === 'Enter' && element.tagName !== 'BUTTON' && element.tagName !== 'A') {
                  element.click();
               }
            });
         });
      }
   };

   // ===== PERFORMANCE OPTIMIZATIONS =====
   const PerformanceManager = {
      init() {
         this.setupLazyLoading();
         this.setupIntersectionObserver();
      },
      
      setupLazyLoading() {
         // Implement lazy loading for heavy content sections
         const sections = $('.section');
         
         sections.forEach(section => {
            if (section.offsetTop > window.innerHeight * 2) {
               section.style.contentVisibility = 'auto';
            }
         });
      },
      
      setupIntersectionObserver() {
         // Animate elements as they come into view
         const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
               if (entry.isIntersecting) {
                  entry.target.classList.add('animate-in');
               }
            });
         }, {
            threshold: 0.1,
            rootMargin: '50px'
         });
         
         $('.type-card, .practice-card, .checklist-card').forEach(card => {
            observer.observe(card);
         });
      }
   };

   // ===== RESPONSIVE BEHAVIOR MANAGER =====
   const ResponsiveManager = {
      init() {
         this.handleResize();
         this.bindEvents();
      },
      
      bindEvents() {
         window.addEventListener('resize', () => this.handleResize());
      },
      
      handleResize() {
         // Handle responsive behavior for sliders on mobile
         const sliderWrappers = $('.slider-wrapper');
         const isMobile = window.innerWidth <= 768;
         
         sliderWrappers.forEach(wrapper => {
            if (isMobile) {
               wrapper.style.flexDirection = 'column';
               wrapper.style.alignItems = 'stretch';
            } else {
               wrapper.style.flexDirection = 'row';
               wrapper.style.alignItems = 'center';
            }
         });
      }
   };

   // ===== FORM ENHANCEMENT MANAGER =====
   const FormManager = {
      init() {
         this.enhanceInputs();
         this.setupValidation();
      },
      
      enhanceInputs() {
         // Enhance range inputs with better accessibility
         const rangeInputs = $('input[type="range"]');
         
         rangeInputs.forEach(input => {
            // Add aria-valuetext for better screen reader support
            input.addEventListener('input', () => {
               const value = input.value;
               const max = input.max;
               const min = input.min;
               const percentage = ((value - min) / (max - min)) * 100;
               input.setAttribute('aria-valuetext', `${Math.round(percentage)}% of maximum`);
            });
            
            // Initialize aria-valuetext
            input.dispatchEvent(new Event('input'));
         });
      },
      
      setupValidation() {
         // Add basic form validation and feedback
         const inputs = $('input, select, textarea');
         
         inputs.forEach(input => {
            input.addEventListener('invalid', (e) => {
               e.preventDefault();
               this.showValidationMessage(input);
            });
            
            input.addEventListener('input', () => {
               this.clearValidationMessage(input);
            });
         });
      },
      
      showValidationMessage(input) {
         // Custom validation message display
         const existingMessage = input.parentNode.querySelector('.validation-message');
         if (existingMessage) {
            existingMessage.remove();
         }
         
         const message = document.createElement('div');
         message.className = 'validation-message';
         message.textContent = input.validationMessage;
         message.style.color = 'var(--color-error)';
         message.style.fontSize = '0.875rem';
         message.style.marginTop = 'var(--space-1)';
         
         input.parentNode.appendChild(message);
         input.setAttribute('aria-describedby', 'validation-message');
      },
      
      clearValidationMessage(input) {
         const message = input.parentNode.querySelector('.validation-message');
         if (message) {
            message.remove();
         }
         input.removeAttribute('aria-describedby');
      }
   };

   // ===== ERROR HANDLING =====
   const ErrorHandler = {
      init() {
         window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
            this.logError(e.error);
         });
         
         window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.logError(e.reason);
         });
      },
      
      logError(error) {
         // In a real application, you might send this to a logging service
         const errorLog = {
            message: error.message || error,
            stack: error.stack || 'No stack trace available',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
         };
         
         // Store in session for debugging (avoiding localStorage as requested)
         if (window.sessionStorage) {
            const existingLogs = JSON.parse(sessionStorage.getItem('errorLogs') || '[]');
            existingLogs.push(errorLog);
            sessionStorage.setItem('errorLogs', JSON.stringify(existingLogs.slice(-10))); // Keep last 10 errors
         }
      }
   };

   // ===== ANALYTICS AND TRACKING (Privacy-Friendly) =====
   const AnalyticsManager = {
      init() {
         this.trackUserInteractions();
         this.trackPerformance();
      },
      
      trackUserInteractions() {
         // Track tab switches for UX insights
         const tabs = $('.tab');
         tabs.forEach(tab => {
            tab.addEventListener('click', () => {
               this.logEvent('tab_switch', {
                  tab: tab.getAttribute('data-tab'),
                  timestamp: Date.now()
               });
            });
         });
         
         // Track slider usage
         const sliders = $('.slider');
         sliders.forEach(slider => {
            slider.addEventListener('change', () => {
               this.logEvent('slider_interaction', {
                  slider_id: slider.id,
                  value: slider.value,
                  timestamp: Date.now()
               });
            });
         });
      },
      
      trackPerformance() {
         // Track page load performance
         window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            this.logEvent('page_performance', {
               load_time: perfData.loadEventEnd - perfData.loadEventStart,
               dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
               timestamp: Date.now()
            });
         });
      },
      
      logEvent(eventName, data) {
         // Privacy-friendly analytics - store only in session, no external tracking
         if (window.sessionStorage) {
            const existingEvents = JSON.parse(sessionStorage.getItem('analytics') || '[]');
            existingEvents.push({
               event: eventName,
               data: data
            });
            sessionStorage.setItem('analytics', JSON.stringify(existingEvents.slice(-50))); // Keep last 50 events
         }
      }
   };

   // ===== INITIALIZATION =====
   try {
      // Initialize all managers in order of dependency
      ErrorHandler.init();
      TabManager.init();
      IOSScaler.init();
      AndroidScaler.init();
      ThemeManager.init();
      ChecklistManager.init();
      SmoothScrollManager.init();
      AccessibilityManager.init();
      PerformanceManager.init();
      ResponsiveManager.init();
      FormManager.init();
      AnalyticsManager.init();
      
      console.log('Typography Guide initialized successfully');
      
      // Dispatch custom event for external integrations
      document.dispatchEvent(new CustomEvent('typographyGuideReady', {
         detail: {
            version: '2.0.0',
            timestamp: Date.now(),
            managers: [
               'TabManager',
               'IOSScaler', 
               'AndroidScaler',
               'ThemeManager',
               'ChecklistManager',
               'SmoothScrollManager',
               'AccessibilityManager',
               'PerformanceManager',
               'ResponsiveManager',
               'FormManager',
               'AnalyticsManager'
            ]
         }
      }));
      
   } catch (error) {
      console.error('Initialization error:', error);
      ErrorHandler.logError(error);
   }
});

// ===== GLOBAL UTILITIES =====
// Export utilities for external use if needed
window.TypographyGuide = {
   version: '2.0.0',
   
   // Utility functions that might be useful externally
   utils: {
      $: $,
      $: $,
      
      // Debounce function for performance
      debounce: (func, wait) => {
         let timeout;
         return function executedFunction(...args) {
            const later = () => {
               clearTimeout(timeout);
               func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
         };
      },
      
      // Throttle function for performance
      throttle: (func, limit) => {
         let inThrottle;
         return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
               func.apply(context, args);
               inThrottle = true;
               setTimeout(() => inThrottle = false, limit);
            }
         };
      },
      
      // Check if element is in viewport
      isInViewport: (element) => {
         const rect = element.getBoundingClientRect();
         return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
         );
      }
   }
};
