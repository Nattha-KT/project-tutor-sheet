'use client'
import React from 'react';
import  styles  from './Loading.module.css';

const Loader: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-4 font-bold '>
        <div className=' mb-14'>
        <span className={styles.cssload_loader}><span className={styles.cssload_loader_inner}></span></span>
        </div>
        <span className={styles.loader}></span>
    </div>  
    

  );
};

export default Loader;
