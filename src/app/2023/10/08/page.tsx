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
          relation["name:en"="Palestinian Territories"];
        );
        out geom;
    `,
    featureStyle: {
      color: 'yellow',
      fillColor: 'yellow',
    },
  },
  {
    overpassQuery: `
        [out:json][timeout:30000];
        area["name:en"="Palestinian Territories"]->.searchArea;
        (
          nwr["landuse"="military"](area.searchArea);
        );
        out geom;
    `,
    featureStyle: {
      color: 'yellow',
      emoji: '🪖'
    }
  },
  {
    overpassQuery: `
        [out:json][timeout:30000];
        area["name:en"="Palestinian Territories"]->.searchArea;
        (
          nwr["amenity"="hospital"](area.searchArea);
        );
        out geom;
    `,
    featureStyle: {
      color: 'yellow',
      emoji: '🏥'
    }
  },
  {
    overpassQuery: `
        [out:json][timeout:30000];
        (
          relation["name:en"="Israel"];
          relation["name:en"="Golan Regional Council"];
        );
        out geom;
    `,
    featureStyle: {
      color: 'pink',
      fillColor: 'pink',
    },
  },
  {
    overpassQuery: `
        [out:json][timeout:30000];
        area["name:en"="Israel"]->.searchArea;
        (
          nwr["landuse"="military"](area.searchArea);
        );
        out geom;
    `,
    featureStyle: {
      color: 'pink',
      emoji: '🪖'
    }
  },
  {
    overpassQuery: `
        [out:json][timeout:30000];
        (
          relation["boundary"="administrative"]["name:en"="Lebanon"];
        );
        out geom;
    `,
    featureStyle: {
      color: 'lightblue',
      fillColor: 'lightblue',
    },
  },
  {
    overpassQuery: `
        [out:json][timeout:30000];
        area["name:en"="Lebanon"]->.searchArea;
        (
          nwr["landuse"="military"](area.searchArea);
        );
        out geom;
    `,
    featureStyle: {
      color: 'lightblue',
      emoji: '🪖'
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
