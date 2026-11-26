(function () {
  'use strict';

  var root = document.documentElement;
  var menuButton = document.querySelector('.menu-toggle');
  var navigation = document.querySelector('#site-nav');
  var themeButton = document.querySelector('.theme-toggle');
  var searchInput = document.querySelector('#project-search');
  var projectCards = Array.prototype.slice.call(document.querySelectorAll('.project-card'));
  var searchEmpty = document.querySelector('#search-empty');
  var yearLabel = document.querySelector('#current-year');

  // Theme preference: use the saved choice, otherwise follow the device setting.
  try {
    var savedTheme = localStorage.getItem('ccplus-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      root.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.setAttribute('data-theme', 'dark');
    }
  } catch (error) {
    // The page remains usable when storage is unavailable.
  }

  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', nextTheme);
      themeButton.setAttribute('aria-label', nextTheme === 'dark' ? '切換淺色模式' : '切換深色模式');
      themeButton.setAttribute('title', nextTheme === 'dark' ? '切換淺色模式' : '切換深色模式');
      try { localStorage.setItem('ccplus-theme', nextTheme); } catch (error) { /* Ignore storage errors. */ }
    });
  }

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? '開啟導覽選單' : '關閉導覽選單');
      navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', '開啟導覽選單');
        navigation.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', '開啟導覽選單');
        navigation.classList.remove('is-open');
      }
    });
  }

  if (searchInput && projectCards.length) {
    searchInput.addEventListener('input', function () {
      var query = searchInput.value.trim().toLocaleLowerCase();
      var visibleCount = 0;
      projectCards.forEach(function (card) {
        var keywords = (card.getAttribute('data-search') || card.textContent).toLocaleLowerCase();
        var matches = !query || keywords.indexOf(query) !== -1;
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      if (searchEmpty) searchEmpty.hidden = visibleCount !== 0;
    });
  }

  if (yearLabel) yearLabel.textContent = String(new Date().getFullYear());
})();
