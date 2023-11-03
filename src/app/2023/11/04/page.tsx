'use client';

import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';

export default function Page() {
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
    {
      overpassQuery: `
[out:json][timeout:30000];
area["name:en"="Gaza Strip"]->.searchArea;
(
  nwr["amenity"="school"](area.searchArea);
);
out geom;
`,
      featureStyle: {
        emoji: '🏫',
      },
    },
    {
      overpassQuery: `
[out:json][timeout:30000];
area["name:en"="Gaza Strip"]->.searchArea;
(
  nwr["highway"="motorway"](area.searchArea);
  nwr["highway"="trunk"](area.searchArea);
  nwr["highway"="primary"](area.searchArea);
  nwr["highway"="secondary"](area.searchArea);
  nwr["highway"="	tertiary"](area.searchArea);
);
out geom;
`,
      featureStyle: {
        color: 'orange',
      },
    },
    {
      overpassQuery: `
[out:json][timeout:30000];
relation["name:en"="Gaza Strip"];
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
