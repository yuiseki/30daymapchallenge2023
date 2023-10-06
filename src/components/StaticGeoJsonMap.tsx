// @ts-ignore
import * as turf from "@turf/turf";
import { MapProvider, MapRef } from "react-map-gl/maplibre";
import { BaseMap } from "./BaseMap";
import { useEffect, useRef } from "react";
import { FeatureCollection } from "geojson";
import { GeoJsonToMarkers } from "./GeoJsonToSomething";

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
}> = ({
  mapStyle = "https://tile.openstreetmap.jp/styles/osm-bright-en/style.json",
  geoJsonWithStyleList = [],
  mapPadding = 200,
}) => {
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (!mapRef || !mapRef.current) return;
      if (geoJsonWithStyleList.length === 0) return;
      try {
        console.log(geoJsonWithStyleList);
        geoJsonWithStyleList.map((item) =>
          console.log(JSON.stringify(item.geojson))
        );
        const everything: FeatureCollection = {
          type: "FeatureCollection",
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
        enableInteractions={false}
        attributionPosition="bottom-right"
      >
        {geoJsonWithStyleList &&
          geoJsonWithStyleList.map((geoJsonWithStyle) => {
            return (
              <GeoJsonToMarkers
                key={geoJsonWithStyle.id}
                geojson={geoJsonWithStyle.geojson}
                style={geoJsonWithStyle.style}
              />
            );
          })}
      </BaseMap>
    </MapProvider>
  );
};
