/**
 * BankiyeMonitor - Interactive Frontend Application Logic
 * SMS Parsing & Security Intelligence for Ethiopian Banking (Wolaita Sodo)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initShowcaseTabs();
  initSearchDemo();
  initFaqAccordion();
  initDirectDownload();
  initDemoModal();
  initReturnToHome();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  
  const savedTheme = localStorage.getItem('bankiye-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('bankiye-theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);
  
  updateThemeIcons(document.documentElement.classList.contains('dark'));
}

function updateThemeIcons(isDark) {
  const sunIcons = document.querySelectorAll('.theme-sun-icon');
  const moonIcons = document.querySelectorAll('.theme-moon-icon');
  
  sunIcons.forEach(icon => {
    icon.style.display = isDark ? 'block' : 'none';
  });
  moonIcons.forEach(icon => {
    icon.style.display = isDark ? 'none' : 'block';
  });
}

/* ==========================================================================
   2. Navigation & Scrollspy
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-md');
      navbar.style.backdropFilter = 'blur(24px)';
    } else {
      navbar.classList.remove('shadow-md');
    }
    updateScrollSpy();
  });

  if (mobileMenuBtn && mobileMenuDrawer) {
    const barsIcon = mobileMenuBtn.querySelector('.menu-icon-bars');
    const closeIcon = mobileMenuBtn.querySelector('.menu-icon-close');

    function toggleMenu(open) {
      if (open) {
        mobileMenuDrawer.classList.remove('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        if (barsIcon) barsIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
      } else {
        mobileMenuDrawer.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        if (barsIcon) barsIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      }
    }

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !mobileMenuDrawer.classList.contains('hidden');
      toggleMenu(!isOpen);
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close when clicking outside mobile drawer
    document.addEventListener('click', (e) => {
      if (!mobileMenuDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        if (!mobileMenuDrawer.classList.contains('hidden')) {
          toggleMenu(false);
        }
      }
    });
  }
}

function updateScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('text-blue-600', 'font-semibold', 'dark:text-blue-400'));
      if (navLink) {
        navLink.classList.add('text-blue-600', 'font-semibold', 'dark:text-blue-400');
      }
    }
  });
}

/* ==========================================================================
   3. Application Showcase Tab Switching
   ========================================================================== */
