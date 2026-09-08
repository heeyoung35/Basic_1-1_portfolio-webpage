/**
 * Basic 1-1 Portfolio Webpage - Main Application Logic
 * Standard: ES6+, Strict Mode, Event-Driven Architecture, State Management
 */

'use strict';

// Global Configuration & Constants
const CONFIG = {
  GITHUB_USERNAME: 'heeyoung35',
  NAV_SCROLL_THRESHOLD: 60,
  SCROLL_TOP_THRESHOLD: 300,
  OBSERVER_THRESHOLD: 0.2,
  TYPING_SPEED: 90,
  TYPING_ERASE_SPEED: 40,
  TYPING_DELAY: 1800,
  LOCAL_STORAGE_THEME_KEY: 'heeyoung_portfolio_theme'
};

// Global Application State
const state = {
  theme: 'light',
  projects: [],
  filteredProjects: [],
  currentFilter: 'all',
  isLoadingProjects: false,
  projectsError: null
};

// DOM Content Loaded Entry Point
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initTypingEffect();
  initScrollTop();
  initScrollObserver();
  initProjects();
  initContactForm();
});

/* ==========================================================================
   1. Theme Management (Dark Mode & LocalStorage)
   State -> UI Update
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.querySelector('#theme-toggle');
  
  // 1) Load theme from localStorage or system preference
  const savedTheme = localStorage.getItem(CONFIG.LOCAL_STORAGE_THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    state.theme = savedTheme;
  } else if (prefersDark) {
    state.theme = 'dark';
  } else {
    state.theme = 'light';
  }
  
  applyTheme(state.theme);
  
  // 2) Event listener for theme toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem(CONFIG.LOCAL_STORAGE_THEME_KEY, state.theme);
      applyTheme(state.theme);
    });
  }
  
  // 3) Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(CONFIG.LOCAL_STORAGE_THEME_KEY)) {
      state.theme = e.matches ? 'dark' : 'light';
      applyTheme(state.theme);
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggleBtn = document.querySelector('#theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-label', `${theme === 'dark' ? '라이트' : '다크'} 모드로 전환`);
  }
}

/* ==========================================================================
   2. Navbar & Mobile Hamburger Menu
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('#header');
  const hamburgerBtn = document.querySelector('#hamburger-btn');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Header background style change on scroll (> 60px)
  window.addEventListener('scroll', () => {
    if (window.scrollY > CONFIG.NAV_SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    updateActiveNavLinkOnScroll();
  });
  
  // Hamburger Menu Toggle
  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isActive = mainNav.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
  }
  
  // Smooth scroll & Active Link updating on navigation click
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu if open
        if (mainNav && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          hamburgerBtn.classList.remove('active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
        
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Active Nav Link scroll highlighting
function updateActiveNavLinkOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 120;
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (correspondingLink) {
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
        correspondingLink.classList.add('active');
      }
    }
  });
}

/* ==========================================================================
   3. Hero Typing Effect (Bonus Requirement)
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.querySelector('#typing-text');
  if (!typingElement) return;
  
  const phrases = [
    'HTML / CSS / JavaScript 개발자',
    '웹 반응형 인터랙션 설계자',
    '사용자 경험을 만드는 프론트엔드 인재'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let speed = isDeleting ? CONFIG.TYPING_ERASE_SPEED : CONFIG.TYPING_SPEED;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = CONFIG.TYPING_DELAY;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }
    
    setTimeout(type, speed);
  }
  
  type();
}

/* ==========================================================================
   4. Scroll to Top Button (> 300px)
   ========================================================================== */
function initScrollTop() {
  const scrollTopBtn = document.querySelector('#scroll-top');
  if (!scrollTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > CONFIG.SCROLL_TOP_THRESHOLD) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   5. Scroll Animation (IntersectionObserver threshold = 0.2)
   ========================================================================== */
function initScrollObserver() {
  const revealSections = document.querySelectorAll('.reveal-section');
  if (!revealSections.length) return;
  
  const observerOptions = {
    root: null,
    threshold: CONFIG.OBSERVER_THRESHOLD,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealSections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   6. GitHub API Integration & State-Driven UI (4 States + Filtering)
   State: Loading, Success, Error, Empty
   ========================================================================== */
function initProjects() {
  const retryBtn = document.querySelector('#retry-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Fetch initial project list
  fetchGitHubProjects();
  
  // Retry button listener
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      fetchGitHubProjects();
    });
  }
  
  // Filter buttons listener
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      state.currentFilter = filterValue;
      renderProjectsByFilter();
    });
  });
}

