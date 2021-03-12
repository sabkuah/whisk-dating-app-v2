import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import UserContext from '../context/user/userContext';

const dp =
'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const getUserData = async () => {
      var userInfo = await userContext.user
      console.log("userinfo", userInfo)
      // const allUsers = await userContext.getAllUsers()
      const response = await userContext.getUser(userInfo.sub); //ID  "75648392" // "872c97d4-de77-46f6-8ba3-d6b2d460c3a7"
      console.log("getUserData", response)
      setUser(response)
    }
    getUserData()
  }, []);

  return (
    <div className='profile-page'>
      <Typography variant='h4'>My profile</Typography>
      <div className='card-title'>
        <span>Personal details</span>
        <span className='blue-font'>change</span>
      </div>
      <div className='about-card'>
        <div className='wrapper'>
          <Avatar variant='rounded' src={dp} id='display-photo' />
          <div style={{ padding: '0 10px', width: '100%' }}>
            My name here hello
            <hr />
            +1 778 123 4567
            <hr />
            1234 1st Ave, Vancouver, BC
          </div>
        </div>
      </div>
      <Button>
        <span>About You</span> <ChevronRightIcon />
      </Button>
      <Button>
        <span>Preferences</span>
        <ChevronRightIcon />
      </Button>
      <Button>
        <span>Whisks</span>
        <ChevronRightIcon />
      </Button>
      <Button>
        <span>Help</span>
        <ChevronRightIcon />
      </Button>
      <Button id='action-btn'>Update</Button>
    </div>
  );
};

export default UserProfile;
