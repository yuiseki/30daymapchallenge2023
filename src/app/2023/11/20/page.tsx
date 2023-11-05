'use client';

import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';
import { Layer, Source } from 'react-map-gl/maplibre';

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
        mapStyle='/mapStyles/arcgis/world-imagery/style.json'
        enableInteractions={true}
        overpassQueryWithFeatureStyleList={overpassQueryWithFeatureStyleList}
      >
        <Source
          key={`gsi-earthdegital-source`}
          id={`gsi-earthdegital-source`}
          type='raster'
          tiles={['https://maps.gsi.go.jp/xyz/earthdegital/{z}/{x}/{y}.png']}
          tileSize={256}
          attribution={
            '<a href="https://maps.gsi.go.jp/#4/-9.968851/-21.708984/&base=std&ls=std%7Crelief_free%7Cearthhillshade%2C0.7&blend=11&disp=111&lcd=relief_free&vs=c1j0h0k0l0u0t0z0r0s0f1&d=vl&reliefdata=20G003FADG64G409A57GC8G7FF500G1F4GFAE100G3E8GF59936G7D0GE64D0CGFA0G9C2F00GG611E02" target="_blank">Source: 国土地理院 デジタル標高地形図（全球版）</a>'
          }
          maxzoom={8}
        >
          <Layer
            id={`gsi-earthdegital-layer`}
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
