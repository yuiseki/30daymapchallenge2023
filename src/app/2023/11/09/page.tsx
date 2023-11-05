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
          key={`arcgis-imagery-source`}
          id={`arcgis-imagery-source`}
          type='raster'
          tiles={[
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          ]}
          tileSize={256}
          attribution={
            "<a href=\"https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/\" target=\"_blank\">Source: Esri, Maxar, Earthstar Geographics</a>"
          }
          maxzoom={18}
        >
          <Layer
            id={`arcgis-imagery-layer`}
            type='raster'
            paint={{
              'raster-opacity': 0.6,
            }}
          />
        </Source>
      </StaticOverpassQueryMap>
    </div>
  );
}
