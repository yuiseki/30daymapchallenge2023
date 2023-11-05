'use client';

import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';

export default function Page() {
  const overpassQueryWithFeatureStyleList = [
    {
      overpassQuery: `
[out:json][timeout:30000];
area["name:en"="Gaza Strip"]->.searchArea;
(
  nwr["name:en"="North Gaza Governorate"](area.searchArea);
);
out geom;
`,
    },
    {
      overpassQuery: `
[out:json][timeout:30000];
area["name:en"="Gaza Strip"]->.searchArea;
(
  nwr["name:en"="Gaza Governorate"](area.searchArea);
);
out geom;
`,
    },
    {
      overpassQuery: `
[out:json][timeout:30000];
area["name:en"="Gaza Strip"]->.searchArea;
(
  nwr["name:en"="Deir al-Balah Governorate"](area.searchArea);
);
out geom;
`,
    },
    {
      overpassQuery: `
[out:json][timeout:30000];
area["name:en"="Gaza Strip"]->.searchArea;
(
  nwr["name:en"="Khan Yunis Governorate"](area.searchArea);
);
out geom;
`,
    },
    {
      overpassQuery: `
[out:json][timeout:30000];
area["name:en"="Gaza Strip"]->.searchArea;
(
  nwr["name:en"="Rafah Governorate"](area.searchArea);
);
out geom;
`,
    },
  ];
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
        mapStyle='https://trident.yuiseki.net/map_styles/fiord-color-gl-style/style.json'
        overpassQueryWithFeatureStyleList={overpassQueryWithFeatureStyleList}
      />
    </div>
  );
}
