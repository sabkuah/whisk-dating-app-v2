import React, { useContext } from 'react';
import {AppBar, Button, Toolbar, Typography} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/user/userContext';


const Navigation = () => {
  const history = useHistory();
  const userContext = useContext(UserContext)

  return (
    <AppBar position="static" className="nav-container">
      <Toolbar>
        <Typography variant="h3" id="title-logo" onClick={() => history.push("/")}>
          Whisk
        </Typography>
        <div className="nav-links">
          {
            userContext.isAuthenticated ? 
            <>
            <Link to="/user">Profile</Link>
            <Button onClick={() => userContext.logoutUser()}>Logout</Button>
            </>
            :
            <>
              <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
            </>
          }
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation