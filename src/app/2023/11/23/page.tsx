/* eslint-disable @next/next/no-css-tags */
'use client';

import dynamic from 'next/dynamic';
import Head from 'next/head';

const MyCesiumComponent = dynamic(
  () =>
    import('./MyCesiumComponent').then((module) => module.MyCesiumComponent),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='//cesium.com/downloads/cesiumjs/releases/1.111/Build/Cesium/Widgets/widgets.css'
        />
      </Head>
      <MyCesiumComponent />
    </>
  );
}
