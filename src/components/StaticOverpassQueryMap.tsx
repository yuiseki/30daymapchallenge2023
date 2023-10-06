import { FeatureCollection } from "geojson";
import osmtogeojson from "osmtogeojson";
import { Md5 } from "ts-md5";
import { useEffect, useState } from "react";

import { StaticGeoJsonMap } from "./StaticGeoJsonMap";
import { getOverpassResponseJsonWithCache } from "@/utils/osm/getOverpassResponse";


export const StaticOverpassQueryMap: React.FC<{
  mapStyle?: string;
  mapPadding?: number;
  overpassQuery: string;
}> = ({
  mapStyle = "https://tile.openstreetmap.jp/styles/osm-bright-en/style.json",
  mapPadding = 200,
  overpassQuery,
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

  useEffect(() => {
    const thisEffect = async () => {
      const overpassResJson = await getOverpassResponseJsonWithCache(
        overpassQuery
      );
      const newGeojson = osmtogeojson(overpassResJson);
      const md5 = new Md5();
      md5.appendStr(overpassQuery);
      const hash = md5.end();
      setGeoJsonWithStyleList((prev) => {
        return [
          ...prev,
          {
            id: hash as string,
            style: {
              color: "yellow",
              fillColor: "transparent",
            },
            geojson: newGeojson,
          },
        ];
      });
    }
    thisEffect();
  }, [overpassQuery]);

  return (
    <StaticGeoJsonMap
      mapStyle={mapStyle}
      mapPadding={mapPadding}
      geoJsonWithStyleList={geoJsonWithStyleList}
    />
  );
};
