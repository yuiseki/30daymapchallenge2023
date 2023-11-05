import React, { MutableRefObject, useCallback } from 'react';
import {
  AttributionControl,
  ControlPosition,
  GeolocateControl,
  Map,
  MapRef,
  NavigationControl,
  ViewStateChangeEvent,
  Source,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export const BaseMap: React.FC<{
  id?: string;
  mapRef: MutableRefObject<MapRef | null>;
  longitude: number;
  latitude: number;
  zoom: number;
  children?: any;
  mapStyle?: string;
  enableInteractions?: boolean;
  attributionPosition?: string;
}> = ({
  id,
  mapRef,
  longitude,
  latitude,
  zoom,
  children,
  mapStyle = 'https://tile.openstreetmap.jp/styles/osm-bright-en/style.json',
  enableInteractions = true,
  attributionPosition = 'top-right',
}) => {
  return (
    <Map
      id={id}
      ref={mapRef}
      mapStyle={mapStyle}
      attributionControl={false}
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: zoom,
      }}
      hash={false}
      maxZoom={22}
      maxPitch={85}
      scrollZoom={enableInteractions ? true : false}
      dragPan={enableInteractions ? true : false}
      dragRotate={enableInteractions ? true : false}
    >
      {children}
      {enableInteractions && (
        <>
          <GeolocateControl position='top-right' />
          <NavigationControl
            position='top-right'
            visualizePitch={true}
            showZoom={true}
            showCompass={true}
          />
        </>
      )}
      <AttributionControl
        position={
          attributionPosition
            ? (attributionPosition as ControlPosition)
            : 'bottom-right'
        }
      />
    </Map>
  );
};
