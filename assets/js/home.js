(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  if (!body || !body.classList.contains('home-page')) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Floating dots in the background
  var dots = document.querySelector('.home-dots');
  if (dots && !reduce) {
    var colors = ['rgba(70,140,255,.55)', 'rgba(95,217,230,.55)', 'rgba(170,140,255,.5)'];
    var count = window.innerWidth < 700 ? 12 : 26;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i += 1) {
      var dot = document.createElement('i');
      var size = 3 + Math.random() * 5;
      dot.style.cssText = 'left:' + (Math.random() * 100).toFixed(1) + '%;' +
        '--s:' + size.toFixed(1) + 'px;' +
        '--c:' + colors[i % colors.length] + ';' +
        '--d:' + (14 + Math.random() * 16).toFixed(1) + 's;' +
        '--dl:-' + (Math.random() * 28).toFixed(1) + 's;' +
        '--x:' + ((Math.random() - .5) * 120).toFixed(0) + 'px';
      frag.appendChild(dot);
    }
    dots.appendChild(frag);
  }

  if (!finePointer || reduce) return;

  // Mouse light: page spotlight + hot grid
  var cards = Array.prototype.slice.call(document.querySelectorAll('.entrance-card, .project-card'));
  var pending = false;
  var px = 0, py = 0;

  function paint() {
    pending = false;
    root.style.setProperty('--mx', px + 'px');
    root.style.setProperty('--my', py + 'px');
    body.style.setProperty('--mx', px + 'px');
    body.style.setProperty('--my', py + 'px');
  }

  document.addEventListener('pointermove', function (event) {
    px = event.clientX;
    py = event.clientY;
    body.style.setProperty('--spot', '1');
    if (!pending) { pending = true; requestAnimationFrame(paint); }
  }, { passive: true });

  document.documentElement.addEventListener('pointerleave', function () {
    body.style.setProperty('--spot', '0');
  });

  // Card light + gentle 3D tilt
  cards.forEach(function (card) {
    card.addEventListener('pointermove', function (event) {
      var rect = card.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      card.style.setProperty('--cx', x + 'px');
      card.style.setProperty('--cy', y + 'px');
      if (card.tagName !== 'A') return;
      card.style.setProperty('--rx', ((((y / rect.height) - .5) * -9)).toFixed(2) + 'deg');
      card.style.setProperty('--ry', ((((x / rect.width) - .5) * 11)).toFixed(2) + 'deg');
    });
    card.addEventListener('pointerleave', function () {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
})();
