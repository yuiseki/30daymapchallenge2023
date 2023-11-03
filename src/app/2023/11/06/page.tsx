'use client';

import { unM49 } from 'un-m49';
import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';

export default function Page() {
  const countriesInAsia = unM49
      .filter((v) => v.name.includes('Asia') && v.type === 2)
      .map((v) => {
        return unM49.filter((vv) => {
          return vv.parent === v.code;
        });
      })
      .flat();

  const overpassQueryWithFeatureStyleList = [
    {
      overpassQuery: `
[out:json][timeout:30000];
(
${countriesInAsia.map((v) => {
  return `relation["boundary"="administrative"]["admin_level"=2]["ISO3166-1:alpha3"="${v.iso3166}"];`;
}).join('\n')}
);
out geom;
`
  }];

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
        Countries in Asia
      </h1>
      <StaticOverpassQueryMap
        mapStyle='https://trident.yuiseki.net/map_styles/fiord-color-gl-style/style.json'
        overpassQueryWithFeatureStyleList={overpassQueryWithFeatureStyleList}
      />
    </div>
  );
}
