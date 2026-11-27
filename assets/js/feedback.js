(function () {
  'use strict';

  // ---- Settings ----
  // Reports open a prefilled GitHub issue in this repository.
  var REPO = 'ccplus2561/ccplus2561.github.io';
  // Optional: paste a Formspree (or similar) endpoint to send reports straight
  // from the page without GitHub, e.g. 'https://formspree.io/f/xxxxxxx'.
  var FEEDBACK_ENDPOINT = '';

  var form = document.getElementById('fb-form');
  if (!form) return;

  var titleInput = document.getElementById('fb-title');
  var bodyInput = document.getElementById('fb-body');
  var targetSelect = document.getElementById('fb-target');
  var envInput = document.getElementById('fb-env');
  var contactInput = document.getElementById('fb-contact');
  var statusEl = document.getElementById('fb-status');
  var noteEl = document.getElementById('fb-note');
  var submitText = document.getElementById('fb-submit-text');
  var copyButton = document.getElementById('fb-copy');

  if (FEEDBACK_ENDPOINT && noteEl) {
    noteEl.textContent = '送出後會直接傳給站長，不需要註冊帳號。請勿填寫密碼或個人隱私。';
  }

  function detectEnv() {
    var ua = navigator.userAgent || '';
    var os = /Windows/i.test(ua) ? 'Windows' : /Android/i.test(ua) ? 'Android' : /iPhone|iPad|iPod/i.test(ua) ? 'iOS' : /Mac OS X/i.test(ua) ? 'macOS' : /Linux/i.test(ua) ? 'Linux' : '未知系統';
    var browser = /Edg\//.test(ua) ? 'Edge' : /OPR\/|Opera/.test(ua) ? 'Opera' : /Chrome\//.test(ua) ? 'Chrome' : /Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : '未知瀏覽器';
    return os + ' / ' + browser + ' / ' + window.innerWidth + '×' + window.innerHeight;
  }
  envInput.value = detectEnv();

  function currentType() {
    var checked = form.querySelector('input[name="type"]:checked');
    return checked ? checked.value : '意見建議';
  }

  function setStatus(message, kind) {
    statusEl.textContent = message || '';
    statusEl.className = 'fb-status' + (kind ? ' is-' + kind : '');
  }

  function validate() {
    var ok = true;
    [titleInput, bodyInput].forEach(function (field) {
      var empty = !field.value.trim();
      field.classList.toggle('is-invalid', empty);
      if (empty) ok = false;
    });
    if (!ok) setStatus('請填寫標題與詳細內容。', 'error');
    return ok;
  }

  [titleInput, bodyInput].forEach(function (field) {
    field.addEventListener('input', function () { field.classList.remove('is-invalid'); setStatus(''); });
  });

  function buildTitle() { return '[' + currentType() + '] ' + titleInput.value.trim(); }

  function buildBody() {
    var lines = [
      '**類型**：' + currentType(),
      '**相關項目**：' + targetSelect.value,
      '**裝置 / 瀏覽器**：' + (envInput.value.trim() || '未提供'),
      '**來源頁面**：' + location.origin + '/feedback/',
      '**聯絡方式**：' + (contactInput.value.trim() || '未提供'),
      '',
      '### 詳細內容',
      bodyInput.value.trim()
    ];
    return lines.join('\n');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validate()) return;

    if (FEEDBACK_ENDPOINT) {
      submitText.textContent = '送出中…';
      fetch(FEEDBACK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ subject: buildTitle(), message: buildBody(), type: currentType(), target: targetSelect.value })
      }).then(function (response) {
        if (!response.ok) throw new Error('bad status');
        form.reset();
        envInput.value = detectEnv();
        setStatus('已送出，謝謝你的回報！', 'ok');
      }).catch(function () {
        setStatus('送出失敗，請稍後再試，或按「複製內容」改用其他方式回報。', 'error');
      }).then(function () { submitText.textContent = '送出回報'; });
      return;
    }

    var url = 'https://github.com/' + REPO + '/issues/new?title=' + encodeURIComponent(buildTitle()) + '&body=' + encodeURIComponent(buildBody());
    var opened = window.open(url, '_blank', 'noopener');
    if (opened) {
      setStatus('已開啟 GitHub 頁面，確認後按「Submit new issue」就完成了。', 'ok');
    } else {
      setStatus('瀏覽器擋住了新視窗，請允許彈出視窗，或按「複製內容」。', 'error');
    }
  });

  copyButton.addEventListener('click', function () {
    if (!validate()) return;
    var text = buildTitle() + '\n\n' + buildBody();
    function done(ok) { setStatus(ok ? '已複製，可以貼到任何地方回報。' : '複製失敗，請手動選取輸入框內容。', ok ? 'ok' : 'error'); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    } else {
      done(false);
    }
  });
})();
