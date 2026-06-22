const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

document.addEventListener('DOMContentLoaded', () => {
  const tocSync = setupToc();
  setupTabs(tocSync);
  setupIosScaler();
  setupAndroidScaler();
  setupChecklist();
  setupSmoothScroll();
  setupSearch();
  setupBackToTop();
  setupScrollReveal();

  addEventListener('keydown', e => { if (e.key === 'Tab') document.body.classList.add('keyboard-nav'); });
  addEventListener('mousedown', () => document.body.classList.remove('keyboard-nav'));
});

function setupTabs(onChange) {
  const tabs = $$('.tab');
  const panels = $$('.panel');
  if (!tabs.length) return;

  function activate(tab) {
    tabs.forEach(t => {
      const on = t === tab;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
    });

    const id = tab.dataset.tab;
    panels.forEach(p => {
      const on = p.id === `${id}-panel`;
      p.classList.toggle('active', on);
      if (on) p.tabIndex = 0;
      else p.removeAttribute('tabindex');
    });

    onChange?.(id);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', e => {
      const i = tabs.indexOf(tab);
      let next;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs.at(-1);
      else return;

      e.preventDefault();
      activate(next);
      next.focus();
    });
  });
}

function buildDemos(prefix, baseSizes) {
  return Object.entries(baseSizes).map(([key, base]) => ({
    el: $(`#${prefix}-${key}-demo`),
    base,
  }));
}

function setupIosScaler() {
  const slider = $('#ios-scale');
  const out = $('#ios-scale-value');
  if (!slider) return;

  const labels = ['xSmall', 'Small', 'Medium', 'Large (Default)', 'xLarge', 'xxLarge',
    'xxxLarge', 'AX1', 'AX2', 'AX3', 'AX4', 'AX5'];
  const factors = [0.8, 0.9, 0.95, 1, 1.15, 1.3, 1.5, 1.7, 1.9, 2.1, 2.35, 2.65];

  const demos = buildDemos('ios', {
    large: 2.125, title1: 1.75, title2: 1.375, headline: 1.0625,
    body: 1.0625, callout: 1, footnote: 0.8125, caption: 0.75,
  });

  function update() {
    const i = Number(slider.value);
    out.textContent = labels[i];
    slider.setAttribute('aria-valuetext', labels[i]);
    for (const { el, base } of demos) {
      if (el) el.style.fontSize = base * factors[i] + 'rem';
    }
  }

  slider.addEventListener('input', update);
  update();
}

function setupAndroidScaler() {
  const slider = $('#android-scale');
  const out = $('#android-scale-value');
  if (!slider) return;

  const demos = buildDemos('android', {
    display: 3.5625, headline: 2, title: 1, body: 1, label: 0.6875,
  });

  function update() {
    const factor = parseFloat(slider.value);
    const text = factor.toFixed(1) + 'x';
    out.textContent = text;
    slider.setAttribute('aria-valuetext', text);
    for (const { el, base } of demos) {
      if (el) el.style.fontSize = base * factor + 'rem';
    }
  }

  slider.addEventListener('input', update);
  update();
}

function setupChecklist() {
  $$('.checklist-item input[type="checkbox"]').forEach(box => {
    box.addEventListener('change', () => {
      const item = box.closest('.checklist-item');
      item.style.textDecoration = box.checked ? 'line-through' : '';
      item.style.color = box.checked ? 'var(--color-text-tertiary)' : '';
    });
  });
}

function setupSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.length < 2) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (target.tabIndex < 0) target.tabIndex = -1;
      target.focus({ preventScroll: true });
    });
  });
}

function setupToc() {
  const items = $$('.toc-item');
  const links = $$('.toc-list a');

  function syncToPanel(panelId) {
    items.forEach(item => {
      const show = !item.dataset.panel || item.dataset.panel === panelId;
      item.style.display = show ? '' : 'none';
    });
  }

  function highlight() {
    let best = null;
    let bestDist = Infinity;
    links.forEach(link => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      const dist = Math.abs(target.getBoundingClientRect().top - 100);
      if (dist < bestDist) {
        bestDist = dist;
        best = link;
      }
    });
    links.forEach(l => l.classList.toggle('toc-active', l === best));
  }

  window.addEventListener('scroll', highlight, { passive: true });
  syncToPanel('ios');
  highlight();

  return syncToPanel;
}

function setupSearch() {
  const input = $('#guide-search');
  const count = $('#search-count');
  if (!input) return;

  const originals = new Map();

  function reset() {
    originals.forEach((html, el) => { el.innerHTML = html; });
    originals.clear();
  }

  function run(query) {
    reset();

    if (query.length < 2) {
      count.textContent = '';
      return;
    }

    const re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    let hits = 0;

    $$('.panel p, .panel li, .panel h3, .panel h4, .panel h5, .panel h6, .panel td, .panel caption')
      .forEach(el => {
        if (el.querySelector('code, pre')) return;
        if (!re.test(el.textContent)) return;
        re.lastIndex = 0;

        originals.set(el, el.innerHTML);
        el.innerHTML = el.innerHTML.replace(re, m => `<mark class="search-highlight">${m}</mark>`);
        hits++;
      });

    $('.search-highlight')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    count.textContent = hits ? `${hits} match${hits === 1 ? '' : 'es'}` : 'No matches';
  }

  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => run(input.value.trim()), 250);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      input.value = '';
      run('');
      input.blur();
    }
  });
}

function setupBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 2000);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function setupScrollReveal() {
  const cards = $$('.type-card, .practice-card, .checklist-card');
  if (!cards.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('animate-in');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '50px' });

  cards.forEach(c => io.observe(c));
}
