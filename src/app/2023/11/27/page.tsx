'use client';

import dynamic from 'next/dynamic';

const Page = dynamic(() => import('./MyDeckGLComponent').then(module => module.MyDeckGLComponent), {
    ssr: false,
});
export default Page;
