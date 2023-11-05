'use client';

import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';

const overpassQueryWithFeatureStyleList = [
  {
    overpassQuery: `
[out:json][timeout:30000];
area["name:en"="Gaza Strip"]->.searchArea;
(
  nwr["amenity"="hospital"](area.searchArea);
);
out geom;
    `,
    featureStyle: {
      emoji: '🏥',
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
        Hospitals in the Gaza Strip
      </h1>
      <StaticOverpassQueryMap
        mapStyle='https://trident.yuiseki.net/map_styles/fiord-color-gl-style/style.json'
        overpassQueryWithFeatureStyleList={overpassQueryWithFeatureStyleList}
      />
    </div>
  );
}
