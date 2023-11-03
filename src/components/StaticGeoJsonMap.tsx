// @ts-ignore
import * as turf from '@turf/turf';
import { MapProvider, MapRef } from 'react-map-gl/maplibre';
import { BaseMap } from './BaseMap';
import { useEffect, useRef } from 'react';
import { FeatureCollection } from 'geojson';
import { GeoJsonToSomethings } from './GeoJsonToSomethings';

export const StaticGeoJsonMap: React.FC<{
  mapStyle: string;
  geoJsonWithStyleList?: Array<{
    id: string;
    style: {
      color?: string;
      fillColor?: string;
      emoji?: string;
    };
    geojson: FeatureCollection;
  }>;
  mapPadding?: number;
  children?: any;
  enableInteractions?: boolean;
}> = ({
  mapStyle = 'https://tile.openstreetmap.jp/styles/osm-bright-en/style.json',
  geoJsonWithStyleList = [],
  mapPadding = 200,
  children,
  enableInteractions = false,
}) => {
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (!mapRef || !mapRef.current) return;
      if (geoJsonWithStyleList.length === 0) return;
      try {
        console.log(geoJsonWithStyleList);
        geoJsonWithStyleList.map((item) =>
          console.log(item.geojson)
        );
        const everything: FeatureCollection = {
          type: 'FeatureCollection',
          features: geoJsonWithStyleList
            .map((item) => item.geojson.features)
            .flat(),
        };
        const [minLng, minLat, maxLng, maxLat] = turf.bbox(everything);
        mapRef.current.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          { padding: mapPadding, duration: 1000 }
        );
      } catch (error) {
        console.error(error);
      }
    }, 500);
  }, [geoJsonWithStyleList, mapPadding]);

  return (
    <MapProvider>
      <BaseMap
        mapRef={mapRef}
        mapStyle={mapStyle}
        longitude={0}
        latitude={0}
        zoom={1}
        enableInteractions={enableInteractions}
        attributionPosition='bottom-right'
      >
        {geoJsonWithStyleList &&
          geoJsonWithStyleList.map((geoJsonWithStyle) => {
            return (
              <GeoJsonToSomethings
                key={geoJsonWithStyle.id}
                geojson={geoJsonWithStyle.geojson}
                style={geoJsonWithStyle.style}
              />
            );
          })}
        {children}
      </BaseMap>
    </MapProvider>
  );
};
