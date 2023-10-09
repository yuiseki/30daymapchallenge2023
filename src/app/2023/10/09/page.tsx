'use client';

import * as React from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';
import { Layer, Source } from 'react-map-gl/maplibre';
import { useEffect, useMemo, useState } from 'react';

const overpassQueryWithFeatureStyleList = [
  {
    overpassQuery: `
        [out:json][timeout:30000];
        (
          relation["name:en"="Afghanistan"];
        );
        out geom;
    `,
    featureStyle: {
      color: 'gray',
      fillColor: 'gray',
    },
  },
  {
    overpassQuery: `
        [out:json][timeout:30000];
        (
          relation["boundary"="administrative"]["name:en"="Herat Province"];
        );
        out geom;
    `,
    featureStyle: {
      color: 'red',
      fillColor: 'red',
    },
  },
  {
    overpassQuery: `
        [out:json][timeout:30000];
        area["name:en"="Herat Province"]->.searchArea;
        (
          nwr["amenity"="hospital"](area.searchArea);
        );
        out geom;
    `,
    featureStyle: {
      color: 'red',
      emoji: '🏥'
    }
  },
];

export default function Page() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <StaticOverpassQueryMap
        overpassQueryWithFeatureStyleList={overpassQueryWithFeatureStyleList}
      ></StaticOverpassQueryMap>
    </div>
  );
}
