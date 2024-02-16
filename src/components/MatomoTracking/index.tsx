import Script from 'next/script';
import React, { FC } from 'react';

const MatomoTracking: FC = () => {
  const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
  const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

  return (
    <>
      <Script type='text/javascript' id='matomo' strategy='beforeInteractive'>
        {`
        var _paq = window._paq = window._paq || [];
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="${MATOMO_URL}";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '${MATOMO_SITE_ID}']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
        `}
      </Script>
    </>
  );
};

export default MatomoTracking;
