/**
 * Finkison nav.js v5
 * Builds the app top-bar and sidebar for authenticated pages.
 * Auto-detects active page. Collapsible sections. Mobile drawer.
 */

// ── Navigation data ─────────────────────────────────────────────
const SECTIONS = [
  {
    id: 'learning',
    label: 'Learning',
    links: [
      { id: 'hub',      label: 'Learning Hub',         icon: '⊞',  href: 'learning-hub.html' },
      { id: 'adaptive', label: 'Adaptive Learning',    icon: '◈',  href: 'adaptive-learning.html' },
      { id: 'practice', label: 'Practice Center',      icon: '✎',  href: 'practice-center.html' },
      { id: 'exam',     label: 'Exam Simulation',      icon: '◻',  href: 'exam-simulation.html',      pro: true },
      { id: 'insights', label: 'Performance Insights', icon: '◷',  href: 'performance-insights.html' },
      { id: 'planner',  label: 'Study Planner',        icon: '▦',  href: 'study-planner.html' },
      { id: 'video',    label: 'Video Library',        icon: '▶',  href: 'video-library.html',        pro: true },
    ]
  },
  {
    id: 'community',
    label: 'Community',
    links: [
      { id: 'community',   label: 'Learning Community', icon: '◉',  href: 'learning-community.html', pro: true },
      { id: 'leaderboard', label: 'Leaderboard',        icon: '◈',  href: 'leaderboard.html',        pro: true },
    ]
  },
  {
    id: 'tools',
    label: 'Tools',
    links: [
      { id: 'aitutor', label: 'AI Tutor',       icon: '◎',  href: 'ai-tutor.html',    pro: true },
      { id: 'offline', label: 'Offline & USSD', icon: '◌',  href: 'offline-ussd.html' },
      { id: 'school',  label: 'School Admin',   icon: '▣',  href: 'school-admin.html', pro: true },
    ]
  },
  {
    id: 'account',
    label: 'Account',
    links: [
      { id: 'notifs',   label: 'Notifications',      icon: '◉',  href: 'notifications.html' },
      { id: 'parent',   label: 'Parent Portal',      icon: '◈',  href: 'parent-portal.html',    pro: true },
      { id: 'certs',    label: 'Certificates',       icon: '◆',  href: 'certificates.html' },
      { id: 'settings', label: 'Account & Settings', icon: '◎',  href: 'account-settings.html' },
    ]
  }
];

// file-name → link id
const FILE_IDS = {
  'learning-hub': 'hub', 'adaptive-learning': 'adaptive',
  'practice-center': 'practice', 'exam-simulation': 'exam',
  'performance-insights': 'insights', 'study-planner': 'planner',
  'video-library': 'video', 'learning-community': 'community',
  'leaderboard': 'leaderboard', 'ai-tutor': 'aitutor',
  'offline-ussd': 'offline', 'school-admin': 'school',
  'notifications': 'notifs', 'parent-portal': 'parent',
  'certificates': 'certs', 'account-settings': 'settings',
};

function getActive() {
  const name = location.pathname.split('/').pop().replace('.html', '') || '';
  const id = FILE_IDS[name] || null;
  if (!id) return null;
  for (const sec of SECTIONS) {
    const link = sec.links.find(l => l.id === id);
    if (link) return { section: sec, link };
  }
  return null;
}

// ── Build top-bar ────────────────────────────────────────────────
function buildTopBar() {
  const el = document.getElementById('app-topbar');
  if (!el) return;

  const active = getActive();
  const bcHtml = active
    ? `<span class="topbar-bc-group">${active.section.label}</span>
       <span class="topbar-bc-sep">›</span>
       <span class="topbar-bc-page">${active.link.label}</span>`
    : '';

  el.innerHTML = `
    <button class="topbar-toggle" id="sidebar-toggle" aria-label="Toggle navigation">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
    <a href="index.html" class="topbar-logo">
      <div class="topbar-logo-mark">🦅</div>
      <span class="topbar-logo-name">Finkison</span>
    </a>
    <div class="topbar-breadcrumb">${bcHtml}</div>
    <div class="topbar-actions">
      <div class="topbar-plan premium">👑 Premium</div>
      <div class="topbar-sep"></div>
      <a href="notifications.html" class="topbar-icon-btn" title="Notifications" aria-label="Notifications">
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
          <path d="M10 2a6 6 0 00-6 6v3L2.5 14h15L16 11V8a6 6 0 00-6-6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M8 16a2 2 0 004 0" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <span class="topbar-notif-dot"></span>
      </a>
      <a href="ai-tutor.html" class="topbar-ai-btn" title="Ask AI Tutor">
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
          <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.6 5.6l1.4 1.4M13 13l1.4 1.4M5.6 14.4l1.4-1.4M13 7l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span>Ask AI</span>
      </a>
      <a href="account-settings.html" class="topbar-avatar" title="Account" aria-label="Account settings">K</a>
    </div>
  `;

  document.getElementById('sidebar-toggle')?.addEventListener('click', toggleSidebar);
}

