'use client';

import 'maplibre-gl/dist/maplibre-gl.css';
import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';
import { useCallback, useEffect, useState } from 'react';
import { Marker, MarkerDragEvent } from 'react-map-gl/maplibre';
import { FeatureCollection } from 'geojson';
import { getValhallaResponseJsonWithCache } from '@/utils/osm/getValhallaResponse';
import { GeoJsonToSomethings } from '@/components/GeoJsonToSomethings';

// https://valhalla.github.io/demos/polyline/decode.js
function decodePolyline(encoded:string, mul:number) {
  //precision
  var inv = 1.0 / mul;
  var decoded = [];
  var previous = [0,0];
  var i = 0;
  //for each byte
  while(i < encoded.length) {
    //for each coord (lat, lon)
    var ll = [0,0]
    for(var j = 0; j < 2; j++) {
      var shift = 0;
      var byte = 0x20;
      //keep decoding bytes until you have this coord
      while(byte >= 0x20) {
        byte = encoded.charCodeAt(i++) - 63;
        ll[j] |= (byte & 0x1f) << shift;
        shift += 5;
      }
      //add previous offset to get final value and remember for next one
      ll[j] = previous[j] + (ll[j] & 1 ? ~(ll[j] >> 1) : (ll[j] >> 1));
      previous[j] = ll[j];
    }
    //scale by precision and chop off long coords also flip the positions so
    //its the far more standard lon,lat instead of lat,lon
    decoded.push([ll[1] * inv,ll[0] * inv]);
  }
  //hand back the list of coordinates
  return decoded;
};

export default function Page() {
  const overpassQueryWithFeatureStyleList = [
    {
      overpassQuery: `
[out:json][timeout:30000];
relation["name:en"="Gaza Strip"];
out geom;
`,
      featureStyle: {
        fillColor: 'transparent',
      },
    },
    {
      overpassQuery: `
[out:json][timeout:30000];
nwr["name:en"="Rafah Border Crossing Control Area"];
out geom;
`,
      featureStyle: {
        emoji: '🚧',
      },
    },
  ];

  const [marker, setMarker] = useState({
    latitude: 31.40906,
    longitude: 34.35994,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [routeGeoJson, setRouteGeoJson] = useState<FeatureCollection | null>();

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  useEffect(() => {
    const f = async () => {
      const destination = {
        lon: 34.247295160074955,
        lat: 31.239317749999998,
      };

      const res = await getValhallaResponseJsonWithCache(
        { lon: marker.longitude, lat: marker.latitude },
        destination
      );
      try {
        const shape = res.trip.legs[0].shape;
        const decodedCoordinates = decodePolyline(shape, 1e6);
        const newRouteGeoJson = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'route', id: 'route' },
              id: 'route',
              geometry: {
                type: 'LineString',
                coordinates: decodedCoordinates,
              },
            },
          ],
        } as FeatureCollection;
        setRouteGeoJson(newRouteGeoJson);
      } catch (error) {
        console.error(error);
      }
    };
    if (!isDragging) {
      f();
    }
  }, [isDragging, marker]);

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
        enableInteractions={false}
        overpassQueryWithFeatureStyleList={overpassQueryWithFeatureStyleList}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor='bottom'
          draggable
          onDrag={onMarkerDrag}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          👨‍👩‍👦‍👦
        </Marker>
        {routeGeoJson && (
          <>
            <h3
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 100,
                padding: '8px',
                background: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              hoge
            </h3>
            <GeoJsonToSomethings
              geojson={routeGeoJson}
              style={{
                color: 'blue',
                fillColor: 'blue',
              }}
            />
          </>
        )}
      </StaticOverpassQueryMap>
    </div>
  );
}
