/**
 * Cookie lišta — ukládá volbu do localStorage, volá acceptMarketingCookies (Consent Mode v2).
 */
(function () {
  var STORAGE_KEY = '3dsp_cookie_consent';
  var VALUE_MARKETING = 'marketing';
  var VALUE_ESSENTIAL = 'essential';

  function injectStyles() {
    if (document.getElementById('cookie-bar-styles')) return;
    var css =
      '#cookie-consent-bar{position:fixed;left:0;right:0;bottom:0;z-index:280;' +
      'padding:0 max(12px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left));' +
      'transform:translateY(110%);transition:transform .38s cubic-bezier(.22,1,.36,1);' +
      'pointer-events:none}' +
      '#cookie-consent-bar.cookie-bar--visible{transform:translateY(0);pointer-events:auto}' +
      '.cookie-bar__panel{margin:0 auto;max-width:920px;width:100%;' +
      'background:rgba(12,15,20,.96);backdrop-filter:blur(18px);' +
      'border:1px solid var(--border2,#243040);border-radius:8px;' +
      'box-shadow:0 -8px 40px rgba(0,0,0,.45)}' +
      '.cookie-bar__inner{padding:1.15rem 1.25rem 1.2rem;display:grid;gap:1rem;' +
      'grid-template-columns:1fr auto;align-items:center}' +
      '@media(max-width:640px){.cookie-bar__inner{grid-template-columns:1fr}}' +
      '.cookie-bar__text{font-size:.86rem;line-height:1.55;color:var(--muted,#5a6e82);margin:0}' +
      '.cookie-bar__text strong{color:var(--text,#dde4ed);font-weight:600}' +
      '.cookie-bar__actions{display:flex;flex-wrap:wrap;gap:.55rem;justify-content:flex-end}' +
      '.cookie-bar__btn{font-family:Rajdhani,sans-serif;font-size:.82rem;font-weight:700;' +
      'letter-spacing:.06em;text-transform:uppercase;padding:.55rem 1.1rem;border-radius:3px;' +
      'cursor:pointer;border:none;transition:background .2s,border-color .2s,color .2s}' +
      '.cookie-bar__btn--primary{background:var(--orange,#ff5216);color:#fff}' +
      '.cookie-bar__btn--primary:hover{background:var(--orange2,#ff7a42)}' +
      '.cookie-bar__btn--ghost{background:transparent;color:var(--text,#dde4ed);' +
      'border:1px solid var(--border2,#243040)}' +
      '.cookie-bar__btn--ghost:hover{border-color:var(--orange,#ff5216);color:var(--orange,#ff5216)}' +
      '.cookie-bar__link{font-size:.78rem;color:var(--orange2,#ff7a42);text-decoration:none}' +
      '.cookie-bar__link:hover{text-decoration:underline}';
    var s = document.createElement('style');
    s.id = 'cookie-bar-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function setConsent(marketing) {
    if (typeof window.acceptMarketingCookies === 'function') {
      window.acceptMarketingCookies(!!marketing);
    }
    try {
      localStorage.setItem(STORAGE_KEY, marketing ? VALUE_MARKETING : VALUE_ESSENTIAL);
    } catch (e) {}
  }

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function applyStored(value) {
    if (value === VALUE_MARKETING) setConsent(true);
    else if (value === VALUE_ESSENTIAL) setConsent(false);
  }

  var barEl;

  function hideBar() {
    if (!barEl) return;
    barEl.classList.remove('cookie-bar--visible');
    barEl.setAttribute('aria-hidden', 'true');
  }

  function showBar() {
    if (!barEl) return;
    barEl.classList.add('cookie-bar--visible');
    barEl.setAttribute('aria-hidden', 'false');
  }

  function buildBar() {
    injectStyles();
    barEl = document.createElement('div');
    barEl.id = 'cookie-consent-bar';
    barEl.setAttribute('role', 'dialog');
    barEl.setAttribute('aria-labelledby', 'cookie-bar-title');
    barEl.setAttribute('aria-hidden', 'true');
    barEl.innerHTML =
      '<div class="cookie-bar__panel">' +
      '<div class="cookie-bar__inner">' +
      '<p id="cookie-bar-title" class="cookie-bar__text">' +
      'Používáme cookies pro měření návštěvnosti (Google Analytics) a reklamu (Google Ads). ' +
      '<strong>Nezbytné</strong> fungování webu nevyžaduje váš souhlas. Podrobnosti v ' +
      '<a class="cookie-bar__link" href="gdpr.html#cookies">zásadách ochrany osobních údajů</a>.' +
      '</p>' +
      '<div class="cookie-bar__actions">' +
      '<button type="button" class="cookie-bar__btn cookie-bar__btn--ghost" data-cookie-reject>Odmítnout</button>' +
      '<button type="button" class="cookie-bar__btn cookie-bar__btn--primary" data-cookie-accept>Přijmout</button>' +
      '</div>' +
      '</div></div>';

    barEl.querySelector('[data-cookie-accept]').addEventListener('click', function () {
      setConsent(true);
      hideBar();
    });
    barEl.querySelector('[data-cookie-reject]').addEventListener('click', function () {
      setConsent(false);
      hideBar();
    });

    document.body.appendChild(barEl);
  }

  function openSettings(e) {
    if (e) e.preventDefault();
    showBar();
  }

  window.openCookieSettings = openSettings;

  document.addEventListener('DOMContentLoaded', function () {
    var stored = getStored();
    applyStored(stored);
    buildBar();
    if (!stored) showBar();
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.addEventListener('click', openSettings);
    });
  });
})();
