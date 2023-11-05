'use client';

// @ts-ignore
import * as turf from '@turf/turf';
import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MapRef,
  LngLatLike,
  GeolocateControl,
  GeolocateResultEvent,
} from 'react-map-gl/maplibre';

type Coordinates = number[];

function getBearingToPoint(
  position1: Coordinates,
  position2: Coordinates
): number {
  let bearing;
  bearing = turf.rhumbBearing(position1, position2);
  return bearing;
}

const overpassQueryWithFeatureStyleList = [
  {
    overpassQuery: `
[out:json][timeout:30000];
relation["name:en"="Gaza Strip"];
out geom;
      `,
    featureStyle: {
      emoji: '🇵🇸',
    },
  },
];

const positionOfGazaStrip = [34.395, 31.416667];
const positionOfTokyo = [139.6917, 35.6895];

export default function Page() {
  const geoControlRef = useRef<maplibregl.GeolocateControl | null>(null);
  const [mapRef, setMapRef] = useState<MapRef | null>(null);
  const [location, setLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    // Activate as soon as the control is loaded
    setTimeout(() => {
      geoControlRef.current?.trigger();
    }, 2000);
  }, []);

  const onLoadEverything = useCallback((newMapRef: MapRef) => {
    setMapRef(newMapRef);
  }, []);

  const onGeolocate = useCallback((e: GeolocateResultEvent) => {
    setLocation([e.coords.longitude, e.coords.latitude]);
  }, []);

  useEffect(() => {
    if (!mapRef) return;
    if (!location) return;
    const bearing = getBearingToPoint(location, positionOfGazaStrip);
    mapRef.flyTo({
      center: positionOfTokyo as LngLatLike,
      zoom: 5,
      pitch: 75,
      bearing: bearing,
    });
  });

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
        Direction of the Gaza Strip
      </h1>
      <StaticOverpassQueryMap
        enableInteractions={true}
        overpassQueryWithFeatureStyleList={overpassQueryWithFeatureStyleList}
        onLoadEverything={onLoadEverything}
      >
        <GeolocateControl ref={geoControlRef} onGeolocate={onGeolocate} />
      </StaticOverpassQueryMap>
    </div>
  );
}
