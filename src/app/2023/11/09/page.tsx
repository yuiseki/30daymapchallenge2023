'use client';
import { latLngToCell, cellToLatLng, cellToBoundary } from 'h3-js';

import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';
import { Layer, Source } from 'react-map-gl/maplibre';
import { FeatureCollection } from 'geojson';
import { GeoJsonToSomethings } from '@/components/GeoJsonToSomethings';

const cell = '876520d95ffffff';
const boundary = cellToBoundary(cell, true);
const hexGeoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'hex', id: 'hex' },
      id: 'hex',
      geometry: {
        type: 'Polygon',
        coordinates: [boundary],
      },
    },
  ],
} as FeatureCollection;

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
        mapStyle='/mapStyles/disaster.ninja/population_density/style.json'
        enableInteractions={true}
        overpassQueryWithFeatureStyleList={overpassQueryWithFeatureStyleList}
      >
        <Source
          key={`koppen-gueiger-source`}
          id={`koppen-gueiger-source`}
          type='raster'
          tiles={[
            'https://tiles.arcgis.com/tiles/bFQCiZqoe0LrqfWM/arcgis/rest/services/mapa_climas_koppen_Gueiger_actualizado_HESS_2007/MapServer/tile/{z}/{y}/{x}',
          ]}
          tileSize={256}
          attribution={
            '<a href="https://www.arcgis.com/home/item.html?id=9613417dd1fb4ab19bf6315b9154615b" target="_blank">Source: Peel MC, Finlayson BL & McMahon TA (2007), Updated world map of the Köppen-Geiger climate classification, Hydrol. Earth Syst. Sci., 11, 1633-1644. Traducción al español y adaptacion educativa: Javier Velilla Gil</a>'
          }
          maxzoom={8}
        >
          <Layer
            id={`koppen-gueiger-layer`}
            type='raster'
            paint={{
              'raster-opacity': 0.5,
            }}
          />
        </Source>
      </StaticOverpassQueryMap>
    </div>
  );
}
