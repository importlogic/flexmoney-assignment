'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@components/Loading';

const Page = () => {
    const router = useRouter();
    useEffect(() => {
        const animation_pause = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/form');
        };

        animation_pause();
    }, []);

    return (
        <div className='flex min-h-screen items-center justify-center'>
            <Loading color='white'></Loading>
        </div>
    );
};

export default Page;
