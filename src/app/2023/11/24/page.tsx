'use client';

import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';

const overpassQueryWithFeatureStyleList = [
  {
    overpassQuery: `
[out:json][timeout:30000];
relation["name:en"="Gaza Strip"];
out geom;
`,
    featureStyle: {
      emoji: '🇵🇸',
      fillColor: 'transparent',
    },
  },
];

export default function Page() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <h1
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 100,
          padding: '8px',
          background: 'rgba(255, 255, 255, 0.4)',
        }}
      >
        The Gaza Strip
      </h1>
      <StaticOverpassQueryMap
        mapStyle='https://tile.openstreetmap.jp/styles/maptiler-toner-en/style.json'
        overpassQueryWithFeatureStyleList={overpassQueryWithFeatureStyleList}
      />
    </div>
  );
}
