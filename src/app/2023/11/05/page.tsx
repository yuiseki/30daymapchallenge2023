'use client';

import dynamic from 'next/dynamic';

const Page = dynamic(() => import('./MyMapComponent').then(module => module.MyMapComponent), {
    ssr: false,
});
export default Page;