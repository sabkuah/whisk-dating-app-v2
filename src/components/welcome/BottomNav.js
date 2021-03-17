import React, { useState, useEffect } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

const BottomNav = () => {
  const [value, setValue] = useState('home');
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    switch (value) {
      case 'home':
        history.push('/');
        break;
      case 'matches':
        history.push('/user/whisks');
        break;
      case 'profile':
        history.push('/user');
        break;
      default:
        history.push('/');
    }
  }, [value]);

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className='bottom-nav'
      //className={classes.root}
    >
      <BottomNavigationAction
        label='Home'
        value='home'
        icon={<HomeIcon className='icon' />}
      />
      <BottomNavigationAction
        label='Matches'
        value='matches'
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
