import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import UserContext from '../context/user/userContext';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const getUserData = async () => {
      var userInfo = await userContext.user
      console.log("userinfo", userInfo)
      if (userInfo) {
        const response = await userContext.getUser(userInfo.sub);
        console.log("getUserData", response)
        setUser(response)
      }
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
          <Avatar variant='rounded' src={user?.ProfileImage} id='display-photo'/>
          <div style={{ padding: '0 10px', width: '100%' }}>
            Your name here
            <hr />
            +1 778 000 0000
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