async function fetchGitHubProjects() {
  const loadingContainer = document.querySelector('#projects-loading');
  const errorContainer = document.querySelector('#projects-error');
  const emptyContainer = document.querySelector('#projects-empty');
  const gridContainer = document.querySelector('#projects-grid');
  const errorMessageText = document.querySelector('#error-message-text');
  
  // 1) Update State to Loading
  state.isLoadingProjects = true;
  state.projectsError = null;
  
  loadingContainer.classList.remove('hidden');
  errorContainer.classList.add('hidden');
  emptyContainer.classList.add('hidden');
  gridContainer.classList.add('hidden');
  
  try {
    const response = await fetch(`https://api.github.com/users/${CONFIG.GITHUB_USERNAME}/repos?sort=updated&per_page=12`);
    
    // Rate limit check (403 Response) or Not Found
    if (response.status === 403) {
      throw new Error('GitHub API 호출 한도(Rate Limit: 60회/시간)를 초과했습니다. 잠시 후 다시 시도해 주세요.');
    } else if (response.status === 404) {
      throw new Error('지정된 GitHub 사용자를 찾을 수 없습니다.');
    } else if (!response.ok) {
      throw new Error(`서버 응답 오류가 발생했습니다. (상태 코드: ${response.status})`);
    }
    
    const data = await response.json();
    
    // Sort by stargazer count / updated
    state.projects = data.filter((repo) => !repo.fork); // exclude forks for clean display
    state.isLoadingProjects = false;
    
    loadingContainer.classList.add('hidden');
    renderProjectsByFilter();
    
  } catch (error) {
    console.error('GitHub API Fetch Error:', error);
    state.isLoadingProjects = false;
    state.projectsError = error.message;
    
    loadingContainer.classList.add('hidden');
    if (errorMessageText) {
      errorMessageText.textContent = error.message;
    }
    errorContainer.classList.remove('hidden');
  }
}

