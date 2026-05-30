// nav.js — shared sidebar builder for all app pages
// Each page includes this and the sidebar auto-highlights based on filename.

const NAV_LINKS = [
  { section: 'Public' },
  { id:'overview',  label:'Overview',            icon:'🏠', href:'index.html' },
  { id:'pricing',   label:'Plans & Pricing',     icon:'💰', href:'pricing.html' },
  { id:'signin',    label:'Sign In',             icon:'🔐', href:'signin.html' },
  { id:'onboard',   label:'Getting Started',     icon:'✨', href:'getting-started.html' },
  { section: 'Learning' },
  { id:'hub',       label:'Learning Hub',        icon:'📊', href:'learning-hub.html' },
  { id:'adaptive',  label:'Adaptive Learning',   icon:'🧠', href:'adaptive-learning.html' },
  { id:'practice',  label:'Practice Center',     icon:'✏️', href:'practice-center.html' },
  { id:'insights',  label:'Performance Insights',icon:'📈', href:'performance-insights.html' },
  { id:'planner',   label:'Study Planner',       icon:'📅', href:'study-planner.html' },
  { id:'video',     label:'Video Library',       icon:'🎬', href:'video-library.html',        premium:true },
  { section: 'Community' },
  { id:'community', label:'Learning Community',  icon:'👥', href:'learning-community.html',   premium:true },
  { id:'leaderboard',label:'Leaderboard',        icon:'🏆', href:'leaderboard.html',          premium:true },
  { section: 'Account' },
  { id:'notifs',    label:'Notifications',       icon:'🔔', href:'notifications.html' },
  { id:'parent',    label:'Parent Portal',       icon:'👨‍👩‍👧', href:'parent-portal.html',        premium:true },
  { id:'account',   label:'Account & Settings',  icon:'⚙️', href:'account-settings.html' },
];

// Map filename → nav id
const FILE_TO_ID = {
  'index':                 'overview',
  'pricing':               'pricing',
  'signin':                'signin',
  'getting-started':       'onboard',
  'learning-hub':          'hub',
  'adaptive-learning':     'adaptive',
  'practice-center':       'practice',
  'performance-insights':  'insights',
  'study-planner':         'planner',
  'video-library':         'video',
  'learning-community':    'community',
  'leaderboard':           'leaderboard',
  'notifications':         'notifs',
  'parent-portal':         'parent',
  'account-settings':      'account',
};

function buildNav(activeId) {
  const el = document.getElementById('sidebar');
  if (!el) return;
  let html = '';
  NAV_LINKS.forEach(item => {
    if (item.section) {
      html += `<div class="nav-section-label">${item.section}</div>`;
    } else {
      const active  = item.id === activeId ? ' active' : '';
      const lock    = item.premium ? ' premium-lock' : '';
      html += `<a href="${item.href}" class="nav-link${active}${lock}">
        <span class="ni">${item.icon}</span><span>${item.label}</span>
      </a>`;
    }
  });
  el.innerHTML = html;
}

// Auto-detect active page from filename and build sidebar
(function () {
  const filename = location.pathname.split('/').pop().replace('.html', '') || 'index';
  const activeId = FILE_TO_ID[filename] || 'overview';
  buildNav(activeId);
})();
