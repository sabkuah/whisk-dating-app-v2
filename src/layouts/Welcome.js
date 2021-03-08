import { Button, Container, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import BottomNav from '../components/landing/BottomNav';
import Search from '../components/landing/Search';
import Navigation from '../components/Navigation';
import MenuIcon from '@material-ui/icons/Menu';
import LandingNav from '../components/landing/LandingNav';

const Welcome = () => {
  return (
    <Container className='welcome-page'>
      <LandingNav />
      <h2>
        Experiences <br />
        for you
      </h2>
      <Search />
      <BottomNav />
    </Container>
  );
};

export default Welcome;
