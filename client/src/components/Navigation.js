import React, { useContext } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/user/userContext';
import WhiskContext from '../context/whisk/whiskContext';

const Navigation = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const whiskContext = useContext(WhiskContext);

  const logout = async () => {
    const response = await userContext.logoutUser();
    await whiskContext.clearWhisks();
    console.log('user logged out', response);
    history.push('/');
  };

  return (
    <AppBar position='static' className='nav-container'>
      <Toolbar>
        <Typography
          variant='h3'
          id='title-logo'
          onClick={() => history.push('/')}
        >
          Whisk
        </Typography>
        <div className='nav-links'>
          {userContext.isAuthenticated ? (
            <>
              <Link to='/user'>Profile</Link>
              <Button onClick={() => logout()}>Logout</Button>
            </>
          ) : (
            <>
              <Link to='/about'>About</Link>
              <Link to='/login'>Login</Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
