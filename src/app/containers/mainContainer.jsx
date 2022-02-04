import React from 'react';
import Navbar from '../components/ui/navbar';

const MainContainer = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className='mt-1'>
                {children}
            </div>
        </>
    );
}

export default MainContainer;
