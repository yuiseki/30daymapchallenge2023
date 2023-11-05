'use client';

import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';

export default function Page() {
  const overpassQuery = `
[out:json][timeout:30000];
relation["name:en"="Gaza Strip"];
out geom;
`;
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
        mapStyle='/mapStyles/arcgis/koppen-gueiger/style.json'
        enableInteractions={true}
        overpassQueryWithFeatureStyleList={[
          {
            overpassQuery: overpassQuery,
            featureStyle: { fillColor: 'transparent' },
          },
        ]}
      />
    </div>
  );
}
