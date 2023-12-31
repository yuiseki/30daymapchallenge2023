'use client';

import { Map, NavigationControl } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
//@ts-ignore
import * as MaplibreglCompare from '@maplibre/maplibre-gl-compare';
import '@maplibre/maplibre-gl-compare/dist/maplibre-gl-compare.css';

import './styles.css';

export const MyMapComponent = () => {
  const mapStyle = {
    Digital:
      'https://trident.yuiseki.net/map_styles/fiord-color-gl-style/style.json',
    Analog: '/mapStyles/mapwarper/13tokyo/style.json',
    Bright: 'https://tile.openstreetmap.jp/styles/osm-bright/style.json',
    Dark: 'https://trident.yuiseki.net/map_styles/fiord-color-gl-style/style.json',
  };

  const mapContainer = useRef<HTMLDivElement>(null);
  const mapContainerA = useRef<HTMLDivElement>(null);
  const mapContainerB = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (
      !mapContainer.current ||
      !mapContainerA.current ||
      !mapContainerB.current ||
      !window
    )
      return;
    if (initialized) return;
    setInitialized(true);
    const aMap = new Map({
      container: mapContainerA.current,
      style: mapStyle.Bright,
      center: [139.75397279, 35.68385063],
      zoom: 12,
    });

    const bMap = new Map({
      container: mapContainerB.current,
      style: mapStyle.Analog,
      center: [139.75397279, 35.68385063],
      zoom: 12,
    });
    aMap.addControl(new NavigationControl(), 'top-right');

    const compare = new MaplibreglCompare.default(
      aMap,
      bMap,
      mapContainer.current,
      {}
    );
  }, [initialized]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        userSelect: 'none',
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
        The Tokyo
      </h1>
      <div ref={mapContainer} style={{ position: 'absolute', inset: 0 }}>
        <div
          ref={mapContainerA}
          style={{ position: 'absolute', inset: 0 }}
        ></div>
        <div
          ref={mapContainerB}
          style={{ position: 'absolute', inset: 0 }}
        ></div>
      </div>
    </div>
  );
}
