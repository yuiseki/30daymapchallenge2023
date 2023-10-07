import { useEffect, useState } from 'react';

export const useJMARiskRasterTileUrl = (element: 'land' | 'inund') => {
  const endpoint =
    'https://www.jma.go.jp/bosai/jmatile/data/risk/targetTimes.json';
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    const thisEffect = async () => {
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data) {
        const baseTime = data[0].basetime;
        const validTime = data[0].validtime;
        const newUrl = `https://www.jma.go.jp/bosai/jmatile/data/risk/${baseTime}/none/${validTime}/surf/${element}/{z}/{x}/{y}.png`;
        setUrl(newUrl);
      }
    };
    thisEffect();
  }, [element]);
  return url;
};

export const useJMAHimawariRasterTileUrl = () => {
  const endpoint =
    'https://www.jma.go.jp/bosai/himawari/data/satimg/targetTimes_fd.json';
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    const thisEffect = async () => {
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data) {
        const baseTime = data[0].basetime;
        const validTime = data[0].validtime;
        const newUrl = `https://www.jma.go.jp/bosai/himawari/data/satimg/${baseTime}/fd/${validTime}/B13/TBB/{z}/{x}/{y}.png`;
        setUrl(newUrl);
      }
    };
    thisEffect();
  }, []);
  return url;
};

export const useJMANowcastTileUrl = () => {
  const endpoint =
    'https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N1.json';
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    const thisEffect = async () => {
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data) {
        const baseTime = data[0].basetime;
        const validTime = data[0].validtime;
        const newUrl = `https://www.jma.go.jp/bosai/jmatile/data/nowc/${baseTime}/none/${validTime}/surf/hrpns/{z}/{x}/{y}.png`;
        setUrl(newUrl);
      }
    };
    thisEffect();
  }, []);
  return url;
};
