/**
 * Google Analytics 4 + Google Ads (gtag.js) + Consent Mode v2
 * 1) GA4: Admin → Data streams → Measurement ID (G-…)
 * 2) Ads: Měření konverzí → značka Google (AW-…)
 * 3) Cookie lišta volá acceptMarketingCookies(true|false).
 *
 * Regionální výchozí stav (doporučení Google): denied jen v EHP + UK + CH,
 * granted pro ostatní regiony — jinak diagnostika hlásí 0 % souhlasu i mimo EHP.
 * @see https://developers.google.com/tag-platform/security/guides/consent?hl=cs
 */
(function () {
  var GA4_ID = 'G-76VWCQRE7K';
  var ADS_ID = 'AW-856619583';
  var BOOT_ID = GA4_ID || ADS_ID;
  if (!BOOT_ID) return;

  /** ISO 3166-1 alpha-2: EU27 + EHP (IS, LI, NO) + UK + CH */
  var CONSENT_REQUIRED_REGIONS = [
    'AT', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GB',
    'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MT', 'NL', 'NO',
    'PL', 'PT', 'RO', 'SE', 'SI', 'SK'
  ];

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
    region: CONSENT_REQUIRED_REGIONS
  });

  gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted'
  });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(BOOT_ID);
  s.onload = function () {
    gtag('js', new Date());
    if (GA4_ID) {
      gtag('config', GA4_ID, { anonymize_ip: true });
    }
    if (ADS_ID && ADS_ID !== GA4_ID) {
      gtag('config', ADS_ID);
    }
  };
  document.head.appendChild(s);
})();

/** Zavolej po odsouhlasení marketingových cookies (např. z cookie lišty). */
window.acceptMarketingCookies = function (granted) {
  if (typeof gtag !== 'function') return;
  var v = granted ? 'granted' : 'denied';
  gtag('consent', 'update', {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v
  });
};

/** Odeslání konverze po úspěšném formuláři (Google Ads → konverze → send_to). */
window.ADS_CONVERSION_SEND_TO = 'AW-856619583/E8KDCIG1lqEcEL_0u5gD';
/** Konverze pro klik na telefon / WhatsApp (Google Ads → konverze → send_to). */
window.ADS_CONTACT_CLICK_SEND_TO = 'AW-856619583/bGtZCISliqEcEL_0u5gD';
