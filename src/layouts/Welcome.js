import { Button, Container } from '@material-ui/core';
import React from 'react';
import BottomNav from '../components/landing/BottomNav';
import Search from '../components/landing/Search';
import Navigation from '../components/Navigation';

const Welcome = () => {
  return (
    <Container className='welcome-page'>
      <h2>Experiences for you</h2>
      <Search />
      <BottomNav />
    </Container>
  );
};

export default Welcome;
