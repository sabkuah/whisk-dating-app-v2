import { Button } from '@material-ui/core';
import React from 'react';
import BottomNav from '../components/landing/BottomNav';
import Navigation from '../components/Navigation';

const Welcome = () => {
  return (
    <div className='welcome-page'>
      {/* <Button variant='contained' className='brand-button-lg'>
        Hello!
      </Button> */}
      <BottomNav />
    </div>
  );
};

export default Welcome;
