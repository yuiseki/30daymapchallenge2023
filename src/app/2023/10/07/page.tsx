'use client';

import * as React from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { StaticOverpassQueryMap } from '@/components/StaticOverpassQueryMap';
import { Layer, Source } from 'react-map-gl/maplibre';
import { useEffect, useMemo, useState } from 'react';
import { useJMANowcastTileUrl, useJMARiskRasterTileUrl } from '@/lib/jma';
import useSWR from 'swr';
import { JMAConditionalGeoJsonMap } from '@/components/JMAConditionalGeoJsonMap';

const overpassQueryWithIconStyleList = [
  {
    overpassQuery: `
        [out:json][timeout:30000];
        relation["name"="日本"];
        out geom;
    `,
    featureStyle: {
      color: 'transparent',
      fillColor: 'transparent'
    },
  },
  {
    overpassQuery: `
        [out:json][timeout:30000];
        area["name"="東京都"]->.searchArea;
        (
          relation["name"="北区"](area.searchArea);
          relation["name"="豊島区"](area.searchArea);
          relation["name"="板橋区"](area.searchArea);
          relation["name"="練馬区"](area.searchArea);
          relation["name"="足立区"](area.searchArea);
          relation["name"="葛飾区"](area.searchArea);
          relation["name"="江戸川区"](area.searchArea);
          relation["name"="目黒区"](area.searchArea);
          relation["name"="品川区"](area.searchArea);
          relation["name"="大田区"](area.searchArea);
          relation["name"="世田谷区"](area.searchArea);
          relation["name"="渋谷区"](area.searchArea);
          relation["name"="中野区"](area.searchArea);
          relation["name"="杉並区"](area.searchArea);
          relation["name"="大田区"](area.searchArea);
          relation["name"="荒川区"](area.searchArea);
          relation["name"="文京区"](area.searchArea);
          relation["name"="千代田区"](area.searchArea);
          relation["name"="中央区"](area.searchArea);
          relation["name"="港区"](area.searchArea);
          relation["name"="新宿区"](area.searchArea);
          relation["name"="台東区"](area.searchArea);
          relation["name"="墨田区"](area.searchArea);
          relation["name"="江東区"](area.searchArea);
        );
        out geom;
      `,
    featureStyle: {
      fillColor: 'gray',
    },
  },
  {
    overpassQuery: `
        [out:json][timeout:30000];
        area["name"="台東区"]->.searchArea;
        (
          nwr[amenity=restaurant][cuisine=ramen](area.searchArea);
        );
        out geom;
      `,
    featureStyle: {
      color: 'yellow',
      emoji: '🍜',
    },
  },
  {
    overpassQuery: `
        [out:json][timeout:30000];
        area["name"="台東区"]->.searchArea;
        (
          nwr[amenity=restaurant][cuisine=soba](area.searchArea);
        );
        out geom;
      `,
    featureStyle: {
      color: 'green',
      emoji: '🍜',
    },
  },
];

const GSIRasterTileOverlayLayers = [
  {
    url: 'https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png',
    id: 'gsi-01_flood_l2_shinsuishin_data',
    name: '国土地理院 洪水浸水想定区域',
    attribution:
      '<a href="https://disaportal.gsi.go.jp/maps/">重ねるハザードマップ</a>',
    opacity: 0.5,
    maxzoom: 17,
  },
  {
    url: 'https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend/{z}/{x}/{y}.png',
    id: 'gsi-04_tsunami_newlegend',
    name: '国土地理院 津波浸水想定区域',
    attribution:
      '<a href="https://disaportal.gsi.go.jp/maps/">重ねるハザードマップ</a>',
    opacity: 0.5,
    maxzoom: 17,
  },
  {
    url: 'https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png',
    id: 'gsi-05_dosekiryukeikaikuiki',
    name: '国土地理院 土砂災害警戒区域',
    attribution:
      '<a href="https://disaportal.gsi.go.jp/maps/">重ねるハザードマップ</a>',
    opacity: 0.5,
    maxzoom: 17,
  },
  {
    url: 'https://disaportaldata.gsi.go.jp/raster/05_dosekiryukikenkeiryu/{z}/{x}/{y}.png',
    id: 'gsi-05_dosekiryukikenkeiryu',
    name: '国土地理院 土石流警戒渓流',
    attribution:
      '<a href="https://disaportal.gsi.go.jp/maps/">重ねるハザードマップ</a>',
    opacity: 0.5,
    maxzoom: 17,
  },
  {
    url: 'https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki/{z}/{x}/{y}.png',
    id: 'gsi-05_jisuberikeikaikuiki',
    name: '国土地理院 地すべり警戒区域',
    attribution:
      '<a href="https://disaportal.gsi.go.jp/maps/">重ねるハザードマップ</a>',
    opacity: 0.5,
    maxzoom: 17,
  },
  {
    url: 'https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki/{z}/{x}/{y}.png',
    id: 'gsi-05_kyukeishakeikaikuiki',
    name: '国土地理院 急傾斜警戒区域',
    attribution:
      '<a href="https://disaportal.gsi.go.jp/maps/">重ねるハザードマップ</a>',
    opacity: 0.5,
    maxzoom: 17,
  },
  {
    url: 'https://disaportaldata.gsi.go.jp/raster/daikiboumoritsuzouseichi/{z}/{x}/{y}.png',
    id: 'gsi-daikiboumoritsuzouseichi',
    name: '国土地理院 大規模盛土造成地',
    attribution:
      '<a href="https://disaportal.gsi.go.jp/maps/">重ねるハザードマップ</a>',
    opacity: 0.5,
    maxzoom: 16,
  },
  {
    url: 'https://disaportaldata.gsi.go.jp/raster/10_kansui/{z}/{x}/{y}.png',
    id: 'gsi-10_kansui',
    name: '国土地理院 道路冠水想定箇所',
    attribution:
      '<a href="https://disaportal.gsi.go.jp/maps/">重ねるハザードマップ</a>',
    opacity: 0.5,
    maxzoom: 14,
  },
  {
    url: 'https://disaportaldata.gsi.go.jp/raster/10_jizentuukoukiseikukan/{z}/{x}/{y}.png',
    id: 'gsi-10_jizentuukoukiseikukan',
    name: '国土地理院 事前通行規制区間',
    attribution:
      '<a href="https://disaportal.gsi.go.jp/maps/">重ねるハザードマップ</a>',
    opacity: 0.5,
    maxzoom: 14,
  },
  {
    url: 'https://disaportaldata.gsi.go.jp/raster/10_yoboutekituukoukiseikukan/{z}/{x}/{y}.png',
    id: 'gsi-10_yoboutekituukoukiseikukan',
    name: '国土地理院 予防的通行規制区間',
    attribution:
      '<a href="https://disaportal.gsi.go.jp/maps/">重ねるハザードマップ</a>',
    opacity: 0.5,
    maxzoom: 15,
  },
];

