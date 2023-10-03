

import React from 'react';
import Image from 'next/image'

const Loader: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
       <div>
        <Image
            src="/loading2.svg"
            alt="Loading..."
            width={150}
            height={150}
            />
       </div>
        <div><span>Loading...</span></div>
    </div>
  );
};

export default Loader;
