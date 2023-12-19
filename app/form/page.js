import Card from '@components/Card.js';
import Form from '@components/Form.js';

import Image from 'next/image';
import yoga from '@public/yoga.png';

const HomePage = () => {
    return (
        <div className='flex min-h-screen justify-center items-center backdrop-blur-3xl'>
            <Card>
                <div className='flex h-full items-center flex-col md:flex-row'>
                    <div className='flex grow'>
                        <Form></Form>
                    </div>
                    <div className='hidden md:flex'>
                        <Image src={yoga} height={300} width={300} className='min-w-[300px] animate-float'></Image>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default HomePage;