import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const BurgerNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='burger-nav'>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MenuIcon className='burger-icon' />
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <HomeIcon />
          Home
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FavoriteBorderIcon /> Favourites
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PersonOutlineIcon />
          Profile
        </MenuItem>
      </Menu>
    </div>
  );
};

export default BurgerNav;
