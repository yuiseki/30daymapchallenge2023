'use client';

import dynamic from 'next/dynamic';

const MyCesiumComponent = dynamic(() => import('./MyCesiumComponent').then(module => module.MyCesiumComponent), {
    ssr: false,
});

export default function Page() {
  return (
    <>
      <MyCesiumComponent />
    </>
  )
}