export default function Page() {
  const [
    selectedRasterTileOverlayLayerIds,
    setSelectedRasterTileOverlayLayerIds,
  ] = useState<string[]>([]);

  const landslideTileUrl = useJMARiskRasterTileUrl('land');
  const inundateTileUrl = useJMARiskRasterTileUrl('inund');
  const nowcastTileUrl = useJMANowcastTileUrl();

  const JMARasterTileOverlayLayers = useMemo(() => {
    return [
      {
        url: landslideTileUrl,
        id: 'jma-landslide',
        name: '気象庁 キキクル 土砂災害危険度分布',
        attribution:
          '<a href="https://www.jma.go.jp/bosai/risk/">気象庁 キキクル</a>',
        opacity: 0.7,
        maxzoom: 11,
      },
      {
        url: inundateTileUrl,
        id: 'jma-inundate',
        name: '気象庁 キキクル 浸水危険度分布',
        attribution:
          '<a href="https://www.jma.go.jp/bosai/risk/">気象庁 キキクル</a>',
        opacity: 0.7,
        maxzoom: 11,
      },
      {
        url: nowcastTileUrl,
        id: 'jma-nowcast',
        name: '気象庁 高解像度降水ナウキャスト',
        attribution:
          '<a href="https://www.jma.go.jp/bosai/nowc/">気象庁 キキクル</a>',
        opacity: 0.4,
        maxzoom: 10,
      }
    ];
  }, [landslideTileUrl, inundateTileUrl, nowcastTileUrl]);

  const [class10sGeoJson, setClass10sGeoJson] = useState();
  const [JMAWarnings, setJMAWarnings] = useState();

  useEffect(() => {
    const thisEffect = async () => {
      const class10sGeoJsonRes = await fetch(
        'https://www.jma.go.jp/bosai/common/const/geojson/class10s.json'
      );
      const newClass10sGeoJson = await class10sGeoJsonRes.json();
      setClass10sGeoJson(newClass10sGeoJson);

      const JMAWarningsRes = await fetch(
        'https://www.jma.go.jp/bosai/warning/data/warning/map.json'
      );
      const newJMAWarnings = await JMAWarningsRes.json();
      setJMAWarnings(newJMAWarnings);
    };
    thisEffect();
  }, []);

  const onChangeSelectedRasterTileOverlayLayerIds = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedRasterTileOverlayLayerIds((prev) => [...prev, e.target.value]);
    } else {
      setSelectedRasterTileOverlayLayerIds((prev) =>
        prev.filter((id) => id !== e.target.value)
      );
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <StaticOverpassQueryMap overpassQueryWithFeatureStyleList={
        overpassQueryWithIconStyleList
      }>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            zIndex: 10,
            background: 'white',
            width: 'fit-content',
            padding: '6px',
            margin: '12px',
          }}
        >
          {[GSIRasterTileOverlayLayers, JMARasterTileOverlayLayers]
            .flat()
            .map((layer) => {
              return (
                <div
                  key={`${layer.id}-wrap`}
                  style={{
                    marginTop: '3px',
                  }}
                >
                  <label
                    key={`${layer.id}-label`}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      key={`${layer.id}-checkbox`}
                      type='checkbox'
                      checked={selectedRasterTileOverlayLayerIds.includes(
                        layer.id
                      )}
                      value={layer.id}
                      onChange={onChangeSelectedRasterTileOverlayLayerIds}
                      style={{
                        marginRight: '4px',
                        cursor: 'pointer',
                      }}
                    />
                    {layer.name}
                  </label>
                </div>
              );
            })}
        </div>
        {[GSIRasterTileOverlayLayers, JMARasterTileOverlayLayers]
          .flat()
          .filter((layer) =>
            selectedRasterTileOverlayLayerIds.includes(layer.id)
          )
          .map((layer) => {
            if (!layer.url) {
              return;
            }
            return (
              <Source
                key={`${layer.id}-source`}
                id={`${layer.id}-source`}
                type='raster'
                tiles={[layer.url]}
                tileSize={256}
                attribution={layer.attribution}
                maxzoom={layer.maxzoom}
              >
                <Layer
                  id={`${layer.id}-layer`}
                  type='raster'
                  paint={{
                    'raster-opacity': layer.opacity,
                  }}
                />
              </Source>
            );
          })}
          {class10sGeoJson && (
          <JMAConditionalGeoJsonMap geojson={class10sGeoJson} conditions={JMAWarnings} />
          )}
      </StaticOverpassQueryMap>
    </div>
  );
}
