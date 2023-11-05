import { FeatureCollection } from 'geojson';
import osmtogeojson from 'osmtogeojson';
import { Md5 } from 'ts-md5';
import { useEffect, useState } from 'react';

import { StaticGeoJsonMap } from './StaticGeoJsonMap';
import { getOverpassResponseJsonWithCache } from '@/utils/osm/getOverpassResponse';
import { MapRef } from 'react-map-gl/maplibre';

export const StaticOverpassQueryMap: React.FC<{
  mapStyle?: string;
  mapPadding?: number;
  overpassQueryWithFeatureStyleList: Array<{
    overpassQuery: string;
    featureStyle?: {
      color?: string;
      fillColor?: string;
      emoji?: string;
    };
  }>;
  children?: any;
  enableInteractions?: boolean;
  onLoadEverything?: (mapRef: MapRef) => void;
}> = ({
  mapStyle = 'https://tile.openstreetmap.jp/styles/osm-bright-en/style.json',
  mapPadding = 200,
  overpassQueryWithFeatureStyleList,
  children,
  enableInteractions = false,
  onLoadEverything
}) => {
  const [geoJsonWithStyleList, setGeoJsonWithStyleList] = useState<
    Array<{
      id: string;
      style: {
        color?: string;
        fillColor?: string;
        emoji?: string;
      };
      geojson: FeatureCollection;
    }>
  >([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const thisEffect = async () => {
      setLoaded(true);
      for (const overpassQueryWithFeatureStyle of overpassQueryWithFeatureStyleList) {
        const overpassResJson = await getOverpassResponseJsonWithCache(
          overpassQueryWithFeatureStyle.overpassQuery
        );
        const newGeojson = osmtogeojson(overpassResJson);
        const md5 = new Md5();
        md5.appendStr(overpassQueryWithFeatureStyle.overpassQuery);
        const hash = md5.end();
        setGeoJsonWithStyleList((prev) => {
          if (prev.find((item) => item.id === hash)) return prev;
          return [
            ...prev,
            {
              id: hash as string,
              style: overpassQueryWithFeatureStyle.featureStyle || {},
              geojson: newGeojson,
            },
          ];
        });
      }
    };
    if (!loaded) {
      setLoaded(true);
      thisEffect();
    }
  }, [loaded, overpassQueryWithFeatureStyleList]);

  return (
    <StaticGeoJsonMap
      mapStyle={mapStyle}
      mapPadding={mapPadding}
      geoJsonWithStyleList={geoJsonWithStyleList}
      enableInteractions={enableInteractions}
      onLoadEverything={onLoadEverything}
    >
      {children}
    </StaticGeoJsonMap>
  );
};
