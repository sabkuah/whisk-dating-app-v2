import React, { useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

const BottomNav = () => {
  const [value, setValue] = useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log('value', value);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className='sticky-bottom'
      //className={classes.root}
    >
      <BottomNavigationAction
        label='Home'
        value='home'
        icon={<HomeIcon className='icon' />}
      />
      <BottomNavigationAction
        label='Favourites'
        value='favourites'
        icon={<FavoriteBorderIcon className='icon' />}
      />
      <BottomNavigationAction
        label='Profile'
        value='profile'
        icon={<PersonOutlineIcon className='icon' />}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