// ── Build sidebar ────────────────────────────────────────────────
function buildSidebar() {
  const el = document.getElementById('app-sidebar');
  if (!el) return;

  const active = getActive();
  const stored = JSON.parse(localStorage.getItem('fk_sections') || '{}');

  let html = '<div class="sidebar-scroll" id="sidebar-scroll">';

  SECTIONS.forEach(sec => {
    const isOpen = stored[sec.id] !== false; // default open
    html += `
      <div class="sidebar-section">
        <button class="sidebar-group-toggle" onclick="toggleSection('${sec.id}')" aria-expanded="${isOpen}">
          <span class="sidebar-group-label">${sec.label}</span>
          <span class="sidebar-group-chevron ${isOpen ? 'open' : ''}" id="chev-${sec.id}">›</span>
        </button>
        <div class="sidebar-links ${isOpen ? '' : 'collapsed'}" id="sec-${sec.id}">
    `;
    sec.links.forEach(link => {
      const isActive = active?.link.id === link.id;
      const pro = link.pro ? '<span class="sidebar-pro-tag">PRO</span>' : '';
      html += `
        <a href="${link.href}"
           class="sidebar-link ${isActive ? 'active' : ''}"
           title="${link.label}"
           aria-current="${isActive ? 'page' : 'false'}">
          <span class="sidebar-link-icon" aria-hidden="true">${link.icon}</span>
          <span class="sidebar-link-label">${link.label}</span>
          ${pro}
        </a>
      `;
    });
    html += `</div></div>`;
  });

  html += '</div>';

  // Footer
  html += `
    <div class="sidebar-footer">
      <a href="account-settings.html" class="sidebar-footer-user" title="Account & Settings">
        <div class="sidebar-footer-avatar">K</div>
        <div class="sidebar-footer-info">
          <span class="sidebar-footer-name">Kebede Alemu</span>
          <span class="sidebar-footer-plan">👑 Premium</span>
        </div>
      </a>
    </div>
  `;

  el.innerHTML = html;
}

// ── Section collapse/expand ──────────────────────────────────────
function toggleSection(id) {
  const body = document.getElementById(`sec-${id}`);
  const chev = document.getElementById(`chev-${id}`);
  const btn  = document.querySelector(`.sidebar-group-toggle[onclick="toggleSection('${id}')"]`);
  if (!body) return;

  const isOpen = !body.classList.contains('collapsed');
  body.classList.toggle('collapsed', isOpen);
  chev?.classList.toggle('open', !isOpen);
  btn?.setAttribute('aria-expanded', String(!isOpen));

  const stored = JSON.parse(localStorage.getItem('fk_sections') || '{}');
  stored[id] = !isOpen;
  localStorage.setItem('fk_sections', JSON.stringify(stored));
}

// ── Mobile/desktop sidebar toggle ───────────────────────────────
let sidebarCollapsed = localStorage.getItem('fk_sidebar_collapsed') === 'true';

function toggleSidebar() {
  const sidebar = document.getElementById('app-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar) return;

  if (window.innerWidth <= 900) {
    // Mobile: slide-in drawer
    const isOpen = sidebar.classList.toggle('mobile-open');
    if (overlay) overlay.classList.toggle('visible', isOpen);
  } else {
    // Desktop: collapse/expand
    sidebarCollapsed = !sidebarCollapsed;
    sidebar.classList.toggle('collapsed', sidebarCollapsed);
    localStorage.setItem('fk_sidebar_collapsed', sidebarCollapsed);
  }
}

// ── Initialise ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildTopBar();
  buildSidebar();

  // Apply saved desktop collapse state
  if (window.innerWidth > 900 && sidebarCollapsed) {
    document.getElementById('app-sidebar')?.classList.add('collapsed');
  }

  // Close mobile sidebar on overlay click
  document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
    document.getElementById('app-sidebar')?.classList.remove('mobile-open');
    document.getElementById('sidebar-overlay')?.classList.remove('visible');
  });

  // Close mobile sidebar when a link is clicked
  document.getElementById('app-sidebar')?.addEventListener('click', e => {
    if (e.target.closest('.sidebar-link') && window.innerWidth <= 900) {
      document.getElementById('app-sidebar')?.classList.remove('mobile-open');
      document.getElementById('sidebar-overlay')?.classList.remove('visible');
    }
  });
});
