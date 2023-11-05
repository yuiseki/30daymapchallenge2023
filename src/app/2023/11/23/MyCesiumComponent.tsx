'use client';

import {
  Camera,
  CameraFlyTo,
  Cesium3DTileset,
  CesiumComponentRef,
  ImageryLayer,
  Scene,
  Viewer,
} from 'resium';
import {
  Cartesian3,
  Viewer as CesiumViewer,
  Color,
  OpenStreetMapImageryProvider,
  Math as CesiumMath,
} from 'cesium';
import { useRef, useState } from 'react';
//import "/public/cesium/Widgets/widgets.css"

export const MyCesiumComponent = () => {
  const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);

  const [data, setData] = useState({
    longitude: 139.6952259,
    latitude: 35.6716486,
  });

  const startCoordinates = Cartesian3.fromDegrees(
    data.longitude,
    data.latitude,
    500
  );

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
      <Viewer
        full
        ref={ref}
        timeline={false}
        animation={false}
        geocoder={false}
        scene3DOnly={true}
        navigationHelpButton={false}
        homeButton={true}
        baseLayerPicker={false}
        fullscreenButton={false}
        skyBox={false}
        skyAtmosphere={false}
        contextOptions={{
          webgl: {
            alpha: true,
          },
        }}
        imageryProviderViewModels={[]}
        requestRenderMode={true}
      >
        <Scene
          skyBox={undefined}
          sun={undefined}
          moon={undefined}
          skyAtmosphere={undefined}
          backgroundColor={new Color(0, 0, 0, 0)}
        />
        <ImageryLayer
          imageryProvider={
            new OpenStreetMapImageryProvider({
              url: 'https://a.tile.openstreetmap.org/',
            })
          }
        />
        <Cesium3DTileset
          url={`https://assets.cms.plateau.reearth.io/assets/57/e338bc-4e38-447c-a82e-0f4a7b075ed0/13100_tokyo23-ku_2022_3dtiles_1_1_op_bldg_13104_shinjuku-ku_lod2/tileset.json`}
        />
        <Camera />
        <CameraFlyTo
          destination={startCoordinates}
          duration={0}
          orientation={{
            heading: CesiumMath.toRadians(-10.0),
            pitch: CesiumMath.toRadians(-10.0),
            roll: 0.0,
          }}
        />
      </Viewer>
    </div>
  );
};
