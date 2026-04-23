/**
 * Google Analytics 4 + Google Ads (gtag.js)
 * 1) Vložte ID níže (Google Analytics → Admin → Data streams → Measurement ID = G-…)
 * 2) Google Ads → Nástroje → Měření konverzí → značka Google = AW-…
 * 3) Po nasazení lišty se souhlasem volejte acceptMarketingCookies(true) při souhlasu.
 */
(function () {
  var GA4_ID = 'G-76VWCQRE7K';
  var ADS_ID = 'AW-856619583';
  var BOOT_ID = GA4_ID || ADS_ID;
  if (!BOOT_ID) return;

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
    wait_for_update: 500
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