const showcaseScreens = {
  screen1: {
    title: 'Security Dashboard',
    subtitle: 'Real-time security overview showing login attempts, device sessions, spoof detection status, and aggregated financial summary.',
    html: `
      <div class="p-4 space-y-4">
        <div class="flex items-center justify-between pt-2">
          <div class="flex items-center gap-2">
            <img src="assets/logo.png" alt="BM" class="w-8 h-8 rounded-xl shadow-sm">
            <div>
              <p class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Security Status</p>
              <h4 class="text-xs font-bold text-slate-900 dark:text-white">Dawit Haile — Wolaita Sodo</h4>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Protected</span>
          </div>
        </div>

        <!-- Security Alert Banner -->
        <div class="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5">
          <div class="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">!</div>
          <div>
            <span class="text-[11px] font-bold text-rose-800 dark:text-rose-200 block">2 Security Alerts This Week</span>
            <p class="text-[10px] text-rose-700 dark:text-rose-300 leading-tight">1 unrecognized device login, 1 unrequested OTP detected. Tap to review.</p>
          </div>
        </div>

        <!-- Weekly Executive Summary Card -->
        <div class="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-[#0C88BE] via-[#09597E] to-[#073247] border border-[#41C0F2]/30 text-white shadow-lg">
          <div class="flex justify-between items-start">
            <div>
              <span class="text-[10px] font-medium text-blue-200">Weekly Executive Summary</span>
              <div class="flex items-baseline gap-1 mt-0.5">
                <span class="text-xs font-semibold text-blue-200">ETB</span>
                <span class="text-2xl font-extrabold tracking-tight">84,350.50</span>
              </div>
            </div>
            <div class="px-2 py-1 bg-white/15 rounded-lg backdrop-blur-sm text-[10px] font-bold text-emerald-300 flex items-center gap-1">
              Oct 20-26
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-xs">
            <div>
              <span class="text-[10px] text-blue-200 block">Total In</span>
              <span class="font-bold text-emerald-300">ETB 65,000</span>
            </div>
            <div>
              <span class="text-[10px] text-blue-200 block">Total Out</span>
              <span class="font-bold text-amber-300">ETB 24,150</span>
            </div>
            <div>
              <span class="text-[10px] text-blue-200 block">Logins</span>
              <span class="font-bold text-rose-300">4 (1⚠)</span>
            </div>
          </div>
        </div>

        <!-- Security Activity Grid -->
        <div class="grid grid-cols-2 gap-2">
          <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <span class="text-[10px] text-slate-400 font-semibold block">Login Attempts</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-lg font-extrabold text-slate-900 dark:text-white">4</span>
              <span class="text-[9px] text-rose-500 font-bold">1 flagged</span>
            </div>
          </div>
          <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <span class="text-[10px] text-slate-400 font-semibold block">Active Sessions</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-lg font-extrabold text-slate-900 dark:text-white">2</span>
              <span class="text-[9px] text-emerald-500 font-bold">verified</span>
            </div>
          </div>
          <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <span class="text-[10px] text-slate-400 font-semibold block">Spoofed SMS</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-lg font-extrabold text-rose-500">1</span>
              <span class="text-[9px] text-emerald-500 font-bold">blocked</span>
            </div>
          </div>
          <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <span class="text-[10px] text-slate-400 font-semibold block">Password Resets</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-lg font-extrabold text-slate-900 dark:text-white">0</span>
              <span class="text-[9px] text-emerald-500 font-bold">safe</span>
            </div>
          </div>
        </div>

        <!-- Recent Parsed Activity -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <h5 class="text-xs font-bold text-slate-900 dark:text-white">Recent Parsed Activity</h5>
            <span class="text-[10px] text-blue-600 dark:text-blue-400 font-semibold cursor-pointer">View All</span>
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-800/50 shadow-sm">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center">
                  <svg class="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <div>
                  <p class="text-xs font-bold text-rose-800 dark:text-rose-200">New Device Login</p>
                  <p class="text-[10px] text-rose-600 dark:text-rose-400">Dashen Bank • Chrome/Win</p>
                </div>
              </div>
              <span class="text-[10px] font-bold text-rose-500">ALERT</span>
            </div>

            <div class="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/50 shadow-sm">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-[#41C0F2]/10 border border-[#41C0F2]/20 p-1 flex items-center justify-center">
                  <img src="assets/banks/cbe.svg" class="w-full h-full object-contain">
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-900 dark:text-white">Salary Deposit</p>
                  <p class="text-[10px] text-slate-400">CBE • Today, 08:30 AM</p>
                </div>
              </div>
              <span class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">+ETB 35,000</span>
            </div>
          </div>
        </div>
      </div>
    `
  },
  screen2: {
    title: 'Transaction Ledger',
    subtitle: 'Unified historical ledger of all parsed transactions from every bank in Wolaita Sodo, with sender verification status.',
    html: `
      <div class="p-4 space-y-3">
        <div class="flex items-center justify-between pt-2">
          <div>
            <h4 class="text-sm font-extrabold text-slate-900 dark:text-white">Transaction Ledger</h4>
            <p class="text-[10px] text-slate-400">142 parsed • 1 spoofed blocked • 4 accounts</p>
          </div>
          <button class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
          </button>
        </div>

        <div class="relative">
          <input type="text" placeholder="Search amount, merchant, or bank..." value="" readonly class="w-full text-xs px-3 py-2 pl-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
          <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today • 26 Oct 2026</span>
          <div class="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
        </div>

        <div class="space-y-2">
          <div class="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-800/50 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center">
                <svg class="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
              </div>
              <div>
                <p class="text-xs font-bold text-rose-800 dark:text-rose-200">⚠ Spoofed SMS Blocked</p>
                <p class="text-[10px] text-rose-500">Fake "CBE" • Sender not whitelisted</p>
              </div>
            </div>
            <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500 text-white">SPOOF</span>
          </div>

          <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/50 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/40 p-1 flex items-center justify-center">
                <img src="assets/banks/telebirr.svg" class="w-full h-full object-contain">
              </div>
              <div>
                <p class="text-xs font-bold text-slate-900 dark:text-white">TO.MO.CA Coffee</p>
                <p class="text-[10px] text-slate-400">Telebirr • 03:45 PM <span class="text-emerald-500">✓ verified</span></p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-xs font-bold text-rose-500">-ETB 320.00</span>
              <span class="block text-[9px] text-slate-400">Bal: 3,420.50</span>
            </div>
          </div>

          <div class="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/50 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-[#41C0F2]/10 border border-[#41C0F2]/20 p-1 flex items-center justify-center">
                <img src="assets/banks/cbe.svg" class="w-full h-full object-contain">
              </div>
              <div>
                <p class="text-xs font-bold text-slate-900 dark:text-white">Salary — Ethiopian Airlines</p>
                <p class="text-[10px] text-slate-400">CBE • 10:15 AM <span class="text-emerald-500">✓ verified</span></p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-xs font-bold text-emerald-500">+ETB 35,000</span>
              <span class="block text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Income</span>
            </div>
          </div>

          <div class="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/40 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                <svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
              </div>
              <div>
                <p class="text-xs font-bold text-amber-800 dark:text-amber-200">Password Reset Request</p>
                <p class="text-[10px] text-amber-600 dark:text-amber-400">Dashen Bank • 09:02 AM</p>
              </div>
            </div>
            <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500 text-white">REVIEW</span>
          </div>
        </div>
      </div>
    `
  },
  screen3: {
    title: 'Analytics & Threat Summary',
    subtitle: 'Aggregated weekly/monthly spending breakdown alongside security event analysis and counterparty summaries.',
    html: `
      <div class="p-4 space-y-3.5">
        <div class="flex items-center justify-between pt-2">
          <h4 class="text-sm font-extrabold text-slate-900 dark:text-white">Financial Analytics</h4>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Oct 2026</span>
        </div>

        <!-- Security Score Gauge -->
        <div class="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-900 dark:text-white">Account Security Score</span>
            <span class="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">87/100</span>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div class="bg-gradient-to-r from-emerald-500 to-blue-500 h-full rounded-full" style="width: 87%"></div>
          </div>
          <p class="text-[10px] text-slate-500 mt-1.5">-3 pts: Unrecognized device login on Oct 24</p>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block">Total Inflow</span>
            <span class="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">ETB 65,000</span>
          </div>
          <div class="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <span class="text-[10px] text-rose-700 dark:text-rose-400 font-semibold block">Total Outflow</span>
            <span class="text-sm font-extrabold text-rose-700 dark:text-rose-300">ETB 24,150</span>
          </div>
        </div>

        <!-- Counterparty Summary -->
        <div class="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-3">
          <span class="text-xs font-bold text-slate-900 dark:text-white">Top Counterparties</span>
          <div>
            <div class="flex justify-between text-[11px] mb-1">
              <span class="font-medium text-slate-700 dark:text-slate-300">Ethiopian Airlines (Salary)</span>
              <span class="font-bold text-emerald-600">+ETB 35,000</span>
            </div>
            <div class="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div class="bg-emerald-500 h-full rounded-full" style="width: 54%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-[11px] mb-1">
              <span class="font-medium text-slate-700 dark:text-slate-300">Kaldi's Coffee (Merchant)</span>
              <span class="font-bold text-slate-900 dark:text-white">-ETB 4,850</span>
            </div>
            <div class="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div class="bg-blue-500 h-full rounded-full" style="width: 20%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-[11px] mb-1">
              <span class="font-medium text-slate-700 dark:text-slate-300">Ethio Telecom (Utility)</span>
              <span class="font-bold text-slate-900 dark:text-white">-ETB 1,850</span>
            </div>
            <div class="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div class="bg-amber-500 h-full rounded-full" style="width: 7.6%"></div>
            </div>
          </div>
        </div>

        <!-- Security Events this month -->
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Security Events — October</span>
          <div class="grid grid-cols-3 gap-2 text-center">
            <div>
              <span class="text-base font-extrabold text-slate-900 dark:text-white block">7</span>
              <span class="text-[9px] text-slate-400">Logins</span>
            </div>
            <div>
              <span class="text-base font-extrabold text-rose-500 block">1</span>
              <span class="text-[9px] text-slate-400">Spoofed</span>
            </div>
            <div>
              <span class="text-base font-extrabold text-amber-500 block">1</span>
              <span class="text-[9px] text-slate-400">PWD Reset</span>
            </div>
          </div>
        </div>
      </div>
    `
  },
  screen4: {
    title: 'Multi-Bank Accounts',
    subtitle: 'Unified view of all Wolaita Sodo bank accounts with sender ID verification status and last-parsed transaction.',
    html: `
      <div class="p-4 space-y-3">
        <div class="flex items-center justify-between pt-2">
          <div>
            <h4 class="text-sm font-extrabold text-slate-900 dark:text-white">Connected Accounts</h4>
            <p class="text-[10px] text-slate-400">4 accounts • All sender IDs whitelisted ✓</p>
          </div>
          <span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">All Verified</span>
        </div>

        <div class="space-y-2.5">
          <div class="p-3.5 rounded-2xl bg-gradient-to-r from-[#0C88BE] to-[#073247] border border-[#41C0F2]/30 text-white shadow-md relative overflow-hidden">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[9px] font-bold uppercase tracking-wider text-[#A2E2FB]">Commercial Bank of Ethiopia</span>
                <p class="text-xs text-white/90 font-mono mt-0.5">A/C •••• 4829 • <span class="text-emerald-300 font-bold">✓ Verified Sender</span></p>
              </div>
              <img src="assets/banks/cbe.svg" class="w-8 h-8 rounded-lg bg-white/10 p-1">
            </div>
            <div class="mt-3 flex items-end justify-between">
              <div>
                <span class="text-[10px] text-[#A2E2FB] block">Balance</span>
                <span class="text-base font-extrabold">ETB 42,120.00</span>
              </div>
              <span class="text-[10px] text-[#A2E2FB]">Last: 2h ago</span>
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-md">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[9px] font-bold uppercase tracking-wider text-sky-200">Telebirr Wallet</span>
                <p class="text-xs text-sky-100 font-mono mt-0.5">Phone •••• 9481 • <span class="text-emerald-300 font-bold">✓ Verified Sender</span></p>
              </div>
              <img src="assets/banks/telebirr.svg" class="w-8 h-8 rounded-lg bg-white/10 p-1">
            </div>
            <div class="mt-3 flex items-end justify-between">
              <div>
                <span class="text-[10px] text-sky-200 block">Balance</span>
                <span class="text-base font-extrabold">ETB 18,740.50</span>
              </div>
              <span class="text-[10px] text-sky-200">Last: 35m ago</span>
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-gradient-to-r from-[#0B2538] to-[#051824] border border-[#41C0F2]/20 text-white shadow-md">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[9px] font-bold uppercase tracking-wider text-[#A2E2FB]">Dashen Bank</span>
                <p class="text-xs text-blue-100 font-mono mt-0.5">A/C •••• 0193 • <span class="text-emerald-300 font-bold">✓ Verified Sender</span></p>
              </div>
              <img src="assets/banks/dashen.svg" class="w-8 h-8 rounded-lg bg-white/10 p-1">
            </div>
            <div class="mt-3 flex items-end justify-between">
              <div>
                <span class="text-[10px] text-blue-200 block">Balance</span>
                <span class="text-base font-extrabold">ETB 15,200.00</span>
              </div>
              <span class="text-[10px] text-amber-300 font-bold">⚠ Login Alert</span>
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-gradient-to-r from-[#0E3A54] to-[#082232] border border-[#41C0F2]/20 text-white shadow-md">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[9px] font-bold uppercase tracking-wider text-[#A2E2FB]">Awash Bank</span>
                <p class="text-xs text-blue-100 font-mono mt-0.5">A/C •••• 0132 • <span class="text-emerald-300 font-bold">✓ Verified Sender</span></p>
              </div>
              <img src="assets/banks/awash.svg" class="w-8 h-8 rounded-lg bg-white/10 p-1">
            </div>
            <div class="mt-3 flex items-end justify-between">
              <div>
                <span class="text-[10px] text-blue-200 block">Balance</span>
                <span class="text-base font-extrabold">ETB 8,290.00</span>
              </div>
              <span class="text-[10px] text-blue-200">Last: 1d ago</span>
            </div>
          </div>
        </div>
      </div>
    `
  }
};

