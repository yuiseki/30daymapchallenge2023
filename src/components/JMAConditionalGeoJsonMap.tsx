import { FeatureCollection } from 'geojson';
import { Fragment } from 'react';
import { Layer, Source } from 'react-map-gl/maplibre';

export const JMAConditionalGeoJsonMap: React.FC<{
  geojson: FeatureCollection;
  conditions?: Array<{
    reportDatetime: string;
    areaTypes: Array<{
      areas: Array<{
        code: string;
        warnings: Array<{
          code: string;
          status: string;
          attentions?: string[];
        }>;
      }>;
    }>;
  }>;
}> = ({ geojson, conditions }) => {
  if (!conditions) {
    return null;
  }
  console.log(conditions);
  const warningAreas = conditions.map((condition) => {
    return condition.areaTypes.map((areaType) => {
      return areaType.areas.map((area) => {
        return area.warnings.map((warning) => {
          if (warning.attentions && warning.attentions.length > 0) {
            return {
              code: area.code,
              attentions: warning.attentions,
            };
          }
        });
      });
    });
  }).flat(4).filter((item) => item);
  const uniqWarningAreas = new Map(warningAreas.map((item) => [item?.code, item]));
  return (
    <>
      {geojson.features.map((feature) => {
        if (!feature.properties) {
          return null;
        }
        const warningLevel = uniqWarningAreas.get(feature.properties.code);
        if (!warningLevel) {
          return null;
        }
        const alert = warningLevel.attentions?.find((item) => item.includes('警戒') || item.includes('警報'));
        console.log(warningLevel.attentions);

        return (
          <Fragment key={feature.properties.code}>
            {(feature.geometry.type === 'Polygon' ||
              feature.geometry.type === 'MultiPolygon') && (
              <Source type='geojson' data={feature} attribution='<a href="https://www.jma.go.jp/bosai/map.html">気象庁</a>'>
                <Layer
                  {...{
                    id: `${feature.properties.code}-line`,
                    type: 'line',
                    paint: {
                      'line-width': 4,
                      'line-color': '#f2f8fc',
                      'line-opacity': 0.8,
                    },
                  }}
                />
                <Layer
                  {...{
                    id: `${feature.properties.code}-fill`,
                    type: 'fill',
                    paint: {
                      'fill-color': alert ? 'red' : 'yellow',
                      'fill-opacity': 0.4,
                    },
                  }}
                />
              </Source>
            )}
          </Fragment>
        );
      })}
    </>
  );
};
