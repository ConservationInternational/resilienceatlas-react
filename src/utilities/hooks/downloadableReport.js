import { useCallback, useState } from 'react';

export const useDownloadableReport = () => {
  const [href, setHref] = useState('');

  const onClick = useCallback(() => {
    const { search } = window.location;
    const reportUrl = `${process.env.REACT_APP_API_HOST}/report${search}`;
    const webshotUrl = 'http://resilienceatlas.org/webshot';

    setHref(
      `${webshotUrl}?filename=analysis-report&mediatype=screen&backgrounds=true&waitFor=70000&url=${encodeURIComponent(
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