function initShowcaseTabs() {
  const tabButtons = document.querySelectorAll('.showcase-tab-btn');
  const screenContainer = document.getElementById('showcase-screen-content');
  const titleEl = document.getElementById('showcase-active-title');
  const subtitleEl = document.getElementById('showcase-active-subtitle');

  if (!tabButtons.length || !screenContainer) return;

  function setScreen(screenKey) {
    const data = showcaseScreens[screenKey];
    if (!data) return;

    tabButtons.forEach(btn => {
      const isActive = btn.dataset.screen === screenKey;
      if (isActive) {
        btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      }
    });

    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;

    screenContainer.style.opacity = '0';
    setTimeout(() => {
      screenContainer.innerHTML = data.html;
      screenContainer.style.opacity = '1';
    }, 150);
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setScreen(btn.dataset.screen);
    });
  });

  setScreen('screen1');
}

/* ==========================================================================
   4. Interactive Search Demo Widget
   ========================================================================== */
const demoTransactions = [
  { bank: 'CBE', title: 'Salary Deposit', merchant: 'Ethiopian Airlines', amount: '+ETB 35,000.00', date: '26 Oct 2026', cat: 'Income', logo: 'assets/banks/cbe.svg', verified: true, alert: false },
  { bank: '⚠ SPOOFED', title: 'Phishing Attempt Blocked', merchant: 'Fake CBE sender', amount: 'N/A', date: '26 Oct 2026', cat: 'Spoof', logo: '', verified: false, alert: true },
  { bank: 'Dashen', title: '🔴 New Device Login', merchant: 'Chrome/Windows', amount: 'N/A', date: '25 Oct 2026', cat: 'Security', logo: 'assets/banks/dashen.svg', verified: true, alert: true },
  { bank: 'Telebirr', title: 'Kaldi\'s Coffee', merchant: 'Bole Medhanialem', amount: '-ETB 480.00', date: '26 Oct 2026', cat: 'Dining', logo: 'assets/banks/telebirr.svg', verified: true, alert: false },
  { bank: 'Awash', title: 'Transfer to Abebe', merchant: 'P2P Transfer', amount: '-ETB 5,500.00', date: '25 Oct 2026', cat: 'Transfer', logo: 'assets/banks/awash.svg', verified: true, alert: false },
  { bank: 'Telebirr', title: 'Ethio Telecom Fiber', merchant: 'Monthly Internet', amount: '-ETB 1,850.00', date: '24 Oct 2026', cat: 'Utility', logo: 'assets/banks/telebirr.svg', verified: true, alert: false },
  { bank: 'Dashen', title: 'Grocery Supermarket', merchant: 'Safeway Sodo', amount: '-ETB 3,420.00', date: '23 Oct 2026', cat: 'Grocery', logo: 'assets/banks/dashen.svg', verified: true, alert: false },
];

