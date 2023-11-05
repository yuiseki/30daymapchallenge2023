'use client';

import DeckGL from '@deck.gl/react/typed';
import { Tile3DLayer } from '@deck.gl/geo-layers/typed';
import { Tiles3DLoader } from '@loaders.gl/3d-tiles';
import {
  GeolocateControl,
  Map,
  MapRef,
  NavigationControl,
  useControl,
} from 'react-map-gl/maplibre';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';
import { BaseMap } from '@/components/BaseMap';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapView } from '@deck.gl/core/typed';
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';

const DeckGLOverlay = (props: MapboxOverlayProps) => {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
};

const overpassQueryWithFeatureStyleList = [
  {
    overpassQuery: `
[out:json][timeout:30000];
relation["name"="長崎県"];
out geom;
`,
    featureStyle: {
      fillColor: 'transparent',
    },
  },
];

const INITIAL_VIEW_STATE = {
  longitude: 129.339,
  latitude: 33.0124,
  zoom: 9,
  pitch: 60,
  bearing: 0,
};
const layer = new Tile3DLayer({
  id: 'tile-3d-layer',
  type: typeof Tile3DLayer,
  pointSize: 1.6,
  data: 'https://smb.optgeo.org/ipfs/QmdAr2FWQKCVv7CAcLRuTBt1583Qi7DA4gaA92g3ujeL1v/tileset.json',
  loaders: [Tiles3DLoader],
});
const layers = [layer];

export const MyDeckGLComponent = () => {
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
        The Nagasaki Point Cloud
      </h1>
      <Map
        mapStyle={
          'https://tile.openstreetmap.jp/styles/osm-bright-en/style.json'
        }
        attributionControl={true}
        maxZoom={22}
        maxPitch={85}
        scrollZoom={true}
        dragPan={true}
        dragRotate={true}
        initialViewState={INITIAL_VIEW_STATE}
      >
        <DeckGLOverlay layers={layers} />
        <GeolocateControl position='top-right' />
        <NavigationControl
          position='top-right'
          visualizePitch={true}
          showZoom={true}
          showCompass={true}
        />
      </Map>
    </div>
  );
};
