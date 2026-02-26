'use client';

import dynamic from 'next/dynamic';

const MapSearchModal = dynamic(
    () => import('./MapSearchModal'),
    { ssr: false }
);

export default MapSearchModal;