function initSearchDemo() {
  const searchInput = document.getElementById('feature-search-input');
  const resultsList = document.getElementById('feature-search-results');

  if (!searchInput || !resultsList) return;

  function render(items) {
    if (!items.length) {
      resultsList.innerHTML = `<div class="p-6 text-center text-slate-400"><p class="text-xs">No matching records found.</p></div>`;
      return;
    }

    resultsList.innerHTML = items.map(tx => `
      <div class="flex items-center justify-between p-3 rounded-xl ${tx.alert ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-800/50' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60'} border transition hover:border-blue-500/50">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl ${tx.alert && !tx.verified ? 'bg-rose-100 dark:bg-rose-900/40' : 'bg-white dark:bg-slate-800'} p-1.5 border ${tx.alert ? 'border-rose-300 dark:border-rose-700' : 'border-slate-200 dark:border-slate-700'} shadow-sm flex items-center justify-center flex-shrink-0">
            ${tx.logo ? `<img src="${tx.logo}" alt="${tx.bank}" class="w-full h-full object-contain">` : '<span class="text-rose-500 font-bold text-sm">⚠</span>'}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold ${tx.alert ? 'text-rose-800 dark:text-rose-200' : 'text-slate-900 dark:text-white'}">${tx.title}</span>
              <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold ${tx.alert ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}">${tx.cat}</span>
            </div>
            <p class="text-[11px] ${tx.alert ? 'text-rose-500 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}">${tx.merchant} • ${tx.date} ${tx.verified ? '<span class="text-emerald-500">✓</span>' : '<span class="text-rose-500">✗ unverified</span>'}</p>
          </div>
        </div>
        <div class="text-right">
          <span class="text-xs font-extrabold ${tx.amount.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : tx.alert ? 'text-rose-500' : 'text-slate-900 dark:text-white'}">${tx.amount}</span>
          <span class="block text-[10px] text-slate-400 font-mono">${tx.bank}</span>
        </div>
      </div>
    `).join('');
  }

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) { render(demoTransactions); return; }
    const filtered = demoTransactions.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.merchant.toLowerCase().includes(q) ||
      item.bank.toLowerCase().includes(q) ||
      item.amount.toLowerCase().includes(q) ||
      item.cat.toLowerCase().includes(q)
    );
    render(filtered);
  });

  render(demoTransactions);
}

