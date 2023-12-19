import Image from 'next/image';
import loading from '@public/loading.png';
import loading_black from '@public/loading-black.png';

const Loading = ({ color }) => {
    const loading_image = color === 'white' ? loading : loading_black;
    const text_color = color === 'white' ? 'text-white' : 'text-black';

    return (
        <div className='text-center'>
            <Image src={loading_image} height={200} width={200} className='animate-spin-slow'></Image>
            <p className={`animate-pulse text-2xl font-bold tracking-wide ${text_color}`}>L O A D I N G . . .</p>
        </div>
    );
};

export default Loading;