function renderProjectsByFilter() {
  const gridContainer = document.querySelector('#projects-grid');
  const emptyContainer = document.querySelector('#projects-empty');
  const errorContainer = document.querySelector('#projects-error');
  
  // Hide error container if open
  errorContainer.classList.add('hidden');
  
  // Filter logic using Array.prototype.filter
  if (state.currentFilter === 'all') {
    state.filteredProjects = [...state.projects];
  } else if (state.currentFilter === 'javascript') {
    state.filteredProjects = state.projects.filter((p) => p.language && p.language.toLowerCase() === 'javascript');
  } else if (state.currentFilter === 'html') {
    state.filteredProjects = state.projects.filter((p) => p.language && (p.language.toLowerCase() === 'html' || p.language.toLowerCase() === 'css'));
  } else {
    state.filteredProjects = state.projects.filter((p) => !p.language || (p.language.toLowerCase() !== 'javascript' && p.language.toLowerCase() !== 'html' && p.language.toLowerCase() !== 'css'));
  }
  
  // Check Empty State
  if (state.filteredProjects.length === 0) {
    gridContainer.classList.add('hidden');
    emptyContainer.classList.remove('hidden');
    return;
  }
  
  emptyContainer.classList.add('hidden');
  gridContainer.classList.remove('hidden');
  
  // Map Array items to HTML Cards
  const cardsHTML = state.filteredProjects.map((repo) => {
    const name = escapeHTML(repo.name);
    const description = repo.description ? escapeHTML(repo.description) : '프로젝트 설명이 등록되지 않았습니다.';
    const language = repo.language ? escapeHTML(repo.language) : 'Code';
    const stars = repo.stargazers_count || 0;
    const repoUrl = repo.html_url;
    const homepageUrl = repo.homepage;
    
    return `
      <article class="project-card">
        <div>
          <div class="card-top">
            <i class="fa-regular fa-folder repo-folder-icon"></i>
            <div class="repo-links">
              ${homepageUrl ? `<a href="${homepageUrl}" target="_blank" rel="noopener noreferrer" class="repo-link" aria-label="라이브 데모" title="Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a> ` : ''}
              <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="repo-link" aria-label="GitHub 레포지토리 이동" title="GitHub"><i class="fa-brands fa-github"></i></a>
            </div>
          </div>
          <h3 class="repo-name">${name}</h3>
          <p class="repo-desc">${description}</p>
        </div>
        
        <div class="card-bottom">
          <span class="repo-lang">
            <span class="lang-color-dot" style="background-color: ${getLanguageColor(language)};"></span>
            ${language}
          </span>
          <span class="repo-stars">
            <i class="fa-regular fa-star"></i> ${stars}
          </span>
        </div>
      </article>
    `;
  }).join('');
  
  gridContainer.innerHTML = cardsHTML;
}

function getLanguageColor(lang) {
  const colors = {
    'JavaScript': '#f1e05a',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'TypeScript': '#3178c6',
    'Python': '#3572A5'
  };
  return colors[lang] || '#3b82f6';
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    (tag) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   7. Contact Form UX & Validation (Formspree Async Support)
   Event: submit, input
   Validation: Required check, Email regex format
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  
  const nameInput = document.querySelector('#contact-name');
  const emailInput = document.querySelector('#contact-email');
  const messageInput = document.querySelector('#contact-message');
  const alertContainer = document.querySelector('#form-alert');
  const submitBtn = form.querySelector('.submit-btn');
  
  // Real-time input validation clear
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        clearFieldError(input);
      });
    }
  });
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default browser submit/redirect
    
    const isNameValid = validateField(nameInput, '이름을 입력해주세요.');
    const isEmailValid = validateEmail(emailInput);
    const isMessageValid = validateField(messageInput, '메시지 내용을 입력해주세요.');
    
    if (isNameValid && isEmailValid && isMessageValid) {
      const actionUrl = form.getAttribute('action');
      
      // If Formspree action URL is set, send async POST request
      if (actionUrl && actionUrl.includes('formspree.io')) {
        try {
          if (submitBtn) submitBtn.disabled = true;
          showAlert(alertContainer, 'info', '메시지를 전송하는 중입니다...');
          
          const formData = new FormData(form);
          const response = await fetch(actionUrl, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            showAlert(alertContainer, 'success', '메시지가 성공적으로 전송되었습니다! 이메일함을 확인해주세요.');
            form.reset();
          } else {
            const data = await response.json();
            throw new Error(data.error || '이메일 전송 중 오류가 발생했습니다.');
          }
        } catch (err) {
          showAlert(alertContainer, 'error', err.message);
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      } else {
        // Default local UI feedback
        showAlert(alertContainer, 'success', '메시지가 성공적으로 전송되었습니다! 확인 후 곧 연락드리겠습니다.');
        form.reset();
      }
      
      setTimeout(() => {
        if (alertContainer) alertContainer.classList.add('hidden');
      }, 6000);
    } else {
      showAlert(alertContainer, 'error', '입력 항목에 오류가 있습니다. 필드를 확인해주세요.');
    }
  });
}

function validateField(inputElement, errorMessage) {
  if (!inputElement) return false;
  const value = inputElement.value.trim();
  const errorSpan = document.querySelector(`#${inputElement.name}-error`);
  
  if (!value) {
    showFieldError(inputElement, errorSpan, errorMessage);
    return false;
  }
  
  clearFieldError(inputElement, errorSpan);
  return true;
}

function validateEmail(emailElement) {
  if (!emailElement) return false;
  const value = emailElement.value.trim();
  const errorSpan = document.querySelector('#email-error');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!value) {
    showFieldError(emailElement, errorSpan, '이메일 주소를 입력해주세요.');
    return false;
  } else if (!emailRegex.test(value)) {
    showFieldError(emailElement, errorSpan, '올바른 이메일 형식이 아닙니다 (예: name@domain.com).');
    return false;
  }
  
  clearFieldError(emailElement, errorSpan);
  return true;
}

function showFieldError(input, errorSpan, message) {
  input.classList.add('invalid');
  if (errorSpan) {
    errorSpan.textContent = message;
  }
}

function clearFieldError(input, errorSpan) {
  input.classList.remove('invalid');
  const span = errorSpan || document.querySelector(`#${input.name}-error`);
  if (span) {
    span.textContent = '';
  }
}

function showAlert(container, type, message) {
  if (!container) return;
  container.className = `form-alert ${type}`;
  container.textContent = message;
  container.classList.remove('hidden');
}
