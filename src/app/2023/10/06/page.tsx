'use client';

import * as React from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';

export default function Page() {
  const overpassQuery = `
[out:json][timeout:30000];
area["name"="City of New York"]->.searchArea;
(
  nwr["name"~"United Nations"]["building"="yes"](area.searchArea);
  nwr["name"~"United Nations"]["building:part"="yes"](area.searchArea);
);
out geom;
`;
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <StaticOverpassQueryMap
        overpassQueryWithFeatureStyleList={[{ overpassQuery: overpassQuery }]}
      />
    </div>
  );
}