/* ==========================================================================
   7. FAQ Accordion Logic
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const chevron = item.querySelector('.faq-chevron');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isOpen = content.classList.contains('open');

      faqItems.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.faq-content');
        const otherChevron = otherItem.querySelector('.faq-chevron');
        if (otherContent) otherContent.classList.remove('open');
        if (otherChevron) otherChevron.classList.remove('open');
      });

      if (!isOpen) {
        content.classList.add('open');
        if (chevron) chevron.classList.add('open');
      }
    });
  });
}

/* ==========================================================================
   8. Direct APK Download (No Modals)
   ========================================================================== */
function initDirectDownload() {
  // Direct downloads are handled natively by HTML5 download attributes on:
  // <a href="downloads/bankiyeMonitordownload.apk" download="BankiyeMonitor-v1.0-beta.apk">
  // No event cancellation or synthetic blobs, ensuring the authentic 16.5 MB APK binary downloads.
  const downloadLinks = document.querySelectorAll('.direct-download-link');
  downloadLinks.forEach(link => {
    link.addEventListener('click', () => {
      console.log('Initiating authentic BankiyeMonitor-v1.0-beta.apk direct download (16.5 MB)...');
    });
  });
}

/* ==========================================================================
   9. Demo Modal
   ========================================================================== */
function initDemoModal() {
  const modal = document.getElementById('demo-modal');
  const openButtons = document.querySelectorAll('.open-demo-modal');
  const closeButtons = document.querySelectorAll('.close-demo-modal');

  if (!modal) return;

  function openModal() { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }

  openButtons.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

/* ==========================================================================
   Always-On Return to Home Controller
   ========================================================================== */
function initReturnToHome() {
  const returnToHomeBtn = document.getElementById('return-to-home');
  if (!returnToHomeBtn) return;

  returnToHomeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
