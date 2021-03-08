import React from 'react';
import { Avatar, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const UserProfile = () => {
  const dp = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  
  return (
    <div className='profile-page'>
      <div className="about-card">
        <div className="wrapper">
          <Avatar variant="rounded" src={dp} id="display-photo"/>
          <div style={{padding: "0 10px", width: "100%"}}>
            My name here
            <hr/>
            +1 778 123 4567
            <hr/>
            1234 1st Ave, Vancouver, BC
          </div>
        </div>
        
      </div>
      <Button><span>About You</span> <ChevronRightIcon/></Button>
      <Button><span>Preferences</span><ChevronRightIcon/></Button>
      <Button><span>Whisks</span><ChevronRightIcon/></Button>
      <Button><span>Help</span><ChevronRightIcon/></Button>
      <Button id="action-btn">Update</Button>
    </div>
  );
};

export default UserProfile;
