import { useCallback, useState } from 'react';

export const useDownloadableReport = () => {
  const [href, setHref] = useState('');

  const onClick = useCallback(() => {
    const { search, origin } = window.location;
    const reportUrl = `${origin}/report${search}`;
    const webshotUrl = 'http://resilienceatlas.org/webshot';

    setHref(
      `${webshotUrl}?filename=analysis-report&mediatype=screen&backgrounds=true&url=${encodeURIComponent(
        reportUrl,
      )}`,
    );
  }, []);

  return {
    download: 'true',
    href,
    onClick,
  };
};
