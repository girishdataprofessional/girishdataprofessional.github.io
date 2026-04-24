/* ============================================================
   MAIN SCRIPT — Girish E Portfolio
   Handles: Navigation | Typed Text | Counters | GitHub API
            Blog Renderer | Contact Form | Cursor | Canvas BG
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVIGATION ────────────────────────────────────────────
  const navBtns = document.querySelectorAll('[data-nav-btn]');
  const articles = document.querySelectorAll('[data-page]');

  function activatePage(target) {
    navBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    articles.forEach(a => a.classList.remove('active'));

    // nav button (may exist in sidebar hero-actions too)
    document.querySelectorAll(`[data-nav-btn="${target}"]`).forEach(b => {
      b.classList.add('active');
      b.setAttribute('aria-selected', 'true');
    });

    const activeArticle = document.querySelector(`[data-page="${target}"]`);
    if (!activeArticle) return;
    activeArticle.classList.add('active');

    setTimeout(() => {
      activeArticle.querySelectorAll('.reveal').forEach(r => r.classList.add('revealed'));
    }, 60);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Init page-specific stuff on first visit
    if (target === 'portfolio' && !window._ghFetched) {
      fetchGitHubRepos();
      window._ghFetched = true;
    }
    if (target === 'blog') renderBlog();
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-nav-btn');
      activatePage(target);
    });
  });

  // ── INTERSECTION OBSERVER (scroll reveals) ─────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Immediate reveal for first active section
  setTimeout(() => {
    document.querySelectorAll('.active .reveal').forEach(el => el.classList.add('revealed'));
  }, 120);

  // ── TYPED TEXT ANIMATION ───────────────────────────────────
  const roles = [
    'build data pipelines ⚙️',
    'design data warehouses ❄️',
    'automate with Airflow 🔄',
    'visualize with Tableau 📊',
    'engineer ETL workflows 🔗',
    'turn data into decisions 🚀'
  ];
  let roleIdx = 0, charIdx = 0, isDeleting = false;
  const typedEl = document.querySelector('.hero-role');

  function typeLoop() {
    if (!typedEl) return;
    const currentRole = roles[roleIdx];
    const displayed = isDeleting
      ? currentRole.substring(0, charIdx--)
      : currentRole.substring(0, charIdx++);

    typedEl.innerHTML = `I ${displayed}<span class="typed-cursor">|</span>`;

    let delay = isDeleting ? 40 : 70;
    if (!isDeleting && charIdx > currentRole.length) {
      delay = 2000; isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; delay = 300;
    }
    setTimeout(typeLoop, delay);
  }
  setTimeout(typeLoop, 800);

  // ── COUNTER ANIMATION ──────────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

  // ── CUSTOM CURSOR ──────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let cursorX = 0, cursorY = 0;
    let rafPending = false;
    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX; cursorY = e.clientY;
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => {
          cursor.style.left = cursorX + 'px';
          cursor.style.top = cursorY + 'px';
          rafPending = false;
        });
      }
    });
    document.querySelectorAll('a, button, .tech-hover, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ── PARTICLE NETWORK CANVAS ────────────────────────────────
  initNetworkCanvas();

  // ── CONTACT FORM ───────────────────────────────────────────
  initContactForm();

  // ── BLOG ───────────────────────────────────────────────────
  // Render immediately if blog section is somehow default, otherwise on nav
  if (document.querySelector('[data-page="blog"].active')) renderBlog();
});

// ============================================================
//  PARTICLE NETWORK BACKGROUND
// ============================================================
function initNetworkCanvas() {
  const canvas = document.getElementById('data-network-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, particles = [];
  const mouse = { x: null, y: null, radius: 130 };

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

  function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.5 + 0.8;
      this.alpha = Math.random() * 0.4 + 0.2;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(14, 165, 233, ${this.alpha})`;
      ctx.fill();
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
      if (mouse.x != null) {
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) { this.x += dx / dist * 1.8; this.y += dy / dist * 1.8; }
      }
      this.draw();
    }
  }

  function init() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 80);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, i) => {
      p.update();
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const d = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (d < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - d / 110) * 0.35})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });
  }
  init(); animate();
  window.addEventListener('resize', init);
}

// ============================================================
//  GITHUB REPOS
// ============================================================
let allRepos = [];

async function fetchGitHubRepos() {
  const container = document.getElementById('github-projects-container');
  if (!container) return;

  try {
    const res = await fetch('https://api.github.com/users/girishdataprofessional/repos?sort=updated&per_page=30');
    if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
    const data = await res.json();
    allRepos = data.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count);
    renderRepos(allRepos);
    setupFilters();
  } catch (err) {
    container.innerHTML = `<p class="terminal-text" style="color:#ef4444;grid-column:1/-1">⚠ ${err.message}</p>`;
  }
}

const LANG_COLORS = {
  'Python': '#3b82f6', 'Jupyter Notebook': '#f59e0b',
  'HTML': '#f97316', 'CSS': '#8b5cf6',
  'JavaScript': '#eab308', 'TypeScript': '#06b6d4',
  'R': '#22c55e', 'Shell': '#10b981',
};

function renderRepos(repos) {
  const container = document.getElementById('github-projects-container');
  if (!container) return;
  container.innerHTML = '';

  if (!repos.length) {
    container.innerHTML = '<p class="terminal-text" style="grid-column:1/-1">No repositories found.</p>';
    return;
  }

  repos.forEach(repo => {
    const lang = repo.language || 'Code';
    const color = LANG_COLORS[lang] || 'var(--text-muted)';
    const el = document.createElement('div');
    el.className = 'repo-card glass-panel tech-hover reveal revealed';
    el.innerHTML = `
      <div class="repo-header">
        <ion-icon class="repo-icon" name="folder-open-outline"></ion-icon>
        <div class="repo-links">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" title="Source"><ion-icon name="logo-github"></ion-icon></a>
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" title="Live Demo"><ion-icon name="open-outline"></ion-icon></a>` : ''}
        </div>
      </div>
      <div>
        <h3 class="repo-title">${repo.name}</h3>
        <p class="repo-desc">${repo.description || 'No description provided.'}</p>
      </div>
      <div class="repo-meta">
        <span style="color:${color}"><ion-icon name="ellipse"></ion-icon> ${lang}</span>
        <span><ion-icon name="star-outline"></ion-icon> ${repo.stargazers_count}</span>
        <span><ion-icon name="git-branch-outline"></ion-icon> ${repo.forks_count}</span>
      </div>
    `;
    container.appendChild(el);
  });
}

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const f = e.target.getAttribute('data-filter');
      renderRepos(f === 'all' ? allRepos : allRepos.filter(r => r.language === f));
    });
  });
}

// ============================================================
//  BLOG RENDERER
// ============================================================
function renderBlog() {
  const grid = document.getElementById('blog-grid');
  if (!grid || grid.dataset.rendered) return;
  grid.dataset.rendered = 'true';

  if (typeof BLOG_POSTS === 'undefined' || !BLOG_POSTS.length) {
    grid.innerHTML = '<p class="terminal-text">No blog posts yet. Check back soon!</p>';
    return;
  }

  BLOG_POSTS.forEach(post => {
    const dateStr = new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const card = document.createElement('a');
    card.className = 'blog-card glass-panel';
    card.href = post.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.setAttribute('aria-label', post.title);
    card.innerHTML = `
      <div class="blog-top">
        <div class="blog-emoji">${post.emoji}</div>
        <span class="blog-tag">${post.tag}</span>
      </div>
      <div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-summary">${post.summary}</p>
      </div>
      <div class="blog-meta">
        <span class="blog-date">📅 ${dateStr}</span>
        <span class="blog-readmore">Read on LinkedIn →</span>
      </div>
    `;
    grid.appendChild(card);
  });

  // observe new cards
  grid.querySelectorAll('.blog-card').forEach(el => {
    el.classList.add('reveal');
    setTimeout(() => el.classList.add('revealed'), 80);
  });
}

// ============================================================
//  CONTACT FORM (Formspree)
// ============================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('form-submit-btn');
    const btnText = document.getElementById('form-btn-text');
    const btnLoading = document.getElementById('form-btn-loading');
    const feedback = document.getElementById('form-feedback');

    // Basic validation
    const name = form.querySelector('#cf-name').value.trim();
    const email = form.querySelector('#cf-email').value.trim();
    const message = form.querySelector('#cf-message').value.trim();
    if (!name || !email || !message) {
      showFeedback(feedback, 'Please fill in all required fields.', 'error');
      return;
    }

    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        showFeedback(feedback, '✅ Message sent! I\'ll get back to you within 24 hours.', 'success');
        showToast('Message sent successfully! 🚀');
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err) {
      showFeedback(feedback, `⚠ ${err.message}. Please try emailing directly.`, 'error');
    } finally {
      btn.disabled = false;
      btnText.style.display = 'inline-flex';
      btnLoading.style.display = 'none';
    }
  });
}

function showFeedback(el, msg, type) {
  el.textContent = msg;
  el.className = `form-feedback ${type}`;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 6000);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 4000);
}